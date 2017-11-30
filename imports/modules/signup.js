/* eslint-disable no-undef, no-underscore-dangle */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';

let component;

const signup = () => {
  console.log("Handle signup");
  console.log(component.card);
  console.log(component.props);
  window.stripe.createToken(component.card.card)
  .then(({ error, token }) => {
    if (error) {
      Bert.alert(error);
    } else {

    const user = {
      email: component.props.user.email,
      profile: {
        name: {
          first: component.props.user.firstName,
          last: component.props.user.lastName,
        }
      },
      userId: ''
    };

    console.log(token);
    console.log('user');
    console.log(user);
      //NOTE: This is calling signup in api/customers/server/methods.js
      Meteor.call('signup', { source: token.id, user }, (methodError) => {
        if (methodError) {
          Bert.alert(methodError.reason, 'danger');
        } else {
            //Some logic here to re-route my profile section so the user can save
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
  