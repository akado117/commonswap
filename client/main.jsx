/* globals document */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { meteorClientConfig } from 'meteor/apollo';
import { Provider } from 'react-redux';

import App from './ui/Layout.jsx';
import CardForm from './ui/components/verificationComponent/CardForm';
import Fuse from './ui/components/FuseTestContainer.jsx';
import Profile from './ui/pages/Profile';
import Login from './ui/pages/Login.js';
import ImagePOC from './ui/pages/ImagePOC';
import Planner from './ui/pages/Planner';
import Home from './ui/pages/Home';
import ViewProfile from './ui/pages/ViewProfile';
import store from '../imports/store/store';
import CreditCard from './ui/components/verificationComponent/CreditCard';
import Browse from './ui/pages/Browse';
import About from './ui/pages/About';
import FAQ from './ui/pages/FAQ';
import Testimonials from './ui/components/Testimonials';
import Trust from './ui/pages/Trust';
import Community from './ui/pages/Community';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const client = new ApolloClient(meteorClientConfig());


Meteor.startup(() => {
    render(
        <ApolloProvider client={client}>
            <Provider client={client} store={store}>
                <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Home} />
                        <Route path="profile" component={Profile} />
                        <Route path="imagePOC" component={ImagePOC} />
                        <Route path="fuse" component={Fuse} />
                        <Route path="planner" component={Planner} />
                        <Route path="home" component={Home} />
                        <Route path="viewprofile(/:placeId)" component={ViewProfile} />
                        <Route path="card" component={CreditCard} />
                        <Route path="browse" component={Browse} />
                        <Route path="about(/:index)" component={About} />
                        <Route path="faq(/:index)" component={FAQ} />
                        <Route path="testimonials" component={Testimonials} />
                        <Route path="trust" component={Trust} />
                        <Route path="community" component={Community} />
                        <Route path="card" component={CardForm} />
                    </Route>
                </Router>
            </Provider>
        </ApolloProvider>,
        document.getElementById('render-target'),
    );
});
