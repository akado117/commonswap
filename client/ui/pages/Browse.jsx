import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
const { cloneDeep, merge } = require('lodash');
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import addDays from 'date-fns/add_days';

import ProfileActions from '../actions/ProfileActions';
import PlaceActions from '../actions/PlaceActions';
import FileActions from '../actions/FileActions';
import Footer from '../components/Footer';
import MapWithASearchBox from '../components/MapWithASearchBox';
import PlaceForBrowse from '../components/placeComponents/PlaceForBrowse';
import ConnectedButton from '../components/forms/ConnectedButton';
import { onChangeHelper } from '../../../imports/helpers/DataHelpers';
import { Today } from '../../../imports/helpers/DateHelpers';
import { actionTypes } from '../helpers/ConstantsRedux';
import { stateFields } from '../../../imports/lib/Constants';
import SelectBuilder from '../components/forms/SelectBuilder';

const { values } = stateFields.fields;
const dropObj = {
    values,
    displayNames: values,
};

const items = [
    <MenuItem key={1} value={1} primaryText="1" />,
    <MenuItem key={2} value={2} primaryText="2" />,
    <MenuItem key={3} value={3} primaryText="3" />,
    <MenuItem key={4} value={4} primaryText="4" />,
    <MenuItem key={5} value={5} primaryText="5" />,
];

const SEARCHED = 'SEACHED';

class Browse extends Component {
    constructor(props) {
        super(props);
        const coords = props.place.coords || props.place.place.coords || {};
        coords.distance = 50;
        this.state = {
            numOfGuests: props.place.numOfGuests,
            arrival: props.place.arrival,
            departure: props.place.departure,
            coords,//if place has location or use has already selected a location
        };
    }

