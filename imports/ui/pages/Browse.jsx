import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
const { cloneDeep } = require('lodash');
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

import ProfileActions from '../../actions/ProfileActions';
import PlaceActions from '../../actions/PlaceActions';
import FileActions from '../../actions/FileActions';
import Footer from '../components/Footer';
import MapWithASearchBox from '../components/MapWithASearchBox';
import PlaceForBrowse from '../components/placeComponents/PlaceForBrowse';
import { onChangeHelper } from '../../helpers/DataHelpers';

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
        this.state = {
            numOfGuests: props.place.numOfGuests,
            arrival: props.place.arrival || new Date(),
            departure: props.place.departure || new Date(),
            coords: props.place.coords,
        };
    }

    searchForPlaces = () => {
        const { arrival, departure, numOfGuests, coords } = this.state;
        if (!arrival || !departure) return this.setState({ searchMessage: 'Please select your dates to travel' });
        this.setState({ searchMessage: SEARCHED });
        this.props.placeActions.getPlaceBasedUponAvailability({ arrival, departure, numOfGuests ,coords });
        return undefined;
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.place.place._id && !this.props.images.placeImgs.length) { //get new images on login
            this.props.fileActions.getImagesForPlace({ placeId: this.props.place.place._id });
        }
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

    onSetLocation = (coords) => {
        this.setState({ coords });
    }

    updateCordsDistance = (distance) => {
        const coords = cloneDeep(this.state.coords || {});
        coords.distance = parseInt(distance);
        this.setState({ coords });
    }

    render() {
        const { placesForBrowsing, place, coords } = this.props.place;
        return (
            <div className="browse-container">
                <div className="container">
                    <div className="row">
                        <div className="col s6 m4 l3">
                            <DatePicker
                                className="material-date-picker"
                                onChange={(nul, date) => this.setState({ arrival: date })}
                                floatingLabelText={<span><FontIcon className="material-icons">date_range</FontIcon> Arrival</span>}
                                textFieldStyle={{ width: '100%' }}
                                defaultDate={this.state.arrival}
                            //disableYearSelection={this.state.disableYearSelection}
                            />
                        </div>
                        <div className="col s6 m4 l3">
                            <DatePicker
                                className="material-date-picker"
                                onChange={(nul, date) => this.setState({ departure: date })}
                                floatingLabelText={<span><FontIcon className="material-icons">date_range</FontIcon> Departure</span>}
                                textFieldStyle={{ width: '100%' }}
                                defaultDate={this.state.departure}
                            />
                        </div>
                        <div className="col s6 m4 l3  input-field inline">
                            <input type="number" className="" id="guest-cap" onChange={e => this.setState({ numOfGuests: onChangeHelper(e) })} />
                            <label htmlFor="guest-cap"><i className="fa fa-users" aria-hidden="true" /> Sleeps how many</label>
                        </div>
                        <div className="col s6 m4 l3  input-field inline">
                            <input type="number" min={0} max={500} className="" id="range-cap" onChange={e => this.updateCordsDistance(onChangeHelper(e))} />
                            <label htmlFor="range-cap"><i className="fa fa-location-arrow" aria-hidden="true" /> Range: Miles</label>
                        </div>
                        <div className="col s6 m4 l3 offset-s6 valign-wrapper">
                            <button onClick={this.searchForPlaces} className="waves-effect waves-light btn-large search-button" type="submit" >
                                <i className="fa fa-search-o fa-1x" aria-hidden="true" style={{ float: 'left' }} />
                                Search
                            </button>
                        </div>
                    </div>
                    {this.state.coords && this.state.coords.distance > 0 ? <MapWithASearchBox
                        profile={place}
                        coords={coords}
                        onSetLocation={this.onSetLocation}
                    /> : ''}
                </div>
                <div className={`row ${this.state.searchMessage === '' ? 'hide' : ''}`}>
                    <div className="col s6 m4 l3 offset-s6 offset-m8 offset-l9" >
                        {this.state.searchMessage !== SEARCHED ? this.state.searchMessage : `We found ${placesForBrowsing.length} places`}
                    </div>
                </div>
                <div className="scroll-listing col s12 l6" style={{ overflowY: 'scroll', maxHeight: '750px' }}>
                    {placesForBrowsing.map((place, idx) => (
                        <PlaceForBrowse
                            key={place.profile ? `${place.profile.firstName}-${idx}` : `browsePlace-${idx}`}
                            placeForBrowse={place}
                            address={place.address}
                            profile={place.profile}
                            placeImgs={place.placeImgs}
                            profileImg={place.profileImg}
                        />
                    ))}
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
