import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Or a stateless functional component:
const Urls = ({data}) => (
    <div>{data.urls && data.urls.map((url) => url.url)}</div>
  );

// Initialize GraphQL queries or mutations with the `gql` tag
const query = gql`
  query {
    urls {
      url
    }
  }`;
//const MyMutation = gql`mutation MyMutation { addTodo(text: "Test 123") { id } }`;

// We then can use `graphql` to pass the query results returned by MyQuery
// to MyComponent as a prop (and update them as the results change)
export default graphql(query)(Urls);

// Or, we can bind the execution of MyMutation to a prop
// export default graphql(MyMutation)(MyComponent);
