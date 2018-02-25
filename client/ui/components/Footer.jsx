import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { Link, withRouter } from 'react-router';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className={`page-footer ${this.props.className}`} style={{ float: 'bottom', backgroundColor: 'rgb(0, 188, 212)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col l4 s12">
                            <h5 className="white-text">CommonSwap, Inc.</h5>
                            <div className="grey-text text-lighten-4">
                                {/* <div className="col s2">
                                    <i className="fa fa-twitter fa-2x" aria-hidden="true"></i>
                                </div> */}
                                <div className="col s2">
                                    <a href="https://www.instagram.com/CommonSwap/" className="grey-text text-lighten-3"><i className="fa fa-instagram fa-2x" aria-hidden="true"></i></a>
                                </div>
                                <div className="col s2">
                                    <a href="https://www.facebook.com/CommonSwap" className="grey-text text-lighten-3"><i className="fa fa-facebook fa-2x" aria-hidden="true"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col l2 s12">
                            <h5 className="white-text">About</h5>
                            <ul>
                                <li><Link to="/about" className="grey-text text-lighten-3">Our purpose</Link></li>
                                <li><Link to="/about/2" className="grey-text text-lighten-3">Testimonials</Link></li>
                            </ul>
                        </div>
                        <div className="col l3 s12">
                            <h5 className="white-text">Support</h5>
                            <ul>
                                <li><Link to="/contact" className="grey-text text-lighten-3">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div className="col l3 s12">
                            <h5 className="white-text">Safety</h5>
                            <ul>
                                <li><Link to="/faq/2" className="grey-text text-lighten-3">Trust &amp; Safety</Link></li>
                                <li><Link to="/faq" className="grey-text text-lighten-3">FAQ</Link></li>
                                <li><Link to="/community" className="grey-text text-lighten-3">Community Values</Link></li>
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
