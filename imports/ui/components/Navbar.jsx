import React from 'react';
import FontIcon from 'material-ui/FontIcon';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        $(".button-collapse").sideNav();
    }

    render() {
        return (
            <nav >
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo"><img src="http://stretchflex.net/photos/csLogo.jpg" alt="" style={{maxHeight:'64px'}}/></a>
                    <a href="#" data-activates="mobile-demo" className="button-collapse"><FontIcon className="material-icons">menu</FontIcon></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="home">How It Works</a></li>
                        <li><a href="planner">Planner</a></li>
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                    <ul className="side-nav" id="mobile-demo">
                        <li><a href="">How It Works</a></li>
                        <li><a href="">Planner</a></li>
                        <li><a href="">Profile</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
