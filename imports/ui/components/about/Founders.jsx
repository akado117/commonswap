import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';

class Founders extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="founder-container">
                <AppBar
                    title={<span>Our Co-Founders</span>}
                    showMenuIconButton={false}
                    style={{ marginBottom: '10px', zIndex: '0' }}
                />
                <div className="row">
                    <div className="cofounder">
                        <div className="col s3">
                            <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                        </div>
                        <div className="col s9">
                            <div className="col s12">
                                <h5>Kevin Moreno</h5>
                            </div>
                            <div className="col s12">
                                <p>CPO &amp; Co-Founder</p>
                            </div>
                            <div className="col s12">
                                <p>Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            </div>
                        </div>
                    </div>
                    <div className="cofounder">
                        <div className="col s3">
                            <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                        </div>
                        <div className="col s9">
                            <div className="col s12">
                                <h5>Tim Hawkins Hodgson</h5>
                            </div>
                            <div className="col s12">
                                <p>TBM &amp; Co-Founder</p>
                            </div>
                            <div className="col s12">
                                <p>Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            </div>
                        </div>
                    </div>
                    <div className="cofounder">
                        <div className="col s3">
                            <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                        </div>
                        <div className="col s9">
                            <div className="col s12">
                                <h5>Alec Miller</h5>
                            </div>
                            <div className="col s12">
                                <p>CMO &amp; Co-Founder</p>
                            </div>
                            <div className="col s12">
                                <p>Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            </div>
                        </div>
                    </div>
                    <div className="cofounder">
                        <div className="col s3">
                            <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                        </div>
                        <div className="col s9">
                            <div className="col s12">
                                <h5>Alex Kaidan</h5>
                            </div>
                            <div className="col s12">
                                <p>TBM &amp; Co-Founder</p>
                            </div>
                            <div className="col s12">
                                <p>Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Founders;
