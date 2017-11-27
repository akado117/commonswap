/* eslint-disable new-cap */

import Stripe from 'stripe';
import { Meteor } from 'meteor/meteor';

const stripe = Stripe(Meteor.settings.private.stripe);

/*
  customer = {
    description: String,
    source: String, // A Stripe token from the client.
  };
*/
export const createCustomer = customer =>
stripe.customers.create(customer);

/*
  customerId: String,
  update: Object, // Contains properties to update on Stripe. For example: { source: <token> }
*/
export const updateCustomer = (customerId, update) =>
stripe.customers.update(customerId, update);
