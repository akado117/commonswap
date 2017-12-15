import '../imports/startup';
import { Places, Trips } from '../imports/collections/mainCollection';
import FileUrls from '../imports/collections/FileUrls';
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from '../imports/api/schema';
import resolvers from '../imports/api/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({
  schema,
});

Places._ensureIndex({ location: '2dsphere', ownerUserId: -1 });
Trips._ensureIndex({ requesteeUserId: 1, requesterUserId: 1, 'dates.departure': -1, 'dates.arrival': -1 }, { unique: true });
FileUrls._ensureIndex({ userId: -1, type: -1, deleted: -1 });