import FileUrls from '../imports/collections/FileUrls';
import { Places } from '../imports/collections/mainCollection';

const filePubfields = {
    _id: 1,
    userId: 1,
    url: 1,
    fileName: 1,
    added: 1,
    deleted: 1,
    placeId: 1,
    type: 1,
};

const getImagesPub = function (pageSkip = 0, filter) {
    const query = {};

    switch (filter) {
    case 'SHOW_COMPLETED':
        query.completed = true;
        break;
    case 'SHOW_ACTIVE':
        query.completed = false;
        break;
    default:
        break;
    }
    Counts.publish(this, 'ImageCount', FileUrls.find(query));
    return FileUrls.find(query, {
        fields: filePubfields,
        skip: pageSkip,//skip how many items before listing
        limit: 20
    });
};

const getPlacesPub = function () {
    return Places.find();
}

const userPubFields = {
    // "services.facebook.first_name": 1,
    // "services.facebook.last_name": 1,
    // "services.facebook.email": 1,
    // "services.facebook.gender": 1,
    // "services.google.email": 1,
    // "services.google.given_name": 1,
    // "services.google.family_name": 1,
    // "services.google.picture": 1,
    oAuthData: 1,
};
const user = () => Meteor.users.find({ _id: Meteor.userId }, { fields: userPubFields });

Meteor.publish('getImages', getImagesPub);
Meteor.publish("userData", user);
Meteor.publish("places", getPlacesPub);