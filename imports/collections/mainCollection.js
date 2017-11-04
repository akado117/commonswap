import { Mongo } from 'meteor/mongo';

export const EmergencyContacts = new Mongo.Collection('emergencyContacts');
export const Interests = new Mongo.Collection('interests');
export const Profiles = new Mongo.Collection('profiles');
export const Addresses = new Mongo.Collection('addresses');
export const Amenities = new Mongo.Collection('amenities');
export const Places = new Mongo.Collection('places');