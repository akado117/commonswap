import React from 'react'
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import ProfileComponent from './profileComps/ProfileComponent';
import PlaceComponent from './placeComponents/PlaceComponent';

const profile = <FontIcon className="material-icons">person</FontIcon>;
const trust = <FontIcon className="material-icons">favorite</FontIcon>;
const place = <FontIcon className="material-icons">weekend</FontIcon>;

const scrolling = {
    position: 'fixed',
    top: '0',
};

class Verfirication extends React.Component {
    valueMap = new Map();
    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
        };
    }

    select = (index) => this.setState({ selectedIndex: index });


    addValueOnChange = (key, value) => {
        this.valueMap.set(key, value);
        console.log(this.valueMap)
    }

    getFormData = () => {

    }

    render() {
        let internalComponent;
        if(this.state.selectedIndex === 0){
            internalComponent = <ProfileComponent getValueFunc={this.addValueOnChange}/>
        } else if (this.state.selectedIndex === 1) {
            internalComponent = <PlaceComponent getValueFunc={this.addValueOnChange}/>
        }

        return (
            <section className="profile-container" >
                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex} style={{ position: 'fixed',zIndex: '999' }}>
                        <BottomNavigationItem
                            label="My Profile"
                            icon={profile}
                            onClick={() => this.select(0)}
                        />
                        <BottomNavigationItem
                            label="My Place"
                            icon={place}
                            onClick={() => this.select(1)}
                        />
                        <BottomNavigationItem
                            label="Trust &amp; Verification"
                            icon={trust}
                            onClick={() => this.select(2)}
                        />
                    </BottomNavigation>
                </Paper>
                <div className="container" style={{ paddingTop: '45px' }}>
                    <div className="row">
                        <div className="col s3" id="header-inner" style={{ position: 'fixed', display: 'block' }}>
                            <h4>Profile Page</h4>
                            <div className="col s6 offset-s2">
                                <i className="fa fa-user-circle fa-4x" aria-hidden="true"></i>
                            </div>
                            <div className="col s12">
                                <p><i className="fa fa-plus-square-o fa-2x" aria-hidden="true"></i> Add Photo</p>
                                <input type="file" value={this.state.picture}/>
                            </div>
                        </div>
                        <div className="col s9 offset-s3 sub-container">
                            {internalComponent}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    testState = () => {
        roomiesActions.saveRoom(this.state,this.props.dispatch)
    }
}
export default Verfirication