    componentDidMount = () => {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    searchForPlaces = () => {
        const { arrival, departure, numOfGuests, coords } = this.state;
        if (!coords || !coords.lat) return this.setState({ searchMessage: 'Please enter a location to search near' });
        if ((arrival && !departure) || (departure && !arrival)) return this.setState({ searchMessage: 'Please select your arrival AND departure dates' });
        this.setState({ searchMessage: SEARCHED });
        const searchObj = { arrival, departure, numOfGuests, coords };
        //if (!coords.distance || coords.distance < 1) delete searchObj.coords;
        this.props.placeActions.getPlaceBasedUponAvailability(searchObj);
        return undefined;
    }

    componentWillUnmount = () => {
        const {
            arrival,
            departure,
            coords,
            numOfGuests,
        } = this.state;
        const halfwayHouse = {
            arrival,
            departure,
            coords,
            numOfGuests,
        };
        this.props.placeActions.saveBrowseData(halfwayHouse);
    }

    onSetLocation = (coordsObj) => {
        const coords = merge({}, this.state.coords, coordsObj);
        this.setState({ coords });
    }

    updateCordsDistance = (distance) => {
        const coords = cloneDeep(this.state.coords || {});
        coords.distance = parseInt(distance);
        this.setState({ coords });
    }

    goToProfile = (profileId) => {
        if (profileId) return this.props.router.push(`/viewProfile/${profileId}`);
        this.props.router.push('/viewProfile');
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {
        const { placesForBrowsing, place } = this.props.place;
        let defArrDate = {};
        let defDepDate = {};
        if (this.state.departure || this.state.arrival) {
            defArrDate = { defaultDate: this.state.arrival };
            defDepDate = { defaultDate: this.state.departure };
        }
        return (
            <div className="browse-container">
                <div className="container">
                    <div className="row reduced-row-margin">
                        <div className="row">
                            <div className="col s6 m3 input-field inline">
                                <input type="number" min={0} max={500} className="" id="range-cap" value={this.state.coords.distance} onChange={e => this.updateCordsDistance(onChangeHelper(e))} />
                                <label htmlFor="range-cap"><i className="fa fa-location-arrow" aria-hidden="true" /> Search Radius (Mi)</label>
                            </div>
                            <div className="col s6 m3 search-button">
                                <ConnectedButton
                                    icon={<i className="fa fa-search fa-1x" aria-hidden="true" style={{ float: 'left' }} />}
                                    actionType={actionTypes.GET_PLACE_BY_AVAILABILITY}
                                    buttonText="Search"
                                    onClick={this.searchForPlaces}
                                />
                            </div>
                            <div className="col s6 m3">
                                <DatePicker
                                    className="material-date-picker"
                                    onChange={(nul, date) => this.setState({ arrival: date })}
                                    floatingLabelText={<span><FontIcon className="material-icons">date_range</FontIcon> Arrival</span>}
                                    textFieldStyle={{ width: '100%' }}
                                    {...defArrDate}
                                //disableYearSelection={this.state.disableYearSelection}
                                />
                            </div>
                            <div className="col s6 m3">
                                <DatePicker
                                    className="material-date-picker"
                                    onChange={(nul, date) => this.setState({ departure: date })}
                                    floatingLabelText={<span><FontIcon className="material-icons">date_range</FontIcon> Departure</span>}
                                    textFieldStyle={{ width: '100%' }}
                                    {...defDepDate}
                                />
                            </div>
                            {/*<div className="col s6 m3">*/}
                                {/*<SelectBuilder*/}
                                    {/*onChange={this.handleChange}*/}
                                    {/*selectArrObj={dropObj}*/}
                                    {/*label="State"*/}
                                    {/*extraProps={{}}*/}
                                    {/*multiple={true}*/}
                                {/*/>*/}
                            {/*</div>*/}
                            {/*<div className="col s6 m3 search-button">*/}
                                {/*<ConnectedButton*/}
                                    {/*icon={<i className="fa fa-search fa-1x" aria-hidden="true" style={{ float: 'left' }} />}*/}
                                    {/*actionType={actionTypes.GET_PLACE_BY_AVAILABILITY}*/}
                                    {/*buttonText="Search"*/}
                                    {/*onClick={this.searchForPlaces}*/}
                                {/*/>*/}
                            {/*</div>*/}
                            {/* <div className="col s6 m4 l3  input-field inline">
                            <input type="number" className="" id="guest-cap" onChange={e => this.setState({ numOfGuests: onChangeHelper(e) })} />
                            <label htmlFor="guest-cap"><i className="fa fa-users" aria-hidden="true" /> Sleeps how many</label>
                        </div> */}
                        </div>
                    </div>
                </div>
                <div className={`row error-message ${this.state.searchMessage === '' ? 'hide' : ''}`} style={{ marginBottom: '10px' }}>
                    <div className="col s6 m4 l3 offset-s6 offset-m8 offset-l9" >
                        {this.state.searchMessage !== SEARCHED ? this.state.searchMessage : `We found ${placesForBrowsing.length} places`}
                    </div>
                </div>
                <div className="row">
                    <div className="map-container col s12 m7 l6">
                        <MapWithASearchBox
                            profile={place}
                            coords={this.state.coords}
                            onSetLocation={this.onSetLocation}
                            externalMarkers={placesForBrowsing}
                            resizeBounds
                        />
                    </div>
                    <div className="scroll-listing col s12 m5 l6 no-pad" >
                        {placesForBrowsing.map((placeFB, idx) => (
                            <div className="col s12 l6 " key={placeFB.profile ? `${placeFB.profile.firstName}-${idx}` : `browsePlace-${idx}`}>
                                <PlaceForBrowse
                                    placeForBrowse={placeFB}
                                    address={placeFB.address}
                                    profile={placeFB.profile}
                                    placeImgs={placeFB.placeImgs}
                                    profileImg={placeFB.profileImg}
                                    goToProfile={() => this.goToProfile(placeFB._id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { profile, place, images, user } = state;
    return {
        profile,
        place,
        images,
        user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(ProfileActions, dispatch),
        placeActions: bindActionCreators(PlaceActions, dispatch),
        fileActions: bindActionCreators(FileActions, dispatch),
    };
}

Browse.propTypes = {
    profileActions: PropTypes.object.isRequired, //eslint-disable-line
    placeActions: PropTypes.object.isRequired,
    fileActions: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    place: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(Browse));
