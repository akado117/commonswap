import Roomies from '../imports/collections/Roomies';
import FileUrls from '../imports/collections/FileUrls';
import { Addresses, Profiles, Places, Amenities, Interests, EmergencyContacts } from '../imports/collections/mainCollection';
import { serviceErrorBuilder, consoleErrorHelper, serviceSuccessBuilder, consoleLogHelper,
    profileErrorCode, insufficentParamsCode, upsertFailedCode, genericSuccessCode } from '../imports/lib/Constants'
import urlHelpers from '../imports/helpers/urlHelpers';
import s3PublicUrl from 'node-s3-public-url';
import S3 from './s3';
import { check } from 'meteor/check';
import random from 'random-words'

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
    upsertProfile(profileParams = fakeProfile(), emergencyContacts = [fakeEC()], interests = fakeInter()){
        if(!Meteor.userId()) return serviceErrorBuilder('Please Sign in before submitting profile info', profileErrorCode);
        if(profileParams && emergencyContacts && interests
            && typeof profileParams === 'object' && typeof emergencyContacts === 'object' && typeof emergencyContacts === 'object'){

            profileParams.ownerUserId = Meteor.userId();

            try {
                const profileGUID = Profiles.upsert({ _id: profileParams._id }, profileParams);

                emergencyContacts.forEach(ec => {
                    ec.ownerUserId = Meteor.userId();
                    ec.profileId = profileGUID.insertedId;
                });
                const emergencyGUIDs = emergencyContacts.map(ec => EmergencyContacts.upsert({ _id: ec._id }, ec));


                interests.ownerUserId = Meteor.userId();
                interests.profileId = profileGUID.insertedId;
                const interestsGUID = Interests.upsert({ _id: interests._id }, interests);

                consoleLogHelper(`Profile ${profileParams._id? 'updated' : 'added'} success`, genericSuccessCode, Meteor.userId(), JSON.stringify(profileParams));
                return serviceSuccessBuilder({profileGUID, emergencyGUIDs, interestsGUID}, genericSuccessCode, {
                    serviceMessage: `Profile ${profileParams._id? 'updated' : 'added'}, with key ${profileGUID.insertedId}`,
                })
            } catch(err) {
                consoleErrorHelper('Profile create or update failed', upsertFailedCode, Meteor.userId(), err);
                return serviceErrorBuilder('Profile create or update failed', upsertFailedCode, {err})
            }
        } else {
            consoleErrorHelper('Profile create or update failed', insufficentParamsCode, Meteor.userId());
            return serviceErrorBuilder('Profile create or update failed', insufficentParamsCode)
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
        if (file && file.userId === this.userId) {
            return S3.deleteFile(file, () => {
                FileUrls.remove({ _id: fileId, userId: this.userId });
            });
        }

        throw new Meteor.Error('500', 'Must be logged in to do that!');
    },
});