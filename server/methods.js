import s3PublicUrl from 'node-s3-public-url';
import { check } from 'meteor/check';
import Stripe from 'stripe';
import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { Addresses, Profiles, Places, Amenities, Interests, EmergencyContacts, DesiredDate, Customers, Trips, FileUrls } from '../imports/collections/mainCollection';
import {
    serviceErrorBuilder, consoleErrorHelper, serviceSuccessBuilder, consoleLogHelper, mongoFindOneError, tripErrorCode, tripStatus, FieldsForTrip,
    profileErrorCode, insufficentParamsCode, upsertFailedCode, genericSuccessCode, placeErrorCode, FileTypes, plannerErrorCode, FieldsForBrowseProfile, noShowFieldsForPlace,
    fieldsForTripReview,
} from '../imports/lib/Constants';
import { clientSideCustomerFields } from './helpers/ServerConstants';
import S3 from './s3';
import { parseInts, parseFloats, checkIfCoordsAreValid } from '../imports/helpers/DataHelpers';
import { merge, cloneDeep, uniqBy } from 'lodash';
import handleSignup from '../imports/modules/server/stripe/handle-signup';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';

const client = new ApolloClient(meteorClientConfig());
let stopLoop = 3;
let counter = 0;

if (Meteor.isServer) {
    cronFunction();
}

function imageServiceHelper(fileObj, imgType, boundToProp, userId, activeFlag) {
    check(fileObj, Object);
    if (!fileObj[boundToProp]) return serviceErrorBuilder(`Please create and save a ${imgType} first`, placeErrorCode);
    if (!userId) return serviceErrorBuilder('Please Sign in before submitting images', placeErrorCode);
    const searchObj = {
        userId,
        url: fileObj.url,
    };
    const insertObj = {
        active: activeFlag,
        deleted: false,
        ...searchObj,
        [boundToProp]: fileObj[boundToProp],
        fileName: fileObj.name,
        type: imgType,
        added: new Date(),
    };
    if (activeFlag) {
        const searchForObj = {
            active: true,
            userId,
        };
        if (boundToProp) searchForObj[boundToProp] = fileObj[boundToProp];
        const numberUpdated = FileUrls.update(searchForObj, { $set: { active: false } });
        consoleLogHelper(`${numberUpdated} Images changed to inactive`, genericSuccessCode, userId, '');
    }
    if (typeof fileObj.position === 'number') { //could be built to have the server auto Increment but why spend the comput and db calls to do it
        insertObj.position = fileObj.position;
    }
    const insertGUID = FileUrls.upsert(searchObj, insertObj);

    consoleLogHelper(`Image ${insertGUID.insertedId ? `added with key ${insertGUID.insertedId}` : `updated with name of ${insertObj.fileName}`}`, genericSuccessCode, userId, insertObj.fileName);
    return serviceSuccessBuilder(insertGUID, genericSuccessCode, {
        serviceMessage: `Image ${insertGUID.insertedId ? `added with key ${insertGUID.insertedId}` : `updated with name of ${insertObj.fileName}`}`,
        data: {
            image: {
                _id: insertGUID.insertedId,
                url: insertObj.url,
            },
        },
    });
}

function setterOrInsert(obj, otherId) {
    if (!obj._id || (otherId && !obj[otherId])) return obj;
    return {
        $set: obj,
    };
}

function cronFunction() {

    SyncedCron.add({
        name: 'Find users with incomplete profiles and send an email',
        schedule: function (parser) {
            // return parser.recur().every(1).minute();
            return parser.recur().on(8).dayOfWeek(1);
        },
        job: function () {
            var notifyUsers = methods.notfiyProfileIncomplete();
            return notifyUsers;
        }
    });

    SyncedCron.start();
}

function addOwnerIdAndDateStamp(obj, userId, extraProps) { // modifies original object
    if (obj._id) return; //only way possible is for record to not exist THIS RELYS ON CHECKING DB FOR RECORDS BASED UPON USEROWNERID FIRST
    obj.ownerUserId = userId;
    obj.added = new Date();
    // console.log(extraProps);
    if (extraProps) {
        Object.keys(extraProps).forEach((key) => {
            obj[key] = extraProps[key];
        });
    }
}

function checkExistingCollectionIfNoId(collection, objClone, searchObj, forceCheck, extraParams = {}) {
    if (!objClone._id || forceCheck) { //check for existing profiles if no id passed in
        const existingDoc = collection.findOne(searchObj, { ...extraParams, sort: { added: -1 } }) || {};
        return merge(existingDoc, objClone);//overwrite with new data
    }
    return objClone;
}

