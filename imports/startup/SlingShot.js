import FileUrls from '../collections/FileUrls';

const keys = {
    users: 'customers',
    profileImages: 'profile',
    placeImages: 'places'
}

Slingshot.fileRestrictions("uploadToAmazonS3", {
    allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
    maxSize: 3 * 1024 * 1024
});

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
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
        if(user) return `${keys.users}/${keys.placeImages}/${user._id}/${file.name}`;
        return `${keys.users}/${keys.placeImages}/guest/${file.name}`;
    }
})

Slingshot.fileRestrictions("uploadPlaceToAmazonS3", {
    allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
    maxSize: 3 * 1024 * 1024
});

Slingshot.createDirective( "uploadPlaceToAmazonS3", Slingshot.S3Storage, {
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
        if(user) return `${keys.users}/${keys.placeImages}/${user._id}/${file.name}`;
        return `${keys.users}/${keys.placeImages}/guest/${file.name}`;
    }
})

Slingshot.fileRestrictions("uploadProfileToAmazonS3", {
    allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
    maxSize: 2 * 1024 * 1024
});

Slingshot.createDirective( "uploadProfileToAmazonS3", Slingshot.S3Storage, {
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
        if(user) return `${keys.users}/${keys.placeImages}/${user._id}/${file.name}`;
        return `${keys.users}/${keys.placeImages}/guest/${file.name}`;
    }
})