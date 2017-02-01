/* globals document */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { meteorClientConfig } from 'meteor/apollo';

const client = new ApolloClient(meteorClientConfig());

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('render-target'));
});
