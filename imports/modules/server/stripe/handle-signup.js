/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Customers } from '../../../collections/mainCollection';
import { createCustomer, createSubscription } from './index';

let action;

//Need logic to uasdfasdf
const createCustomerInDatabase = Meteor.bindEnvironment((customer) => {
    const ownerCustomer = Customers.findOne({ userId: customer.userId }, { sort: { added: -1 } }) || {};
    if(ownerCustomer != null)
    {
      return Customers.upsert({ _id: ownerCustomer._id}, customer)
    }
    else
    {
      return Customers.insert(customer);
    }
});

const createCustomerOnStripe = ({ userId, profile, email }, source) => {
    return createCustomer({ email, source, metadata: profile.name })
    .then(({ id, sources }) => {
      const card = sources.data[0];
      return { card, id };
    })
};

const handleSignup = (options, promise) => {
    action = promise;

    console.log("Handle Signup");
    console.log(options);

    const userId = Meteor.userId();



    createCustomerOnStripe({ ...options.user, userId }, options.source)
    .then(Meteor.bindEnvironment((customer) => {
        createCustomerInDatabase({
          userId,
          customerId: customer.id,
          token: options.source,
          card: { brand: customer.card.brand, last4: customer.card.last4 }
        });
        action.resolve();
    }))
    .catch(error => action.reject(`[handleSignup] ${error}`));
};

export default customer =>
new Promise((resolve, reject) =>
handleSignup(customer, { resolve, reject }));
