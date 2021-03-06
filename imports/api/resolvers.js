import Urls from '../collections/urls';
import Roomies from '../collections/Roomies';
import { FileUrls, Addresses, Profiles, Places, Amenities, Interests, EmergencyContacts} from '../collections/mainCollection';
import { serviceErrorBuilder, consoleLogHelper, FileTypes } from '../lib/Constants';

const publicImageFields = {
    _id: 1,
    url: 1,
};
export default {
    RootQuery: {
        say(/* root, args, context */) {
            return { foo: 'sdadas', bar: 'asdasdasd' };
        },
        says() {
            return [{ foo: 'sdadas', bar: 'asdasdasd' }, { foo: 'sdadas', bar: 'asdasdasd' }];
        },
        urls(/* root, args, context */) {
            return Urls.find().fetch();
        },
        getSavedRooms(/* root, args, context */) {
            return Roomies.find().fetch();
        },
        getSavedRoom(root, {Id}){
            console.log(Roomies.findOne({ _id:Id }));
            return Roomies.findOne({ _id:Id });
        },
        getProfileByUserId(root, { userId, profileId}, context) {

            const profile = profileId ? Profiles.findOne({ _id: profileId }) : Profiles.findOne({ ownerUserId: userId });
            console.log(context);
            consoleLogHelper(`profile searched for by userId: ${userId}`, 1, context.userId || 'guest', JSON.stringify(profile));
            return profile;
        },
        getPlacesForBrowse(root, { userId, arrival, departure}, context) {
            const placesForBrowse = {};
            const places = Places.find({ availableDates: { $elemMatch: { arrival: { $gte: arrival }, departure: { $lte: departure } } } }).fetch();
            const profile = []
            return Places.find({}).fetch();
        },
    },
    RootMutation: {
        insertUrl(root, { url }) {
            const newUrl = { url };
            Urls.insert(newUrl);
            return newUrl;
        },
    },
    EmergencyContact: {
        profile: (emergContact) => Profiles.findOne({ _id: emergContact.profileId }),
    },
    Interests: {
        profile: (interest) => Profiles.findOne({ _id: interest.placeId }),
    },
    Profile: {
        places: (profile) => Places.find({ profileId: profile._id }).fetch(),
        interests: (profile) => Interests.findOne({ profileId:  profile._id }),
        emergencyContacts: profile => EmergencyContacts.find({ profileId: profile._id }).fetch(),
    },
    Address: {
        profile: (address) => Profiles.findOne({ _id: address.profileId }),
        place: (address) => Places.findOne({ _id: address.placeId }),
    },
    Amenity: {
        profile: (amenity) => Profiles.findOne({ _id: amenity.profileId }),
        place: (amenity) => Places.findOne({ _id: amenity.placeId }),
    },
    Place: {
        address: (place) => Addresses.findOne({ placeId: place._id }),
        profile: (place) => Profiles.findOne({ _id: place.profileId }),
        amenities: (place) => Amenities.findOne({ placeId: place._id}),
        placeImages: place => FileUrls.find({ placeId: place._id, type: FileTypes.PLACE, deleted: false }, { fields: publicImageFields }).fetch(),
    },
}
