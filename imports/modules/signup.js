/* eslint-disable no-undef, no-underscore-dangle */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';

const signup = (component) => {
    console.log("Handle signup");
    Bert.alert('Hitting up the nearest beach... and processing your card information', 'info', 'growl-top-left');
    window.stripe.createToken(component.card.card)
        .then(({error, token}) => {
            if (error) {
                Bert.alert(error);
            } else {
                const user = {
                    email: component.props.user.email,
                    profile: {
                        name: {
                            first: component.props.user.firstName,
                            last: component.props.user.lastName,
                        },
                    },
                    userId: component.props.user.userId,
                };

                //NOTE: This is calling signup in api/customers/server/methods.js
                Meteor.call('signup', {source: token.id, user }, (methodError, response) => {
                    if (methodError) {
                        Bert.alert(methodError.reason, 'danger');
                    } else {
                        const { last4, brand } = response;
                        Bert.alert(`Saved your ${brand} card with last 4 of ${last4}`, 'success', 'growl-top-left');
                        //Some logic here to re-route my profile section so the user can save
                        //profile information before continuing to save cards
                    }
                });
            }
        });
};

export default function handleSignup(options) {
    const { component } = options;
    signup(component);
}