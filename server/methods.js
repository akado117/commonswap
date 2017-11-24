import s3PublicUrl from 'node-s3-public-url';
import { check } from 'meteor/check';
import Stripe from 'stripe';
import FileUrls from '../imports/collections/FileUrls';
import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { Addresses, Profiles, Places, Amenities, Interests, EmergencyContacts, DesiredDate, Customers } from '../imports/collections/mainCollection';
import { serviceErrorBuilder, consoleErrorHelper, serviceSuccessBuilder, consoleLogHelper,
    profileErrorCode, insufficentParamsCode, upsertFailedCode, genericSuccessCode, placeErrorCode, FileTypes, plannerErrorCode, FieldsForBrowseProfile } from '../imports/lib/Constants';
import S3 from './s3';
import { parseInts, parseFloats } from '../imports/helpers/DataHelpers';
import _ from 'lodash';

const client = new ApolloClient(meteorClientConfig());

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

Meteor.methods({//DO NOT PASS ID UNLESS YOU WANT TO REPLACE WHOLE DOCUMENT - REQUIRES REFACTOR TO USE SETTERS FOR UPSERT (prop: $set: data)
    upsertProfile(profileParams, interests, emergencyContacts) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in before submitting profile info', profileErrorCode);
        //if ((profileParams._id && profileParams.ownerUserId !== userId) || (interests._id && interests.ownerUserId !== userId)) return serviceErrorBuilder('Please dont mess with other users data', profileErrorCode);
        if (profileParams && typeof profileParams === 'object') {
            let profileClone = _.cloneDeep(profileParams);
            let interestsClone = _.cloneDeep(interests);
            let emergencyContactsClone = _.cloneDeep(emergencyContacts);

            try {
                //profile section
                let ownerProfileId = profileClone._id;//assumes must be an update if there is an id being passed back
                if (!ownerProfileId) { //check for existing profiles if no id passed in
                    const ownerProfile = Profiles.findOne({ ownerUserId: profileClone.ownerUserId || userId }, { sort: { added: -1 } }) || {};
                    ownerProfileId = ownerProfile._id;
                    profileClone = _.merge(ownerProfile, profileClone);
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
                    interestsClone = _.merge(ownerInterests, interestsClone);
                }
                interestsClone.ownerUserId = interestsClone.ownerUserId || userId;
                interestsClone.profileId = profileClone._id || profileGUID.insertedId;
                if (!interestsClone.added) interestsClone.added = new Date();
                const interestsGUID = Interests.upsert({ _id: interestsClone._id }, interestsClone);
                interestsClone._id = interestsGUID.insertedId || interestsClone._id;
                delete interestsClone.ownerUserId;
                delete interestsClone.profileId;

                consoleLogHelper(`Profile ${profileClone._id ? 'updated' : 'added'} success`, genericSuccessCode, userId, JSON.stringify(profileClone));
                return serviceSuccessBuilder({ profileGUID, emergencyGUIDs, interestsGUID}, genericSuccessCode, {
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
        }).then(function(customer) {
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
    upsertPlace(place, address, amenities) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in before submitting profile info', placeErrorCode);
        //if ((place._id && place.ownerUserId !== userId) || (address._id && address.ownerUserId !== userId) || (amenities._id && amenities.userId !== userId)) return serviceErrorBuilder('Please dont mess with other users data', placeErrorCode);
        let placeClone = _.cloneDeep(place);
        let addressClone = _.cloneDeep(address);
        let amenitiesClone = _.cloneDeep(amenities);
        try {
            //place Section
            let ownerPlaceId = placeClone._id;//assumes it must be from the db and an update if this is here
            if (!ownerPlaceId) { //check for existing profiles if no id passed in
                const ownerPlace = Places.findOne({ ownerUserId: placeClone.ownerUserId || userId }, { sort: { added: -1 } }) || {};
                ownerPlaceId = ownerPlace._id;
                placeClone = _.merge(ownerPlace, placeClone);//overwrite with new data
            }
            if (!placeClone.ownerUserId) placeClone.ownerUserId = userId;
            if (!placeClone.added) placeClone.added = new Date();
            parseInts(placeClone);
            parseFloats(placeClone);
            const placeGUID = Places.upsert({ _id: ownerPlaceId }, placeClone);
            if (placeGUID.insertedId) placeClone._id = placeGUID.insertedId; //should have a _id already inless placeGUID had it. As a new doc is created without it
            delete placeClone.ownerUserId;
            //address section
            if (!addressClone._id) {
                const oldAddress = Addresses.findOne({ placeId: placeClone._id }, { sort: { added: -1 } }) || {}; //attempt to find any created and merge new data with it
                addressClone = _.merge(oldAddress, addressClone);
            }
            if (!addressClone.ownerUserId) addressClone.ownerUserId = userId;
            if (!addressClone.placeId) addressClone.placeId = placeClone._id; //should have id from insertGUID or already passed in
            if (!addressClone.added) addressClone.added = new Date();
            const addressGUID = Addresses.upsert({ _id: addressClone._id }, addressClone);
            if (addressGUID.insertedId) addressClone._id = addressGUID.insertedId;
            delete addressClone.ownerUserId;
            delete addressClone.placeId;
            //ammenities section
            if (!amenitiesClone._id) {
                const placeAmenities = Amenities.findOne({ placeId: placeClone._id }, { sort: { added: -1 } }) || {};
                amenitiesClone = _.merge(placeAmenities, amenitiesClone);
            }
            amenitiesClone.ownerUserId = amenitiesClone.ownerUserId || userId;
            if (!amenitiesClone.placeId) amenitiesClone.placeId = placeClone._id;
            if (!amenitiesClone.added) amenitiesClone.added = new Date();
            const amenitiesGUID = Amenities.upsert({ _id: amenitiesClone._id }, amenitiesClone);
            if (amenitiesGUID.insertedId) amenitiesClone._id = amenitiesGUID.insertedId; //will exist if _id doesn't
            delete amenitiesClone.ownerUserId;
            delete amenitiesClone.placeId;

            consoleLogHelper(`Place ${placeClone._id ? 'updated' : 'added'} success`, genericSuccessCode, userId, `Place Id ${JSON.stringify(placeClone._id)}`);
            return serviceSuccessBuilder({ placeGUID, addressGUID, amenitiesGUID}, genericSuccessCode, {
                serviceMessage: `Place ${placeClone._id ? 'updated' : 'added'}, with key ${placeGUID.insertedId || placeClone._id}`,
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
    'places.getByAvailability': function getByAvailability({ arrival, departure, numOfGuests }) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in or create an account before submitting profile info', placeErrorCode);
        if (!arrival || !departure) return serviceErrorBuilder("We need to know when you're looking to swap!", placeErrorCode);
        try {
            const searchObj = { availableDates: { $elemMatch: { start: { $gte: arrival }, end: { $lte: departure } } } }
            if (numOfGuests) searchObj.numOfGuests = { $gte: parseInt(numOfGuests, 10) };
            const places = Places.find(searchObj, { fields: FieldsForBrowseProfile }).fetch();
            const placeIds = [];
            const ownerUserIds = [];
            places.forEach((place) => {
                placeIds.push(place._id);
                ownerUserIds.push(place.ownerUserId);
            });
            const addresses = Addresses.find({ placeId: { $in: placeIds } }, { fields: FieldsForBrowseProfile }).fetch();
            const placeImgs = FileUrls.find({ placeId: { $in: placeIds }, deleted: false }, { fields: FieldsForBrowseProfile }).fetch();
            const profileImgs = FileUrls.find({ userId: { $in: ownerUserIds }, deleted: false, active: true }, { fields: FieldsForBrowseProfile }).fetch();
            const profiles = Profiles.find({ ownerUserId: { $in: ownerUserIds }}, { fields: FieldsForBrowseProfile }).fetch();
            consoleLogHelper(`Found ${places.length} places within date range`, genericSuccessCode, userId, JSON.stringify(searchObj));
            return serviceSuccessBuilder({ numberOfPlaces: places.length }, genericSuccessCode, {
                serviceMessage: `We found ${places.length} places within date range`,
                data: {
                    places,
                    addresses,
                    placeImgs,
                    profileImgs,
                    profiles,
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
        const files = FileUrls.find({ placeId, type: FileTypes.PLACE, deleted: false }, { fields: fieldsToReturn }).fetch();

        consoleLogHelper(`Get place images success with ${files.length} found`, genericSuccessCode, userId);
        return serviceSuccessBuilder({}, genericSuccessCode, {
            serviceMessage: `Get place images success with ${files.length} found`,
            data: {
                images: files,
            },
        });
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
        const file = FileUrls.findOne({userId, type: FileTypes.PROFILE, deleted: false }, {
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