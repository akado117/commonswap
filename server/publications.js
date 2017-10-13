import FileUrls from '../imports/collections/FileUrls'

const filePubfields = {
    _id: 1,
    userId: 1,
    url: 1,
    fileName: 1,
    added: 1,
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

Meteor.publish('getImages', getImagesPub);