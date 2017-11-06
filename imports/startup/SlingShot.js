import FileUrls from '../collections/FileUrls';
import { FileTypes } from '../lib/Constants';

const keys = {
    users: 'customers',
    profileImages: 'profile',
    placeImages: 'places',
    placeThumbImages: 'place_thumbs',
}

Slingshot.fileRestrictions("uploadPlaceToAmazonS3", {
    allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
    maxSize: 2 * 1024 * 1024
});

Slingshot.createDirective( "uploadPlaceToAmazonS3", Slingshot.S3Storage, {
    bucket: Meteor.settings.AWSProperty,
    acl: "public-read",
    region: Meteor.settings.AWSRegion,
    authorize: function (file, metaContext) {
        if (!this.userId) return false;
        const findObj = { userId: this.userId, type: FileTypes.PLACE, deleted: false };
        findObj.placeId = metaContext.placeId;
        const userFileCount = FileUrls.find(findObj).count();
        console.log('UserFileCount', userFileCount);
        return userFileCount < 20 ? true : false;
    },
    key: function (file) {
        const user = Meteor.users.findOne( this.userId );
        if(user) return `${keys.users}/${hashFunc(user._id)}/${keys.placeImages}/${file.name}`;
        return `${keys.users}/guest/${keys.placeImages}/${file.name}`;
    },
})

Slingshot.fileRestrictions("uploadPlaceThumbnailToAmazonS3", {
    allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
    maxSize: 0.5 * 1024 * 1024,
});

Slingshot.createDirective( "uploadPlaceThumbnailToAmazonS3", Slingshot.S3Storage, {
    bucket: "com-swap-images-dev",
    acl: "public-read",
    region: 'us-east-2',
    authorize: function() {
        let userFileCount = FileUrls.find( { "userId": this.userId } ).count();
        console.log('UserFileCount', userFileCount);
        return userFileCount < 40 ? true : false;
    },
    key: function(file) {
        const user = Meteor.users.findOne( this.userId );
        if(user) return `${keys.users}/${hashFunc(user._id)}/${keys.placeThumbImages}/${file.name}`;
        return `${keys.users}/guest/${keys.placeImages}/${file.name}`;
    }
})

Slingshot.fileRestrictions("uploadProfileToAmazonS3", {
    allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
    maxSize: 0.75 * 1024 * 1024,
});

Slingshot.createDirective( "uploadProfileToAmazonS3", Slingshot.S3Storage, {
    bucket: "com-swap-images-dev",
    acl: "public-read",
    region: 'us-east-2',
    authorize: function() {
        let userFileCount = FileUrls.find( { "userId": this.userId } ).count();
        console.log('UserFileCount', userFileCount);
        return userFileCount < 20 ? true : false;
    },
    key: function(file) {
        const user = Meteor.users.findOne( this.userId );
        if(user) return `${keys.users}/${hashFunc(user._id)}/${keys.profileImages}/${file.name}`;
        return `${keys.users}/guest/${keys.profileImages}/${file.name}`;
    }
})

function hashFunc(string) {//We can't lose this
    let hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        chr   = string.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};