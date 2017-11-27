/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Customers from '../../../api/customers/customers';
import { createCustomer, createSubscription } from './index';

let action;

//NOTE: This is meteor chef stuff ignore this for now.
//However will need to create a customer in the database in this method at some point
// const createCustomerInDatabase = Meteor.bindEnvironment((customer) => {
//   try {
//     return Customers.insert(customer);
//   } catch (exception) {
//     action.reject(`[handleSignup.createCustomerInDatabase] ${exception}`);
//   }
// });

const createCustomerOnStripe = ({ userId, firstName, lastName, email }, source) => {
  try {
    //NOTE:Card token is the source
    return createCustomer({ email, source, metadata: profile.name })
    .then(({ id, sources }) => {
      const card = sources.data[0];
      return { card, id };
    })
    .catch(error => action.reject(error));
  } catch (exception) {
    action.reject(`[handleSignup.createCustomerOnStripe] ${exception}`);
  }
};

const handleSignup = (options, promise) => {
  try {
    action = promise;
    const userId = Meteor.userId();
    createCustomerOnStripe({ ...options.user, userId }, options.source)
    .then(Meteor.bindEnvironment((customer) => {
        createCustomerInDatabase({
          userId,
          customerId: customer.id,
          card: { brand: customer.card.brand, last4: customer.card.last4 }
        });
        action.resolve();
    }))
    .catch(error => action.reject(`[handleSignup] ${error}`));
  } catch (exception) {
    action.reject(`[handleSignup] ${exception}`);
  }
};

export default customer =>
new Promise((resolve, reject) =>
handleSignup(customer, { resolve, reject }));
