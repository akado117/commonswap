import { Mongo } from 'meteor/mongo';

export const EmergencyContacts = new Mongo.Collection('emergencyContacts');
export const Interests = new Mongo.Collection('interests');
export const Profiles = new Mongo.Collection('profiles');
export const Addresses = new Mongo.Collection('addresses');
export const Amenities = new Mongo.Collection('amenities');
export const Places = new Mongo.Collection('places');
export const DesiredDate = new Mongo.Collection('desiredDate');
export const Customers = new Mongo.Collection('customers');
export const Trips = new Mongo.Collection('trips');
export const FileUrls = new Mongo.Collection('fileUrls');
