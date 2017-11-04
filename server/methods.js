import s3PublicUrl from 'node-s3-public-url';
import { check } from 'meteor/check';
import random from 'random-words'
import Roomies from '../imports/collections/Roomies';
import FileUrls from '../imports/collections/FileUrls';
import { Addresses, Profiles, Places, Amenities, Interests, EmergencyContacts } from '../imports/collections/mainCollection';
import { serviceErrorBuilder, consoleErrorHelper, serviceSuccessBuilder, consoleLogHelper,
    profileErrorCode, insufficentParamsCode, upsertFailedCode, genericSuccessCode } from '../imports/lib/Constants'
import S3 from './s3';
import _ from 'lodash'

const fakeEC = () => ({
    name: random({ exactly: 2, join: ' ' }),
    phone: Math.floor((Math.random() * 1e10)) + '',
    email: random(),
    relation: random(),
});


const randBool = () => !Math.floor(Math.random()*2);
const fakeInter = () => ({
    photography: randBool(),
    wineries: randBool(),
    beachBum: randBool(),
    film: randBool(),
    hiking: randBool(),
    clubber: randBool(),
    liveMusic: randBool(),
    foodie: randBool(),
    orgTour: randBool(),
});

const fakeProfile = () => ({
    firstName: random(),
    lastName: random(),
    gender: random(),
    dob: new Date().getDate(),
    email: random(),
    phone: Math.floor((Math.random() * 1e10)) + '',
    lang: random(),
    personalSummary: random({ exactly: 15, join: ' ' }),
    school: `University of ${random()}`,
    classOf:  Math.floor((Math.random() * 10)) + 2013,
    work:  random({ exactly: 10, join: ' ' }),
    timeZone: 'est',
    cleanliness:  Math.floor((Math.random() * 10)),
    extroversion:  Math.floor((Math.random() * 10)),
})

Meteor.methods({
    upsertProfile(profileParams = fakeProfile(), interests = fakeInter(), emergencyContacts = [fakeEC()]) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in before submitting profile info', profileErrorCode);
        if (profileParams && typeof profileParams === 'object') {
            let profileClone = _.cloneDeep(profileParams);
            let interestsClone = _.cloneDeep(interests);
            let emergencyContactsClone = _.cloneDeep(emergencyContacts);

            try {
                //profile section
                let ownerProfileId = profileClone._id;
                if (!ownerProfileId) { //check for existing profiles if no id passed in
                    const ownerProfile = Profiles.findOne({ ownerUserId: profileClone.ownerUserId || userId }) || {};
                    ownerProfileId = ownerProfile._id;
                    profileClone = _.merge(ownerProfile, profileClone);
                }
                if (!profileClone.ownerUserId) profileClone.ownerUserId = profileClone.ownerUserId || userId;
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
                    const ownerInterests = Interests.findOne({ ownerUserId: interestsClone.ownerUserId || userId }) || {};
                    interestsClone = _.merge(ownerInterests, interestsClone);
                }
                interestsClone.ownerUserId = interestsClone.ownerUserId || userId;
                interestsClone.profileId = profileClone._id || profileGUID.insertedId;
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
    upsertPlace(place = {}, address = {}, amenities = {}) {
        const userId = Meteor.userId();
        if (!userId) return serviceErrorBuilder('Please Sign in before submitting profile info', profileErrorCode);
        let placeClone = _.cloneDeep(place);
        let addressClone = _.cloneDeep(address);
        let amenitiesClone = _.cloneDeep(amenities);
        try {
            //place Section
            let ownerPlaceId = placeClone._id;
            if (!ownerPlaceId) { //check for existing profiles if no id passed in
                const ownerPlace = Places.findOne({ ownerUserId: placeClone.ownerUserId || userId }) || {};
                ownerPlaceId = ownerPlace._id;
                placeClone = _.merge(ownerPlace, placeClone);//overwrite with new data
            }
            if (!placeClone.ownerUserId) placeClone.ownerUserId = userId;
            const placeGUID = Places.upsert({ _id: ownerPlaceId }, placeClone);
            if (placeGUID.insertedId) placeClone._id = placeGUID.insertedId; //should have a _id already inless placeGUID had it. As a new doc is created without it
            delete placeClone.ownerUserId;
            //address section
            if (!addressClone._id) {
                const oldAddress = Addresses.findOne({ placeId: placeClone._id }) || {}; //attempt to find any created and merge new data with it
                addressClone = _.merge(oldAddress, addressClone);
            }
            if (!addressClone.ownerUserId) addressClone.ownerUserId = userId;
            if (!addressClone.placeId) addressClone.placeId = placeClone._id; //should have id from insertGUID or already passed in
            const addressGUID = Addresses.upsert({ _id: addressClone._id }, addressClone);
            if (addressGUID.insertedId) addressClone._id = addressGUID.insertedId;
            delete addressClone.ownerUserId;
            delete addressClone.placeId;
            //ammenities section
            if (!amenitiesClone._id) {
                const placeAmenities = Amenities.findOne({ placeId: placeClone._id }) || {};
                amenitiesClone = _.merge(placeAmenities, amenitiesClone);
            }
            amenitiesClone.ownerUserId = amenitiesClone.ownerUserId || userId;
            if (!amenitiesClone.placeId) amenitiesClone.placeId = placeClone._id;
            const amenitiesGUID = Amenities.upsert({ _id: amenitiesClone._id }, amenitiesClone);
            if (amenitiesGUID.insertedId) amenitiesClone._id = amenitiesGUID.insertedId; //will exist if _id doesn't
            delete amenitiesClone.ownerUserId;
            delete amenitiesClone.placeId;

            consoleLogHelper(`Place ${placeClone._id ? 'updated' : 'added'} success`, genericSuccessCode, userId, JSON.stringify(placeClone));
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
    saveRoomies(room){
        if(room && typeof room === 'object' && room.roomies){
            delete room._id
            const roomieGUID = Roomies.insert(room);
            console.log(`Roomies inserted ${JSON.stringify(room)}, with key ${roomieGUID}`);

            return {
                serviceStatus: 'SUCCESS',
                serviceMessage: `Roomies inserted ${room}, with key ${roomieGUID}`,
                roomieId: roomieGUID
            }
        } else {

            return {
                serviceStatus: 'FAILURE',
                serviceMessage: `${JSON.stringify(room)} failed to be created`
            }
        }
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