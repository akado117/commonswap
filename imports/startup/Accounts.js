import { mapUserServiceToProfile } from '../helpers/userHelper';

Accounts.onCreateUser((options, user) => {
    //console.log(Meteor.http.get("https://graph.facebook.com/me", {
    //params: {access_token: user.services.facebook.accessToken}}));

    if (user.services) {
        user.oAuthData = mapUserServiceToProfile(user);
    }
    return user;
});