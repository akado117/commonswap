ServiceConfiguration.configurations.upsert(
    {service: 'facebook'},
    {
        $set: {
            loginStyle: "popup",
            appId: Meteor.settings.facebook.appid,
            secret: Meteor.settings.facebook.secret,
        }
    }
);
ServiceConfiguration.configurations.upsert(
    {service: 'google'},
    {
        $set: {
            loginStyle: "popup",
            clientId: Meteor.settings.google.clientId,
            secret: Meteor.settings.google.secret,
        }
    }
);
ServiceConfiguration.configurations.upsert(
    {service: 'twitter'},
    {
        $set: {
            loginStyle: "popup",
            consumerKey: Meteor.settings.twitter.consumerKey,
            secret: Meteor.settings.twitter.secret,
        }
    }
);
