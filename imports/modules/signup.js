/* eslint-disable no-undef, no-underscore-dangle */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';

let component;

const signup = () => {
    window.stripe.createToken(component.card.card)
        .then(({ error, token }) => {
            if (error) {
                Bert.alert(error);
            } else {
                //ALEX: I need you here
                //I would like to pass a user object into Meteor call signUp
                //which is structured as follows
                //email: '',
                //profile: {
                //  name: {
                //    first: '',
                //    last: '',
                //  }
                //},
                //userId:''
                //This is minimal requirement by stripe to create a customer object
                //Just expose this stuff in the CardForm.js and make sure it binds to options
                
                //NOTE: This is calling signup in api/customers/server/methods.js
                Meteor.call('signup', { source: token.id, user }, (methodError) => {
                    if (methodError) {
                        Bert.alert(methodError.reason, 'danger');
                    } else {
                        //Some logic here to re-route to my profile section so the user can save
                        //profile information before continuing to save cards
                    }
                });
            }
        });
};

export default function handleSignup(options) {
    component = options.component;
    signup();
}
