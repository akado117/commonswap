import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import {buildBoundsRange, buildMarkerObj} from "../../../imports/helpers/DataHelpers";

const PlacesWithStandaloneSearchBox = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${Meteor.settings.public.googleKeys.googleMapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
    }),
    withScriptjs,
    lifecycle({
        componentWillMount() {
            const refs = {};
            const { lat, lng } = this.props.coords || (this.props.place && this.props.place.coords) || { lat: 41.9, lng: -87.624 };
            const boundPoints = buildBoundsRange({ lat, lng }, window.google.maps.LatLng, 3.5);

            this.setState({
                places: [],
                bounds: new window.google.maps.LatLngBounds(boundPoints.sw, boundPoints.ne),
                center: {
                    lat: lat || 41.9,
                    lng: lng || -87.624,
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    if (this.props.onSearchComplete) this.props.onSearchComplete(places);

                    this.state.setNewCenter(places);
                },
                setNewCenter: (places) => {
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = get(nextMarkers, '0.position', this.state.center);
                    const boundsCenter = {
                        lat: typeof nextCenter.lat === 'function' ? nextCenter.lat() : nextCenter.lat,
                        lng: typeof nextCenter.lng === 'function' ? nextCenter.lng() : nextCenter.lng,
                    };
                    const { sw, ne } = buildBoundsRange(boundsCenter, window.google.maps.LatLng, 3.5);

                    this.setState({
                        bounds: new window.google.maps.LatLngBounds(sw, ne),
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                },
            });
        },
    })
)(props => {
    const { bounds, labelText, icon } = props;
    const labelIcon = icon || <i className="fa fa-search fa-1x" aria-hidden="true" />;
    return (
        <div data-standalone-searchbox="" className={`input-field inline ${props.className}`}>
            <StandaloneSearchBox
                ref={props.onSearchBoxMounted}
                bounds={bounds}
                onPlacesChanged={props.onPlacesChanged}
            >
                {/* <div className="col s6 m3 input-field inline">
                    <input type="text" className="" id="search-box" style={{ textOverflow: 'ellipses' }} />
                    <label htmlFor="range-cap"><i className="fas fa-map-marker-alt" aria-hidden="true" />Search Listings</label>
                </div> */}
                <div>
                    <input
                        type="text"
                        id="location-search"
                        style={{ textOverflow: 'ellipses' }}
                        placeholder=""
                    />
                    <label htmlFor="location-search">
                        {labelIcon}{' '}{labelText || 'Search Location'}
                    </label>
                </div>
            </StandaloneSearchBox>
        </div>);
});

PlacesWithStandaloneSearchBox.propTypes = {
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    onSearchComplete: PropTypes.func,
    className: PropTypes.string,
    labelText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    icon: PropTypes.element,
};

export default PlacesWithStandaloneSearchBox;