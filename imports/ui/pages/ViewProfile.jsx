import React from 'react'
const _ = require('lodash')//required so it can be used easily in chrome dev tools.
import DatePicker from 'material-ui/DatePicker';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import ProfileComponent from '../components/profileComps/ProfileComponent.jsx'
import InterestsComponent from '../components/forms/ButtonArrayComp.jsx'
import PlaceComponent from '../components/placeComponents/PlaceComponent.jsx'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const profile = <FontIcon className="material-icons">person</FontIcon>;

class ViewProfile extends React.Component {
    constructor() {
        super();
        this.state = { };
    }

    componentDidMount = () => { }

    render() {
        let internalComponent;
        if(this.state.selectedIndex === 0){
            internalComponent = <ProfileComponent getValueFunc={this.addValueOnChange}/>
        } else if (this.state.selectedIndex === 1) {
            internalComponent = <PlaceComponent getValueFunc={this.addValueOnChange}/>
        }

        return (
            <section className="profile-view-container" >
                <Navbar></Navbar>
                <Footer></Footer>
            </section>
        );
    }
    testState = () => {
        roomiesActions.saveRoom(this.state,this.props.dispatch)
    }
}
export default ViewProfile