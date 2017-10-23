/* globals document */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/Layout.jsx';
import RoomieCalc from '../imports/ui/components/RoommateCalc.jsx';
import Fuse from '../imports/ui/components/FuseTestContainer.jsx';
import Profile from '../imports/ui/pages/Profile.jsx';
import Login from '../imports/ui/pages/Login.jsx'
import ImagePOC from '../imports/ui/pages/ImagePOC';
import Planner from '../imports/ui/pages/Planner';
import Home from '../imports/ui/pages/Home';
import ViewProfile from '../imports/ui/pages/ViewProfile';
import store from '../imports/store/store'

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { meteorClientConfig } from 'meteor/apollo';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const client = new ApolloClient(meteorClientConfig());


Meteor.startup(() => {
  render(
    <ApolloProvider client={client} store={store} >
        <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} >
            <Route path="/" component={App} >
                <IndexRoute component={RoomieCalc} />
                <Route path="profile" component={Profile} />
                <Route path="login" component={Login} />
                <Route path="imagePOC" component={ImagePOC} />
                <Route path="room/:roomId" component={RoomieCalc} />
                <Route path="fuse" component={Fuse} />
                <Route path="planner" component={Planner} />
                <Route path="home" component={Home} />
                <Route path="viewprofile" component={ViewProfile} />
            </Route>
        </Router>
    </ApolloProvider>,
    document.getElementById('render-target'));
});
