/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Customers from '../../../collections/mainCollection';
import { createCustomer, createSubscription } from './index';

let action;

//Need logic to update customer in db if one already exists
const createCustomerInDatabase = Meteor.bindEnvironment((customer) => {
  try {
    // let customerClone = _.cloneDeep(customer);
    // let customerId = customerClone.userId;
    // if(!customerId)
    // {
    //   const userId = Meteor.userId();
    //   const ownerCustomer = Customers.findOne({ userId: customerClone.userId || userId }, { sort: { added: -1 } }) || {};
    //   ownerCustomerId = √._id;
    //   customerClone = _.merge(ownerCustomer, customerClone);
    // }
    return Customers.upsert(customer);
  } catch (exception) {
    action.reject(`[handleSignup.createCustomerInDatabase] ${exception}`);
  }
});

const createCustomerOnStripe = ({ userId, profile, email }, source) => {
  try {
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