function sendAcceptEmail(swapObj) {
    const { dates, requesterUserId, requesteeUserId } = swapObj;
    const Requester = Profiles.findOne({ ownerUserId: requesterUserId }) || {};
    const Requestee = Profiles.findOne({ ownerUserId: requesteeUserId }) || {};
    const RequesterPlace = Places.findOne({ ownerUserId: requesterUserId }) || {};
    const RequesteePlace = Places.findOne({ ownerUserId: requesteeUserId }) || {};
    const Dates = dates;

    const sync = Meteor.wrapAsync(HTTP.call);
    try {
        const res = sync('POST', Meteor.settings.azureLambdaURLS.sendAcceptEmail, {
            data: {
                Requester,
                Requestee,
                RequesterPlace,
                RequesteePlace,
                Dates,
            },
        });
    } catch (err) {
        console.log(err.stack);
        consoleErrorHelper(`Email for accept swap between ${Requester.firstName} and ${Requestee.firstName} failed`, upsertFailedCode, requesterUserId, err);
        return serviceErrorBuilder(`Email for accept swap between ${Requester.firstName} and ${Requestee.firstName} failed`, upsertFailedCode, err);
    }

}

function updatePlaceRating(ownerUserId, _id, rating, oldRating) {
    try {
        const { numberOfReviews = 0, totalRating = 0 } = Places.findOne({ _id });
        const safeRating = parseInt(rating, 10);
        const safeOldRating = typeof oldRating !== 'undefined' && parseInt(oldRating, 10);
        const updateObject = {
            numberOfReviews: safeOldRating === false ? (numberOfReviews + 1) : numberOfReviews,
            totalRating: totalRating + (safeOldRating === false ? rating : (safeRating - safeOldRating)),
        };
        updateObject.averageRating = updateObject.totalRating / updateObject.numberOfReviews;

        const placeGUID = Places.update({ _id }, { $set: updateObject });

        consoleLogHelper(`Place ${_id} number of ratings ${typeof oldRating === 'undefined' ? 'increased to' : ''}: ${updateObject.numberOfReviews}, average rating: ${updateObject.averageRating}`, genericSuccessCode, ownerUserId);
        return { placeGUID, updateObject };
    } catch (err) {
        console.log(err.stack);
        consoleErrorHelper(`Something went wrong when updating place rating`, upsertFailedCode, ownerUserId, err, { ownerUserId, rating });
        return serviceErrorBuilder(`Something went wrong when updating place rating`, upsertFailedCode, err);
    }
}

