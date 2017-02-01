export default [
  `
  type SoundcloudUser {
    username: String!
  }

  type RootMutation {
    submitSoundcloudUser(username: String!): SoundcloudUser
  }

  type RootQuery {
    say: String
    soundcloudUsers: [SoundcloudUser]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }`,
];
