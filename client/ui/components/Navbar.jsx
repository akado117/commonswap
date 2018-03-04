import React from 'react';
import { Link, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../pages/Login';
import { defaultImageUrls } from '../../../imports/lib/Constants';
import ModalActions from '../actions/ModalActions';
import SignUpModal from './modals/SignUpModal'

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

    ifCurrentPathReturnStyle(pathName, router) {
        if (router.getCurrentLocation().pathname.indexOf(pathName) !== -1) return ACTIVE;
        return {};
    }

    transitionIfLoggedIn(path) {
        const goToPathFunc = () => this.props.router.push(path);
        if (this.props.user.userId) return goToPathFunc();
        const onLogIn = () => {
            this.props.modalActions.closeModal();
            goToPathFunc();
        }
        return this.props.modalActions.openModal(<SignUpModal onLogIn={onLogIn} title="Please Sign-Up or Sign-In To See This Page" />);
    }

    render() {
        const { className, router } = this.props;
        const invisToggle = this.isInvisRoute(this.props);
        return (
            <div className={`navbar-fixed ${className} ${invisToggle ? 'invis-toggle-true ' : ' '}${this.state.isTop ? 'invisible' : 'visible'}`} >
                <nav className="nav-wrapper">
                    <div>
                        <div onClick={this.travelHome} className="brand-logo"><img src={defaultImageUrls.assets.mainLogo} alt="" style={{ maxHeight: '64px', paddingLeft: '15px', paddingBottom: '5px' }} /></div>
                        <a href="#" data-activates="mobile-demo" className="button-collapse"><FontIcon className="material-icons">menu</FontIcon></a>
                        <Login className="nav-login border-nav" />
                        <ul className="right hide-on-med-and-down">
                            <li className="border-nav"><Link to="/home" activeStyle={ACTIVE}>How It Works</Link></li>
                            <li className="border-nav"><Link to="/faq" activeStyle={ACTIVE}>FAQ</Link></li>
                            <li className="border-nav"><Link style={this.ifCurrentPathReturnStyle('/planner', router)} to="" onClick={() => this.transitionIfLoggedIn('/planner')}>Planner</Link></li>
                            <li className="border-nav explore-container" ><div style={this.ifCurrentPathReturnStyle('/explore', router)} ><span className="explore"><Link to="/explore" >Explore</Link></span></div></li>
                            <li className="border-nav"><Link to="/profile" activeStyle={ACTIVE}>Profile</Link></li>
                        </ul>
                        <ul className="side-nav" id="mobile-demo">
                            <li><Link to="/home" activeStyle={ACTIVE}>How It Works</Link></li>
                            <li><Link to="/faq" activeStyle={ACTIVE}>FAQ</Link></li>
                            <li><Link to="/explore" activeStyle={ACTIVE}>Browse</Link></li>
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
    user: PropTypes.object.isRequired,
    modalActions: PropTypes.object.isRequired,
    invisToggle: PropTypes.bool,
};

Navbar.defaultProps = {
    className: '',
    invisToggle: false,
};
function mapStateToProps(state) {
    const { user } = state;
    return {
        user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modalActions: bindActionCreators(ModalActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
