import React from 'react';
import { Link, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import Login from '../pages/Login'

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { scrollClass: 'transparent ' }
    }

    handleScroll(e) {
        this.setState({ scrollClass: 'no-transparent' })
    }

    componentDidMount = () => {
        $(".button-collapse").sideNav();
    }

    travelHome = (e) => {
        e.stopPropagation();
        this.props.router.push('/');
    }

    render() {
        let { scrollClass } = this.state
        return (
            <div className={`navbar-fixed ${this.props.className}`} >
                <nav className="nav-wrapper">
                    <div>
                        <div onClick={this.travelHome} className="brand-logo"><img src="http://stretchflex.net/photos/CommonSwapNew2.png" alt="" style={{ maxHeight: '64px', paddingLeft:'15px',paddingBottom:'5px'}} /></div>
                        <a href="#" data-activates="mobile-demo" className="button-collapse"><FontIcon className="material-icons">menu</FontIcon></a>
                        <ul className="right hide-on-med-and-down">
                            <li style={{ color: 'black' }}><Link to="/home">How It Works</Link></li>
                            <li style={{ color: 'black' }}><Link to="/planner">Planner</Link></li>
                            <li style={{ color: 'black' }}><Link to="/profile">Profile</Link></li>
                            <li style={{ color: 'black' }}><Link to="/login">Login</Link></li>
                        </ul>
                        <ul className="side-nav" id="mobile-demo">
                            <li><Link to="/home">How It Works</Link></li>
                            <li><Link to="/planner">Planner</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                        <Login className="nav-login" />
                    </div>
                    {this.props.children}
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    router: PropTypes.object.isRequired,
    className: PropTypes.string,
};

Navbar.defaultProps = {
    className: '',
};

export default withRouter(Navbar);
