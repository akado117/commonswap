import FileUrls from '../collections/FileUrls';

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
        return userFileCount < 20 ? true : false
    },
    key: function(file) {
        const user = Meteor.users.findOne( this.userId );
        return `${user._id}/${file.name}`
    }
})