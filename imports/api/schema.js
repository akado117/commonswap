export default [
  `
  type SoundcloudUser {
    username: String!
  }

  type RootQuery {
    say: String
    soundcloudUsers: [SoundcloudUser]
  }

  schema {
    query: RootQuery
  }`,
];
