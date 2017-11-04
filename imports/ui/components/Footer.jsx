import React from 'react';
import FontIcon from 'material-ui/FontIcon';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="page-footer">
                <div className="container">
                    <div className="row">
                        <div className="col l4 s12">
                            <h5 className="white-text">CommonSwap, LLC</h5>
                            <p className="grey-text text-lighten-4">
                                <div className="col s2">
                                    <i className="fa fa-twitter fa-2x" aria-hidden="true"></i>
                                </div>
                                <div className="col s2">
                                    <i className="fa fa-instagram fa-2x" aria-hidden="true"></i>
                                </div>
                                <div className="col s2">
                                    <i className="fa fa-facebook fa-2x" aria-hidden="true"></i>
                                </div>
                                <div className="col s2">
                                    <i className="fa fa-pinterest-p fa-2x" aria-hidden="true"></i>
                                </div>
                            </p>
                        </div>
                        <div className="col l2 s12">
                            <h5 className="white-text">About</h5>
                            <ul>
                                <li><a className="grey-text text-lighten-3" href="#!">About us</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">Team</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">Press</a></li>
                            </ul>
                        </div>
                        <div className="col l3 s12">
                            <h5 className="white-text">Support</h5>
                            <ul>
                                <li><a className="grey-text text-lighten-3" href="#!">Contact Us</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">Provide Feedback</a></li>

                            </ul>
                        </div>
                        <div className="col l3 s12">
                            <h5 className="white-text">Safety</h5>
                            <ul>
                                <li><a className="grey-text text-lighten-3" href="#!">Trust &amp; Safety</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">FAQ</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">Community Values</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2017 CommonSwap
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;