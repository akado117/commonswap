import s3PublicUrl from 'node-s3-public-url';
import { check } from 'meteor/check';
import Stripe from 'stripe';
import FileUrls from '../imports/collections/FileUrls';
import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { Addresses, Profiles, Places, Amenities, Interests, EmergencyContacts, DesiredDate, Customers, Trips } from '../imports/collections/mainCollection';
import {
    serviceErrorBuilder, consoleErrorHelper, serviceSuccessBuilder, consoleLogHelper, mongoFindOneError, tripErrorCode, tripStatus, FieldsForTrip,
    profileErrorCode, insufficentParamsCode, upsertFailedCode, genericSuccessCode, placeErrorCode, FileTypes, plannerErrorCode, FieldsForBrowseProfile, noShowFieldsForPlace
} from '../imports/lib/Constants';
import S3 from './s3';
import { parseInts, parseFloats, checkIfCoordsAreValid } from '../imports/helpers/DataHelpers';
import { merge, cloneDeep } from 'lodash';
import handleSignup from '../imports/modules/server/stripe/handle-signup';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';

const client = new ApolloClient(meteorClientConfig());
let stopLoop = 3;
let counter = 0;

function imageServiceHelper(fileObj, imgType, boundToProp, userId, activeFlag) {
    check(fileObj, Object);
    if (!fileObj[boundToProp]) return serviceErrorBuilder(`Please create and save a ${imgType} first`, placeErrorCode);
    if (!userId) return serviceErrorBuilder('Please Sign in before submitting images', placeErrorCode);
    const insertObj = {
        active: activeFlag,
        deleted: false,
        userId,
        [boundToProp]: fileObj[boundToProp],
        url: fileObj.url,
        fileName: fileObj.name,
        type: imgType,
        added: new Date(),
    };

    const insertId = FileUrls.insert(insertObj);
    if (activeFlag) {
        const searchForObj = {
            active: true,
            _id: { $ne: insertId },
        };
        if (boundToProp) searchForObj[boundToProp] = fileObj[boundToProp];
        const numberUpdated = FileUrls.update(searchForObj, { $set: { active: false } });
        consoleLogHelper(`${numberUpdated} Images changed to inactive`, genericSuccessCode, userId, '');
    }

    consoleLogHelper(`Image added, with key ${insertId}`, genericSuccessCode, userId, JSON.stringify(insertObj));
    return serviceSuccessBuilder({ insertId }, genericSuccessCode, {
        serviceMessage: `Image added, with key ${insertId}`,
        data: {
            image: {
                _id: insertId,
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

function addOwnerIdAndDateStamp(obj, userId, extraProps) {// modifies original object
    if (obj._id) return; //only way possible is for record to not exist THIS RELYS ON CHECKING DB FOR RECORDS BASED UPON USEROWNERID FIRST
    obj.ownerUserId = userId;
    obj.added = new Date();
    console.log(extraProps);
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

Meteor.methods({//DO NOT PASS ID UNLESS YOU WANT TO REPLACE WHOLE DOCUMENT - REQUIRES REFACTOR TO USE SETTERS FOR UPSERT (prop: $set: data)
    signup(customer) {
        check(customer, Object);
        return handleSignup(customer)
        .then(customer => customer)
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
                console.log('Inside upsert card');
                console.log(JSON.stringify(customer));
                //send success data to client
            }
            catch (err) {
                console.log(err.stack);
                consoleErrorHelper('Customer create or update failed', upsertFailedCode, userId, err);
                return serviceErrorBuilder('Customer create or update failed', upsertFailedCode, err);
            }
        });
    },
    createCharge(swapObj) {
        try
        {
            const { address, dates, firstName, rating, ratingMessage, profileImg, place, swapperMessage, status } = swapObj;
            console.log("Place");
            console.log(swapObj);

            const userId = Meteor.userId();

            const cust = Customers.findOne({ userId: userId }) || {};

            const stripe = Stripe(Meteor.settings.private.stripe);

            stripe.charges.create({
                amount: 1000,
                currency: "usd",
                customer: cust.customerId,
              });
        }
        catch (err)
        {
            console.log("Create charge error");
            console.log(err);
        }
    },
    cardInfo(){
        try
        {
            const usedId = Meteor.userId();
            const cust = Customers.findOne({ userId: usedId }) || {};
            console.log("card info");
            console.log(cust);

            //return null;
            return serviceSuccessBuilder({ }, genericSuccessCode, {
                serviceMessage: `Card info retrieved`,
                data: {
                    card: cust.card,
                },
            });

        }
        catch (err)
        {
            console.log("card info error");
            console.log(err);
        }
    },
    requestEmail(data) {

        const { Arrival, Departure, Notes, User, placeId } = data;
        const ownerPlace = Places.findOne({ _id: placeId }) || {};
        const Profile = Profiles.findOne({ ownerUserId: ownerPlace.ownerUserId }) || {};
        const userId = Meteor.userId();
        const RequestorPlace = ownerPlace;
        const RequestedPlace = Places.findOne({ ownerUserId: userId }) || {};

        console.log("USER");
        console.log(User);

        HTTP.call('POST',
        'https://commonswap.azurewebsites.net/api/SwapRequest?code=X7a3QL7LeF89LYcDidaAxhQG3h5jY2A7fQRKP7a38ZydqTUBrV9orw==', {
            data:
                {
                    User,
                    Arrival,
                    Departure,
                    Notes,
                    Profile,
                    RequestorPlace,
                    RequestedPlace,
                }
        }, function( error, response ) {
            if ( error ) {
              console.log("POST CALL");
              console.log( error );
            } else {
                return response;
            }
        });
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
        const { dates, requesterUserId, requesteeUserId } = tripClone;
        if (!userId) return serviceErrorBuilder('Please Sign in before submitting profile info', tripErrorCode);
        if (!dates || !dates.arrival || !dates.departure) return serviceErrorBuilder('Please select dates', tripErrorCode);
        if (!requesterUserId || !requesteeUserId) return serviceErrorBuilder('Are you a ghost!? We don\'t know who you are', tripErrorCode);
        try {
            const { firstName, email } = Profiles.findOne({ ownerUserId: requesteeUserId }, { fields: { email: 1, firstName: 1 } }) || {};
            tripClone.requesteeEmail = email;
            tripClone.requesteeName = firstName;
            if (!tripClone.status) tripClone.status = tripStatus.PENDING;
            const tripGUID = Trips.upsert({ requesterUserId, dates, requesteeUserId }, setterOrInsert(tripClone));
            if (tripGUID.insertedId) {
                tripClone._id = tripGUID.insertedId;
                //tim, this is where you can send notification emails. As this only happens with a new swap and not with old ones being updated
            }
            delete tripClone.requesteeEmail;
            consoleLogHelper(`Swap with user ${requesteeUserId} ${tripGUID.insertedId ? 'created' : 'updated'}, with key ${tripGUID.insertedId || tripClone._id}`, genericSuccessCode, userId, `${dates.arrival} - ${dates.departure}`);
            return serviceSuccessBuilder({ tripGUID }, genericSuccessCode, {
                serviceMessage: `Swap ${tripGUID.insertedId ? 'created' : 'updated'}, with key ${tripGUID.insertedId || tripClone._id}`,
                data: {
                    trip: tripClone,
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
        if (!userId) return serviceErrorBuilder('Please Sign in or create an account before submitting profile info', placeErrorCode);
        if (!id) return serviceErrorBuilder('Please send the correct arguments', placeErrorCode);
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
    'places.getPlaceById': function getPlaceById({ _id, ...args }) {
        if (!_id) {
            consoleErrorHelper('Failed when attempting to find a place, please send correct Args', mongoFindOneError, Meteor.userId(), args);
            return serviceErrorBuilder('Failed when attempting to find a place, please send correct Args', mongoFindOneError, { ...args });
        }
        try {
            const placeForBrowse = Places.findOne({ _id }, { fields: FieldsForBrowseProfile }) || {};
            placeForBrowse.placeImgs = FileUrls.find({ placeId: _id, deleted: false }, { fields: FieldsForBrowseProfile }).fetch();
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
        if (!userId) return serviceErrorBuilder('Please Sign in or create an account before submitting profile info', placeErrorCode);
        if (!arrival || !departure) return serviceErrorBuilder("We need to know when you're looking to swap!", placeErrorCode);
        try {
            const searchObj = { availableDates: { $elemMatch: { arrival: { $gte: arrival }, departure: { $lte: departure } } } }
            if (numOfGuests) searchObj.numOfGuests = { $gte: parseInt(numOfGuests, 10) };
            if (coords && checkIfCoordsAreValid(coords)) {
                const { lat, lng, distance } = coords;
                const maxDistance = parseFloat((distance || 50) / 3959);
                searchObj.location = {
                    $geoWithin: {
                        $centerSphere: [[lng, lat], maxDistance],
                    },
                };
            }
            const places = Places.find(searchObj, { fields: FieldsForBrowseProfile }).fetch();
            const placeIds = [];
            const ownerUserIds = [];
            places.forEach((place) => {
                placeIds.push(place._id);
                ownerUserIds.push(place.ownerUserId);
            });
            const placeImgs = FileUrls.find({ placeId: { $in: placeIds }, deleted: false }, { fields: FieldsForBrowseProfile }).fetch();
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
        if (counter < stopLoop) {
            const userId = Meteor.userId();
            if (!userId) return serviceErrorBuilder('Please Sign in before getting images', placeErrorCode);
            const fieldsToReturn = {
                _id: 1,
                url: 1,
            };
            const files = FileUrls.find({ placeId, type: FileTypes.PLACE, deleted: false }, { fields: fieldsToReturn }).fetch();

            consoleLogHelper(`Get place images success with ${files.length} found`, genericSuccessCode, userId);
            return serviceSuccessBuilder({}, genericSuccessCode, {
                serviceMessage: `Get place images success with ${files.length} found`,
                data: {
                    images: files,
                },
            });
            counter++;
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
        const file = FileUrls.findOne({ userId, type: FileTypes.PROFILE, deleted: false }, {
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
});