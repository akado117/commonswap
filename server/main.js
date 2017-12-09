import '../imports/startup';
import { Places, Trips } from '../imports/collections/mainCollection';
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

Places._ensureIndex({ location: '2dsphere'  });
Trips._ensureIndex({ requesteeUserId: 1, requesterUserId: 1, dates: 1 }, { unique: true });