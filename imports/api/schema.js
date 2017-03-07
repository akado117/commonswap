export default [
  `
  type Url {
    url: String!
  }

  type Test {
    foo: String,
    bar: String
  }

  type RootMutation {
    insertUrl(url: String!): Url
  }

  type RootQuery {
    say: Test
    says: [Test]
    urls: [Url]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }`,
];
