import s3PublicUrl from 'node-s3-public-url';
import { Meteor } from 'meteor/meteor';
import AWS from 'aws-sdk';

AWS.config = new AWS.Config();

AWS.config.accessKeyId = Meteor.settings.AWSAccessKeyId;
AWS.config.secretAccessKey = Meteor.settings.AWSSecretAccessKey;

const s3 = new AWS.S3();

export default {
  deleteFile(file, callback) {
    const sanitizedUrl = file.url || '';
    const key = sanitizedUrl.replace(`https://${Meteor.settings.AWSProperty}.s3-${Meteor.settings.AWSRegion}.amazonaws.com/`, '')

      console.log(key, 'key');
    s3.deleteObject({
      Bucket: Meteor.settings.AWSProperty,
      Key: key,
    }, Meteor.bindEnvironment((error) => {
      if (error) console.warn(error);
      if (!error && callback) callback(file.url);
    }));
  },
};
