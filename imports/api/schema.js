export default [
  `
  type Url {
    url: String!
  }

  type RootMutation {
    insertUrl(url: String!): Url
  }

  type RootQuery {
    say: String
    urls: [Url]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }`,
];
