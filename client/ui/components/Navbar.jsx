import React from 'react';
import { Link, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import Login from '../pages/Login';
import { defaultImageUrls } from '../../../imports/lib/Constants';

const ACTIVE = { borderBottom: 'rgb(0, 188, 212) solid 5px' };

class Navbar extends React.Component {
    invisHeaderRoutes = /^(\/|\/home|\/community)$/;
    constructor(props) {
        super(props);
        this.state = {
            isTop: this.isInvisRoute(props),
        };
    }

    componentDidMount = () => {
        $('.button-collapse').sideNav();
        if (this.isInvisRoute(this.props)) document.addEventListener('scroll', this.scrollFunc);
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.location.pathname === this.props.location.pathname) return;
        if (this.isInvisRoute(prevProps) && !this.isInvisRoute(this.props)) {
            document.removeEventListener('scroll', this.scrollFunc);
        } else {
            document.addEventListener('scroll', this.scrollFunc);
        }
        this.setState({ isTop: this.isInvisRoute(this.props) });
        $('.button-collapse').sideNav('hide');
    }

    isInvisRoute = props => !!props.location.pathname.match(this.invisHeaderRoutes);

    scrollFunc = () => {
        if ((window.scrollY < 100) !== this.state.isTop) {
            if (!this.isInvisRoute(this.props)) return;
            this.setState({ isTop: window.scrollY < 100 });
        }
    }

    travelHome = (e) => {
        e.stopPropagation();
        this.props.router.push('/');
    }

    render() {
        const { className } = this.props;
        const invisToggle = this.isInvisRoute(this.props);
        return (
            <div className={`navbar-fixed ${className} ${invisToggle ? 'invis-toggle-true ' : ' '}${this.state.isTop ? 'invisible' : 'visible'}`} >
                <nav className="nav-wrapper">
                    <div>
                        <div onClick={this.travelHome} className="brand-logo"><img src={defaultImageUrls.assets.mainLogo} alt="" style={{ maxHeight: '64px', paddingLeft:'15px',paddingBottom:'5px'}} /></div>
                        <a href="#" data-activates="mobile-demo" className="button-collapse"><FontIcon className="material-icons">menu</FontIcon></a>
                        <Login className="nav-login" />
                        <ul className="right hide-on-med-and-down">
                            <li style={{ color: 'black' }}><Link to="/home" activeStyle={ACTIVE}>How It Works</Link></li>
                            <li style={{ color: 'black' }}><Link to="/faq" activeStyle={ACTIVE}>FAQ</Link></li>
                            <li style={{ color: 'black' }}><Link to="/planner" activeStyle={ACTIVE}>Planner</Link></li>
                            <li style={{ color: 'black' }}><Link to="/profile" activeStyle={ACTIVE}>Profile</Link></li>
                            <li style={{ color: 'black' }}><Link to="/browse" activeStyle={ACTIVE}>Browse</Link></li>
                        </ul>
                        <ul className="side-nav" id="mobile-demo">
                            <li><Link to="/home" activeStyle={ACTIVE}>How It Works</Link></li>
                            <li><Link to="/faq" activeStyle={ACTIVE}>FAQ</Link></li>
                            <li><Link to="/browse" activeStyle={ACTIVE}>Browse</Link></li>
                            <li><Link to="/planner" activeStyle={ACTIVE}>Planner</Link></li>
                            <li><Link to="/profile" activeStyle={ACTIVE}>Profile</Link></li>
                        </ul>
                    </div>
                    {this.props.children}
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    className: PropTypes.string,
    invisToggle: PropTypes.bool,
}; 

Navbar.defaultProps = {
    className: '',
    invisToggle: false,
};

export default withRouter(Navbar);
