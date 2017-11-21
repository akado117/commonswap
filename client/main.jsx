/* globals document */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { meteorClientConfig } from 'meteor/apollo';
import { Provider } from 'react-redux';

import App from '../imports/ui/Layout.jsx';
import RoomieCalc from '../imports/ui/components/RoommateCalc.jsx';
import Fuse from '../imports/ui/components/FuseTestContainer.jsx';
import Profile from '../imports/ui/pages/Profile';
import Login from '../imports/ui/pages/Login.js';
import ImagePOC from '../imports/ui/pages/ImagePOC';
import Planner from '../imports/ui/pages/Planner';
import Home from '../imports/ui/pages/Home';
import ViewProfile from '../imports/ui/pages/ViewProfile';
import store from '../imports/store/store';
import CreditCard from '../imports/ui/components/verificationComponent/CreditCard';
import Browse from '../imports/ui/pages/Browse';
import About from '../imports/ui/pages/About';
import FAQ from '../imports/ui/pages/FAQ';
import Testimonials from '../imports/ui/components/Testimonials';


import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const client = new ApolloClient(meteorClientConfig());


Meteor.startup(() => {
  render(
      <ApolloProvider client={client}>
     <Provider client={client} store={store} >
        <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} >
            <Route path="/" component={App} >
                <IndexRoute component={Home} />
                <Route path="profile" component={Profile} />
                <Route path="imagePOC" component={ImagePOC} />
                <Route path="room/:roomId" component={RoomieCalc} />
                <Route path="room" component={RoomieCalc} />
                <Route path="fuse" component={Fuse} />
                <Route path="planner" component={Planner} />
                <Route path="home" component={Home} />
                <Route path="viewprofile" component={ViewProfile} />
                <Route path="card" component={CreditCard} />
                <Route path="browse" component={Browse} />
                <Route path="about" component={About} />
                <Route path="faq" component={FAQ} />
                <Route path="testimonials" component={Testimonials} />
            </Route>
        </Router>
     </Provider></ApolloProvider>,
    document.getElementById('render-target'));
});
