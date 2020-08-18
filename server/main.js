import '../imports/startup';
import { Places, Trips, Profiles, FileUrls, Interests, Customers, Amenities, Addresses } from '../imports/collections/mainCollection';
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from '../imports/api/schema';
import resolvers from '../imports/api/resolvers';
import "./methods"

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({
  schema,
});

Profiles._ensureIndex({ ownerUserId: -1 }, { unique: true });//should only have one profile per account
Places._ensureIndex({ location: '2dsphere', ownerUserId: -1 });
Trips._ensureIndex({ requesteeUserId: 1, requesterUserId: 1, 'dates.departure': -1, 'dates.arrival': -1 }, { unique: true });
FileUrls._ensureIndex({ userId: -1, type: -1, deleted: -1 });
Interests._ensureIndex({ profileId: -1, ownerUserId: -1 });
Addresses._ensureIndex({ profileId: -1, ownerUserId: -1 });
Customers._ensureIndex({ userId: -1 });
Amenities._ensureIndex({ ownerUserId: -1 });