const methods = {
    'user.markFirstTimeFalse'() {
        const _id = Meteor.userId();
        if (_id) {
            Meteor.users.update({ _id }, { $set: { isFirstTimeUser: false } });
        }
    },
    sendAcceptEmail,
    signup(customer) {
        check(customer, Object);
        return handleSignup(customer)
            .then(customers => customers)
            .catch((error) => {
                throw new Meteor.Error('500', `${error}`);
            });
    },
    upsertProfile(profileParams, interests, emergencyContacts) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in before submitting profile info', profileErrorCode);
        if ((profileParams.ownerUserId && profileParams.ownerUserId !== userId)) return serviceErrorBuilder('Please dont mess with other users data', profileErrorCode);
        if (profileParams && typeof profileParams === 'object') {
            let profileClone = cloneDeep(profileParams);
            let interestsClone = cloneDeep(interests);
            let emergencyContactsClone = cloneDeep(emergencyContacts);

            try {
                //profile section
                let ownerProfileId = profileClone._id;//assumes must be an update if there is an id being passed back
                if (!ownerProfileId) { //check for existing profiles if no id passed in
                    const ownerProfile = Profiles.findOne({ ownerUserId: profileClone.ownerUserId || userId }, { sort: { added: -1 } }) || {};
                    ownerProfileId = ownerProfile._id;
                    profileClone = merge(ownerProfile, profileClone);
                }
                if (!profileClone.ownerUserId) profileClone.ownerUserId = profileClone.ownerUserId || userId;
                if (!profileClone.added) profileClone.added = new Date();
                const profileGUID = Profiles.upsert({ _id: ownerProfileId }, profileClone);
                profileClone._id = profileClone._id || profileGUID.insertedId || ownerProfileId;
                delete profileClone.ownerUserId
                //emergency contacts section
                emergencyContactsClone.forEach((ec) => { //set owner and profile ids to emergency contacts
                    ec.ownerUserId = ec.ownerUserId || userId;
                    ec.profileId = profileClone._id || profileGUID.insertedId;
                });
                const emergencyGUIDs = emergencyContactsClone.map(ec => EmergencyContacts.upsert({ _id: ec._id }, ec));
                emergencyContactsClone.forEach((ec, idx) => {
                    const GUID = emergencyGUIDs[idx] || {};
                    ec._id = GUID.insertedId || ec._id;
                    delete ec.ownerUserId;
                    delete ec.profileId;
                });
                //interests section
                if (!interestsClone._id) {
                    const ownerInterests = Interests.findOne({ ownerUserId: interestsClone.ownerUserId || userId }, { sort: { added: -1 } }) || {};
                    interestsClone = merge(ownerInterests, interestsClone);
                }
                interestsClone.ownerUserId = interestsClone.ownerUserId || userId;
                interestsClone.profileId = profileClone._id || profileGUID.insertedId;
                if (!interestsClone.added) interestsClone.added = new Date();
                const interestsGUID = Interests.upsert({ _id: interestsClone._id }, interestsClone);
                interestsClone._id = interestsGUID.insertedId || interestsClone._id;
                delete interestsClone.ownerUserId;
                delete interestsClone.profileId;

                consoleLogHelper(`Profile ${profileClone._id ? 'updated' : 'added'} success`, genericSuccessCode, userId, JSON.stringify(profileClone));
                return serviceSuccessBuilder({ profileGUID, emergencyGUIDs, interestsGUID }, genericSuccessCode, {
                    serviceMessage: `Profile ${profileClone._id ? 'updated' : 'added'}, with key ${profileGUID.insertedId || profileClone._id}`,
                    data: {
                        interests: interestsClone,
                        emergencyContacts: emergencyContactsClone,
                        profile: profileClone,
                    },
                });
            } catch (err) {
                console.log(err.stack);
                consoleErrorHelper('Profile create or update failed', upsertFailedCode, Meteor.userId(), err);
                return serviceErrorBuilder('Profile create or update failed', upsertFailedCode, err);
            }
        } else {
            consoleErrorHelper('Profile create or update failed', insufficentParamsCode, Meteor.userId());
            return serviceErrorBuilder('Profile create or update failed', insufficentParamsCode)
        }
    },
    upsertCard({ email, token }) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in before submitting card info', placeErrorCode);
        var stripe = Stripe("sk_test_jIZSQ4fsuI9IFmeZeiNdSFPc");
        stripe.customers.create({
            email: email,
            source: token,
        }).then(function (customer) {
            try {
                // console.log('Inside upsert card');
                // console.log(JSON.stringify(customer));
                //send success data to client
            } catch (err) {
                console.log(err.stack);
                consoleErrorHelper('Customer create or update failed', upsertFailedCode, userId, err);
                return serviceErrorBuilder('Customer create or update failed', upsertFailedCode, err);
            }
        });
    },
    getCardInfo() {
        const userId = Meteor.userId();
        try {
            const cust = Customers.findOne({ userId }, { fields: clientSideCustomerFields }) || {};
            if (!cust.card) {
                consoleErrorHelper('No card info found for user', upsertFailedCode, userId);
                return serviceErrorBuilder('No card info found for user', upsertFailedCode, {});
            }
            consoleLogHelper(`Get card info called for ${userId}`, genericSuccessCode, userId, JSON.stringify(cust.card));
            return serviceSuccessBuilder({}, genericSuccessCode, {
                serviceMessage: `Get card info called for ${userId}`,
                data: {
                    card: cust.card,
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper(`Get card info called for ${userId} but failed`, upsertFailedCode, userId, err);
            return serviceErrorBuilder(`Get card info called for ${userId} but failed`, upsertFailedCode, err);
        }
    },
    getContact() {
        const userId = Meteor.userId;
        try {
            const contact = EmergencyContacts.findOne({ ownerUserId: userId }) || {};
            // console.log('CONTACT');
            // console.log(contact);
            if (!contact.firstName) {
                consoleErrorHelper('No contact info found for user', upsertFailedCode, userId);
                return serviceErrorBuilder('No contact info found for user', upsertFailedCode, {});
            }
            consoleLogHelper(`Get contact info called for ${userId}`, genericSuccessCode, userId, JSON.stringify(contact.firstName));
            return serviceSuccessBuilder({}, genericSuccessCode, {
                serviceMessage: `Get contact info called for ${userId}`,
                data: {
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    relationship: contact.relationship,
                    phone: contact.phone,
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper(`Get contact info called for ${userId} but failed`, upsertFailedCode, userId, err);
            return serviceErrorBuilder(`Get contact info called for ${userId} but failed`, upsertFailedCode, err);
        }
    },
    requestEmail(tripData, dates) {
        const { requesterPlaceId, requesteePlaceId, requesteeUserId, _id, requesterMessage } = tripData;
        const { arrival, departure } = dates;
        const Profile = Profiles.findOne({ ownerUserId: requesteeUserId }) || {};
        const userId = Meteor.userId();
        const RequestorPlace = Places.findOne({ _id: requesterPlaceId }) || {};
        const RequestedPlace = Places.findOne({ _id: requesteePlaceId }) || {};
        const User = Profiles.findOne({ ownerUserId: userId }) || {};
        const SwapId = _id;
        const Arrival = arrival;
        const Departure = departure;
        const Notes = requesterMessage;

        const sync = Meteor.wrapAsync(HTTP.call);
        try {
            const res = sync('POST', Meteor.settings.azureLambdaURLS.requestEmail, {
                data: {
                    User,
                    Arrival,
                    Departure,
                    Notes,
                    Profile,
                    RequestorPlace,
                    RequestedPlace,
                    SwapId,
                },
            });
            consoleLogHelper(`Email for new swap from ${User && User.userId} sent`, genericSuccessCode, userId, `Place`);
            return serviceSuccessBuilder(res.data, genericSuccessCode, {
                serviceMessage: `Email for new swap from ${User && User.userId} sent`,
                data: res.data,
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper(`Email for new swap from ${User && User.userId} failed`, upsertFailedCode, userId, err);
            return serviceErrorBuilder(`Email for new swap from ${User && User.userId} failed`, upsertFailedCode, err);
        }
    },
    async notfiyProfileIncomplete() {
        const userIds = await FileUrls.rawCollection().distinct('userId', { type: 'PLACE' });//gets unique userIds from file collection (only place files)
        const places = Places.find({ ownerUserId: { $nin: userIds } }, { fields: { ownerUserId: 1 } }).fetch();//finds any places that don't have a user id within the fileURL.type === PLACE
        const users = Profiles.find({ ownerUserId: { $in: places.map(place => place.ownerUserId) } }).fetch();

        const sync = Meteor.wrapAsync(HTTP.call);
        users.forEach((User) => {
            if (!User.email) return;
            try {
                const res = sync('POST', Meteor.settings.azureLambdaURLS.notifyUserIncomplete, {
                    data: {
                        User,
                    },
                });
                consoleLogHelper(`Email message to ${User.email} sent`, genericSuccessCode, User.ownerUserId);
            } catch (err) {
                console.log(err.stack);
                consoleErrorHelper(`Email message to ${User} failed`, upsertFailedCode, User.ownerUserId, err);
            }
        });
    },
    contactUs(data) {
        const { firstName, lastName, email, phone, comments } = data;
        const sync = Meteor.wrapAsync(HTTP.call);
        try {
            const res = sync('POST', Meteor.settings.azureLambdaURLS.contactUs, {
                data: {
                    firstName,
                    lastName,
                    email,
                    phone,
                    comments,
                },
            });
            consoleLogHelper(`Contact form filled out from ${firstName} ${firstName} sent`, genericSuccessCode);
            return serviceSuccessBuilder(res.data, genericSuccessCode, {
                serviceMessage: `Contact form filled out from ${firstName} ${firstName} sent`,
                data: res.data,
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper(`Contact form filled out from ${firstName} ${firstName} failed`, upsertFailedCode, err);
            return serviceErrorBuilder(`Contact form filled out from ${firstName} ${firstName} failed`, upsertFailedCode, err);
        }

    },
    sendMessage(data) {

        const { Question, User, placeId } = data;
        const ownerPlace = Places.findOne({ _id: placeId }) || {};
        const Profile = Profiles.findOne({ ownerUserId: ownerPlace.ownerUserId }) || {};
        const userId = Meteor.userId();
        const RequestorPlace = ownerPlace;
        const RequestedPlace = Places.findOne({ ownerUserId: userId }) || {};

        const sync = Meteor.wrapAsync(HTTP.call);
        try {
            const res = sync('POST', Meteor.settings.azureLambdaURLS.sendMessage, {
                data: {
                    User,
                    Question,
                    Profile,
                    RequestorPlace,
                    RequestedPlace,
                },
            });
            consoleLogHelper(`Email message from ${User} sent`, genericSuccessCode, userId, `Place Id of interest ${placeId}`);
            return serviceSuccessBuilder(res.data, genericSuccessCode, {
                serviceMessage: `Email message from ${User} sent`,
                data: res.data,
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper(`Email message from ${User} failed`, upsertFailedCode, userId, err);
            return serviceErrorBuilder(`Email message from ${User} failed`, upsertFailedCode, err);
        }
    },
    getAllAvailableCities() {
        try {
            return Places.find({ address: { $ne: null } }).fetch();
        } catch (err) {
            console.log(err.stack);
            return serviceErrorBuilder('Getting all available cities failed', upsertFailedCode, err);
        }
    },
    saveContact(data) {
        try {
            const userId = Meteor.userId();
            if (!userId) return serviceErrorBuilder('Please Sign in before submitting profile info', placeErrorCode);
            let contactClone = cloneDeep(data);
            contactClone.ownerUserId = contactClone.ownerUserId || userId;
            const contactGUID = EmergencyContacts.upsert({ _id: contactClone._id, }, setterOrInsert(contactClone));
            consoleLogHelper(`Place ${contactGUID ? 'updated' : 'added'} success`, genericSuccessCode, userId, `Contact Id ${JSON.stringify(contactClone._id)}`);
            return serviceSuccessBuilder({ contactGUID }, genericSuccessCode, {
                serviceMessage: `Place ${contactGUID ? 'updated' : 'added'}, with key ${contactGUID || contactClone._id}`,
                data: {
                    contact: contactClone,
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper('Contact create or update failed', upsertFailedCode, userId, err);
            return serviceErrorBuilder('Contact create or update failed', upsertFailedCode, err);
        }
    },
    upsertPlace(place, address, amenities) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in before submitting profile info', placeErrorCode);
        if ((place.ownerUserId && place.ownerUserId !== userId) || (address.ownerUserId && address.ownerUserId !== userId) || (amenities.ownerUserId && amenities.ownerUserId !== userId)) return serviceErrorBuilder('Please dont mess with other users data', placeErrorCode);
        let placeClone = cloneDeep(place);
        let addressClone = cloneDeep(address);
        let amenitiesClone = cloneDeep(amenities);
        try {
            //place Section
            placeClone = checkExistingCollectionIfNoId(Places, placeClone, { ownerUserId: placeClone.ownerUserId || userId }, noShowFieldsForPlace);
            parseInts(placeClone);
            parseFloats(placeClone);
            addOwnerIdAndDateStamp(placeClone, userId);
            const placeGUID = Places.upsert({ _id: placeClone._id }, setterOrInsert(placeClone));
            if (placeGUID.insertedId) placeClone._id = placeGUID.insertedId; //should have a _id already inless placeGUID had it. As a new doc is created without it

            //address section
            addressClone = checkExistingCollectionIfNoId(Addresses, addressClone, { placeId: placeClone._id });
            addOwnerIdAndDateStamp(addressClone, userId, { placeId: placeClone._id });
            const addressGUID = Addresses.upsert({ _id: addressClone._id }, setterOrInsert(addressClone));
            if (addressGUID.insertedId) addressClone._id = addressGUID.insertedId;

            //ammenities section
            amenitiesClone = checkExistingCollectionIfNoId(Amenities, amenitiesClone, { placeId: placeClone._id })
            addOwnerIdAndDateStamp(amenitiesClone, userId, { placeId: placeClone._id });
            const amenitiesGUID = Amenities.upsert({ _id: amenitiesClone._id }, setterOrInsert(amenitiesClone));
            if (amenitiesGUID.insertedId) amenitiesClone._id = amenitiesGUID.insertedId; //will exist if _id doesn't
            delete placeClone.ownerUserId;
            delete addressClone.ownerUserId;
            delete addressClone.placeId;
            delete amenitiesClone.ownerUserId;
            delete amenitiesClone.placeId;

            consoleLogHelper(`Place ${placeGUID.insertedId ? 'updated' : 'added'} success`, genericSuccessCode, userId, `Place Id ${JSON.stringify(placeClone._id)}`);
            return serviceSuccessBuilder({ placeGUID, addressGUID, amenitiesGUID }, genericSuccessCode, {
                serviceMessage: `Place ${placeGUID.insertedId ? 'updated' : 'added'}, with key ${placeGUID.insertedId || placeClone._id}`,
                data: {
                    amenities: amenitiesClone,
                    address: addressClone,
                    place: placeClone,
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper('Place create or update failed', upsertFailedCode, userId, err);
            return serviceErrorBuilder('Place create or update failed', upsertFailedCode, err);
        }
    },
    'trips.saveTrip': function saveTrip(trip) {
        const tripClone = cloneDeep(trip);
        const userId = Meteor.userId();
        const { dates, requesterUserId, requesteeUserId, requesterMessage } = tripClone;
        if (!userId) return serviceErrorBuilder('Please Sign in before submitting profile info', tripErrorCode);
        if (!dates || !dates.arrival || !dates.departure) return serviceErrorBuilder('Please select dates', tripErrorCode);
        if (!requesterUserId || !requesteeUserId) return serviceErrorBuilder('Are you a ghost!? We don\'t know who you are', tripErrorCode);
        try {
            const { firstName, email } = Profiles.findOne({ ownerUserId: requesteeUserId }, { fields: { email: 1, firstName: 1 } }) || {};
            tripClone.requesteeEmail = email;
            tripClone.requesteeName = firstName;
            if (!tripClone.status) tripClone.status = tripStatus.PENDING;
            let tripFindInfo = { requesterUserId, dates, requesteeUserId };

            const { _id } = Trips.findOne(tripFindInfo) || {};
            if (_id) {
                tripFindInfo = { _id };
                tripClone._id = _id;
            }
            const tripGUID = Trips.upsert(tripFindInfo, setterOrInsert(tripClone));
            if (tripGUID.insertedId) {
                tripClone._id = tripGUID.insertedId;
                methods.requestEmail(tripClone, dates);
                //tim, this is where you can send notification emails. As this only happens with a new swap and not with old ones being updated
            }

            delete tripClone.requesteeEmail;
            const serviceMessage = tripGUID.insertedId ? `key ${tripGUID.insertId}` : `userId: ${requesterUserId}, requesteeUserId: ${requesteeUserId}, dates: ${JSON.stringify(dates)}`;
            consoleLogHelper(`Swap with user ${requesteeUserId} ${tripGUID.insertedId ? 'created' : 'updated'}, with message of "${requesterMessage}"`, genericSuccessCode, userId, `${dates.arrival} - ${dates.departure}, swapId: ${_id}`);
            return serviceSuccessBuilder({ tripGUID }, genericSuccessCode, {
                serviceMessage: `Swap ${tripGUID.insertedId ? 'created' : 'updated'}, with with search of ${serviceMessage}`,
                data: {
                    trip: tripClone,
                    isNewTrip: !!tripGUID.insertedId,
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper('Failed when attempting to find a place by Id', mongoFindOneError, Meteor.userId(), err);
            return serviceErrorBuilder('Failed when attempting to find a place by Id', mongoFindOneError, err);
        }
    },
    'trips.getUserTrips': function getUserTrips({ id }) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in or create an account before submitting profile info', tripErrorCode);
        if (!id) return serviceErrorBuilder('Please send the correct arguments', tripErrorCode);
        try {
            const trips = Trips.find({ $or: [{ requesterUserId: id }, { requesteeUserId: id }] }, { fields: FieldsForTrip }).fetch();
            consoleLogHelper(`Found ${trips.length} swaps`, genericSuccessCode, Meteor.userId(), '');
            return serviceSuccessBuilder({}, genericSuccessCode, {
                serviceMessage: `Found ${trips.length} swaps via _id of ${id}`,
                data: {
                    trips,
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper('Failed when attempting to find trips for user', mongoFindOneError, Meteor.userId(), err);
            return serviceErrorBuilder('Failed when attempting to find trips for user', mongoFindOneError, err);
        }
    },
    'trips.updateTripStatus'({ _id, status, prevStatus }) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in or create an account before submitting profile info', tripErrorCode);
        if (!_id) return serviceErrorBuilder('Please send the correct arguments', tripErrorCode);
        try {
            const tripGUID = Trips.update({ _id, $or: [{ requesterUserId: userId }, { requesteeUserId: userId }] }, { $set: { status } });
            let swapObj = Trips.find({ $or: [{ requesterUserId: userId }, { requesteeUserId: userId }] }, { fields: FieldsForTrip }).fetch();
            if (swapObj && swapObj.length > 1) {
                swapObj = swapObj[0];
            }
            sendAcceptEmail(swapObj);
            consoleLogHelper(`Updated trip: ${_id} from: ${prevStatus} to ${status}`, genericSuccessCode, Meteor.userId(), '');
            return serviceSuccessBuilder({ updateInfo: tripGUID }, genericSuccessCode, {
                serviceMessage: `Updated trip: ${_id} from: ${prevStatus} to ${status}`,
                data: {
                    _id,
                    prevStatus,
                    status,
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper(`Failed when attempting to update trip: ${id}`, mongoFindOneError, Meteor.userId(), err);
            return serviceErrorBuilder(`Failed when attempting to update trip: ${id}`, mongoFindOneError, err);
        }
    },
    'trips.createCharge'(swapObj) {
        const userId = Meteor.userId();
        try {
            const { requesterName, requesterUserId, requesteeName, requesteeUserId } = swapObj;

            let swapClone = cloneDeep(swapObj);

            const currentUserCustomer = Customers.findOne({ userId: userId }) || {};
            const requesterCustomer = Customers.findOne({ userId: requesterUserId }) || {};

            const stripe = Stripe(Meteor.settings.private.stripe);

            stripe.charges.create({
                amount: Meteor.settings.private.swapCost,
                currency: "usd",
                customer: currentUserCustomer.customerId,
            });

            stripe.charges.create({
                amount: Meteor.settings.private.swapCost,
                currency: "usd",
                customer: requesterCustomer.customerId,
            });
            const status = tripStatus.ACTIVE;

            const swapGUID = Trips.update({ _id: swapClone._id }, { $set: { status } });

            sendAcceptEmail(swapObj);

            consoleLogHelper(`Swap Accecpted and Charged ${(Meteor.settings.private.swapCost / 2).toFixed(2)} for ${requesterName} and ${requesteeName}. ${JSON.stringify(swapGUID)}`, genericSuccessCode, userId, `Swap Id ${JSON.stringify(swapClone._id)}`);
            return serviceSuccessBuilder({ requesterName, requesteeName, requesteeUserId, requesterUserId, swapGUID }, genericSuccessCode, {
                serviceMessage: `Swap Accecpted and Charged ${(Meteor.settings.private.swapCost / 2).toFixed(2)}`,
                data: {
                    requesterName,
                    requesteeName,
                    _id: swapClone._id,
                    status,
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper(`Create Charge error`, upsertFailedCode, userId, err);
            return serviceErrorBuilder('Customer create or update failed', upsertFailedCode, err);
        }
    },
    'trips.updateTripReview'({ _id, message, rating }) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in or create an account before submitting review', tripErrorCode);
        if (!_id || !message || !rating) return serviceErrorBuilder('Please send the correct arguments', tripErrorCode);
        try {
            const trip = Trips.findOne({ _id }, { fields: FieldsForTrip });
            const isUserRequester = userId === trip.requesterUserId;
            const userPost = isUserRequester ? 'er' : 'ee';
            const otherPost = !isUserRequester ? 'er' : 'ee';
            const oldRating = trip[`request${userPost}Rating`];
            const placeId = trip[`request${otherPost}PlaceId`];//rating other persons place
            const updatedData = {
                [`request${userPost}Rating`]: rating,
                [`request${userPost}ReviewMessage`]: message,
            };
            let changedToComplete = false;
            if (typeof trip[`request${otherPost}Rating`] !== 'undefined' && typeof rating !== 'undefined') {//other already rated
                changedToComplete = true;
                updatedData.status = tripStatus.COMPLETE;
            }
            const updatePlaceResults = updatePlaceRating(userId, placeId, rating, oldRating);
            if (!updatePlaceResults.updateObject) return updatePlaceResults;

            const { averageRating, numberOfReviews } = updatePlaceResults.updateObject;

            const tripGUID = Trips.update({ _id, requesterUserId: trip.requesterUserId, requesteeUserId: trip.requesteeUserId }, { $set: updatedData });
            const { requesteeUserId, requesterUserId } = trip;
            consoleLogHelper(`Updated trip: ${_id} with review: ${rating} - ${message}`, genericSuccessCode, Meteor.userId(), '');
            return serviceSuccessBuilder({ updateInfo: tripGUID }, genericSuccessCode, {
                serviceMessage: `Updated trip: ${_id} with review: ${rating} - ${message}`,
                data: {
                    trip: Object.assign(trip, updatedData),
                    changedToComplete,
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper(`Failed when attempting to update trip review: ${id}`, mongoFindOneError, Meteor.userId(), err, { _id, rating, message, requesteeUserId, requesterUserId });
            return serviceErrorBuilder(`Failed when attempting to update review: ${id}`, mongoFindOneError, err);
        }
    },
    'places.updateAlwaysAvailable'({ availableAnytime, _id, ownerUserId }) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in or create an account before submitting place info', tripErrorCode);
        if (typeof availableAnytime === 'undefined' || !_id || ownerUserId !== userId) return serviceErrorBuilder('Please send the correct arguments', tripErrorCode);
        try {
            const tripGUID = Places.update({ _id, ownerUserId }, { $set: { availableAnytime } });
            consoleLogHelper(`Updated place: ${_id} to be ${availableAnytime ? 'available anytime' : 'available only on given dates'}`, genericSuccessCode, userId, '');
            return serviceSuccessBuilder({ updateInfo: tripGUID }, genericSuccessCode, {
                serviceMessage: `Updated place: ${_id} to be ${availableAnytime ? 'available anytime' : 'available only on given dates'}`,
                data: {
                    availableAnytime,
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper(`Failed when attempting to update trip: ${id}`, mongoFindOneError, Meteor.userId(), err);
            return serviceErrorBuilder(`Failed when attempting to update trip: ${id}`, mongoFindOneError, err);
        }
    },
    'places.getPlaceById': function getPlaceById({ _id, ...args }) {
        if (!_id) {
            consoleErrorHelper('Failed when attempting to find a place, please send correct Args', mongoFindOneError, Meteor.userId(), args);
            return serviceErrorBuilder('Failed when attempting to find a place, please send correct Args', mongoFindOneError, { ...args });
        }
        try {
            const placeForBrowse = Places.findOne({ _id }, { fields: FieldsForBrowseProfile }) || {};
            placeForBrowse.placeImgs = FileUrls.find({ placeId: _id, deleted: false }, { fields: FieldsForBrowseProfile, sort: { position: 1 } }).fetch();
            consoleLogHelper('Found one place', genericSuccessCode, Meteor.userId(), placeForBrowse._id);
            return serviceSuccessBuilder({}, genericSuccessCode, {
                serviceMessage: `Found one place via _id of ${_id}`,
                data: {
                    placeForBrowse,
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper('Failed when attempting to find a place by Id', mongoFindOneError, Meteor.userId(), err);
            return serviceErrorBuilder('Failed when attempting to find a place by Id', mongoFindOneError, err);
        }
    },
    'places.updateAvailability': function getByAvailability({ availableDates, _id }) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in before submitting profile info', placeErrorCode);
        if (!_id || !availableDates) return serviceErrorBuilder('Please provide correct params', placeErrorCode);
        const setObj = {
            $set: {
                availableDates,
            },
        };
        try {
            Places.update({ _id, ownerUserId: userId }, setObj);//ownerUserId means that only if the place is owned by the logged in user it can be updated
            consoleLogHelper('Place Availability updated successfully', genericSuccessCode, userId, JSON.stringify(availableDates));
            return serviceSuccessBuilder({ numberOfDates: availableDates.length }, genericSuccessCode, {
                serviceMessage: `Place availability successfully updated to ${availableDates.length} dates`,
                data: {
                    place: {
                        availableDates,
                    },
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper('Place availability update failed', upsertFailedCode, userId, err);
            return serviceErrorBuilder('Place availability update failed', upsertFailedCode, err);
        }
    },
    'places.getByAvailability': function getByAvailability({ arrival, departure, numOfGuests, coords }) {
        const userId = Meteor.userId();
        if (!coords || !checkIfCoordsAreValid(coords)) return serviceErrorBuilder("We need to know where you're looking to swap!", placeErrorCode);
        try {
            const { lat, lng, distance } = coords;
            const maxDistance = parseFloat((distance || 50) / 3959);
            const searchObj = {
                location: {
                    $geoWithin: {
                        $centerSphere: [[lng, lat], maxDistance],
                    },
                },
            };
            if (numOfGuests) searchObj.numOfGuests = { $gte: parseInt(numOfGuests, 10) };
            if (arrival && departure) {
                searchObj.$or = [{ availableAnytime: true }, { availableDates: { $elemMatch: { arrival: { $gte: arrival }, departure: { $lte: departure } } } },
                { availableDates: { $elemMatch: { arrival: { $lte: arrival }, departure: { $gte: departure } } } }];
            }
            const places = Places.find(searchObj, { fields: FieldsForBrowseProfile }).fetch();
            const placeIds = [];
            const ownerUserIds = [];
            places.forEach((place) => {
                placeIds.push(place._id);
                ownerUserIds.push(place.ownerUserId);
            });
            const placeImgs = FileUrls.find({ placeId: { $in: placeIds }, deleted: false }, { fields: FieldsForBrowseProfile, sort: { position: 1 } }).fetch();
            consoleLogHelper(`Found ${places.length} places within date range`, genericSuccessCode, userId, JSON.stringify(searchObj));
            return serviceSuccessBuilder({ numberOfPlaces: places.length }, genericSuccessCode, {
                serviceMessage: `We found ${places.length} places within date range`,
                data: {
                    places,
                    placeImgs,
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper(`Searching for places with ${arrival} and ${arrival} failed`, placeErrorCode, userId, err);
            return serviceErrorBuilder(`Searching for places with ${arrival} and ${arrival} failed`, placeErrorCode, err);
        }
    },
    'images.place.store': function placeImageStore(fileObj) {
        return imageServiceHelper(fileObj, FileTypes.PLACE, 'placeId', Meteor.userId());
    },
    'images.place.get': function placeImageGet({ placeId }) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in before getting images', placeErrorCode);
        const fieldsToReturn = {
            _id: 1,
            url: 1,
        };
        const files = FileUrls.find({ placeId, type: FileTypes.PLACE, deleted: false }, { fields: fieldsToReturn, sort: { position: 1 } }).fetch();

        consoleLogHelper(`Get place images success with ${files.length} found`, genericSuccessCode, userId);
        return serviceSuccessBuilder({}, genericSuccessCode, {
            serviceMessage: `Get place images success with ${files.length} found`,
            data: {
                images: files,
            },
        });
    },
    'images.place.delete': function placeImageDelete({ _id, placeId }) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in before getting images', placeErrorCode);
        try {
            const filesGUID = FileUrls.update({ _id, type: FileTypes.PLACE, deleted: false, placeId }, { $set: { deleted: true } });

            consoleLogHelper(`Successfully deleted ${filesGUID} place Images with id: ${_id}`, genericSuccessCode, userId);
            return serviceSuccessBuilder({ guidReturn: filesGUID }, genericSuccessCode, {
                serviceMessage: `Successfully deleted ${filesGUID} place Images`,
                data: {
                    _id,
                    placeId,
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper(`Delete Place image for image id: ${_id} unsuccessful`, placeErrorCode, userId, err);
            return serviceErrorBuilder(`Delete Place image for image id: ${_id} unsuccessful`, placeErrorCode, err);
        }
    },
    'images.place.saveOrder': function saveImageOrder({ placeImgs }) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in before getting images', placeErrorCode);
        try {
            const bulkUpdates = placeImgs.map((img, idx) => {
                return {
                    updateOne: {
                        filter: { _id: img._id },
                        update: { $set: { position: img.position || idx } },
                    },
                };
            });


            const filesGUID = FileUrls.rawCollection().bulkWrite(bulkUpdates);

            consoleLogHelper(`Successfully updated ${filesGUID.updated} place Images' positions`, genericSuccessCode, userId);
            return serviceSuccessBuilder({ guidReturn: filesGUID }, genericSuccessCode, {
                serviceMessage: `Successfully updated ${filesGUID.updated} place Images`,
                data: {
                    placeImgs,
                },
            });
        } catch (err) {
            console.log(err.stack);
            consoleErrorHelper(`Update Place Image Order was unsuccessful for ${userId}`, placeErrorCode, userId, err);
            return serviceErrorBuilder(`Update Place Image Order was unsuccessful ${userId}`, placeErrorCode, err);
        }
    },
    'images.profile.store': function placeImageStore(fileObj) {
        return imageServiceHelper(fileObj, FileTypes.PROFILE, 'profileId', Meteor.userId(), true);
    },
    'images.profile.getOne': function profileImageGet() {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in before getting images', placeErrorCode);
        const fieldsToReturn = {
            url: 1,
            _id: 1,
        };
        const file = FileUrls.findOne({ userId, type: FileTypes.PROFILE, deleted: false, active: true, }, {
            fields: fieldsToReturn,
            sort: { added: -1 },
        });

        consoleLogHelper('Get profile images success with 1 found', genericSuccessCode, userId);
        return serviceSuccessBuilder({}, genericSuccessCode, {
            serviceMessage: 'Get one profile images success with 1 found',
            data: {
                image: file,
            },
        });
    },
    'files.store': function filesStoreMethod(file) {
        check(file, Object);
        const userId = this.userId;
        const sanitizedUrl =
            file.url.replace(userId, `${encodeURIComponent(userId)}`)
                .replace(file.name, `${s3PublicUrl(file.name)}`);
        return FileUrls.insert({ userId: this.userId, url: sanitizedUrl, fileName: file.name, added: new Date() });
    },
    'files.delete': function filesStoreMethod(fileId) {
        check(fileId, String);
        const file = FileUrls.findOne(fileId);
        consoleLogHelper('File Delete Attempting', 1, this.userId, JSON.stringify(file));
        if (file && file.userId === this.userId) {
            return S3.deleteFile(file, () => {
                FileUrls.remove({ _id: fileId, userId: this.userId });
            });
        }

        throw new Meteor.Error('500', 'Must be logged in to do that!');
    },
    'test': async function () {
        const userIds = await FileUrls.rawCollection().distinct('userId', { type: 'PLACE' });
        const profiles = Places.find({ ownerUserId: { $nin: userIds } }).fetch();
        return serviceSuccessBuilder({}, genericSuccessCode, {
            serviceMessage: 'Get one profile images success with 1 found',
            data: {
                userIds,
                profiles,
            },
        });
    }
};

Meteor.methods(methods);