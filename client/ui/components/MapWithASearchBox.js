/* global google */
import React from 'react';
import { get } from 'lodash';
import { compose, withProps, lifecycle, defaultProps, withHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PropTypes from 'prop-types';
const { SearchBox } = require('react-google-maps/lib/components/places/SearchBox');
import { buildMarkerObj, buildBoundsRange } from '../../../imports/helpers/DataHelpers';

const centerMarker = {
    path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    fillColor: 'yellow',
    fillOpacity: 0.8,
    scale: 1,
    strokeColor: 'gold',
    strokeWeight: 14,
};

function getSearchBox(props, bounds) {
    return (<SearchBox
        ref={props.onSearchBoxMounted}
        bounds={bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
    >
        <input
            type="text"
            placeholder="Enter your area"
            style={{
                boxSizing: 'border-box',
                border: '1px solid white',
                width: '240px',
                height: '32px',
                marginTop: '12px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '14px',
                outline: 'none',
                textOverflow: 'ellipses',
                backgroundColor: 'white',
            }}
        />
    </SearchBox>)
}

const MapSearchBox = compose(
    withProps(props => ({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=' + Meteor.settings.public.googleKeys.googleMapsApiKey + '&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div className="map-wrapper" />,
        mapElement: <div style={{ height: `100%` }} id="map-canvas" />,
    })),
    withHandlers({
        onMarkerClick: () => (marker) => {
            console.log('MARKER');
            console.log(marker);
        },
    }),
    withScriptjs,
    withGoogleMap,
    defaultProps({
        externalMarkers: [],
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};
            const { lat, lng } = this.props.coords || (this.props.place && this.props.place.coords) || { lat: 41.9, lng: -87.624 };
            const initialMarker = lat !== undefined && lng !== undefined ? [buildMarkerObj({ lat, lng })] : [];
            const boundPoints = buildBoundsRange({ lat, lng }, window.google.maps.LatLng, 3);

            this.setState({
                bounds: new window.google.maps.LatLngBounds(boundPoints.sw, boundPoints.ne),
                center: {
                    lat,
                    lng,
                },
                markers: initialMarker,
                injectedMarkers: this.props.markers || [],
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: () => {

                },
                getRefs: () => {
                    return refs;
                },
                getMapRef: () => {
                    if (refs.map) return refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                setNewCenter: (places) => {
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        bounds: this.state.buildNewBoundsObject(nextCenter),
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                },
                buildNewBoundsObject: (nextCenter) => {
                    const boundsCenter = {
                        lat: typeof nextCenter.lat === 'function' ? nextCenter.lat() : nextCenter.lat,
                        lng: typeof nextCenter.lng === 'function' ? nextCenter.lng() : nextCenter.lng,
                    };
                    const { sw, ne } = buildBoundsRange(boundsCenter, window.google.maps.LatLng, 0);
                    return new window.google.maps.LatLngBounds(sw, ne);
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();

                    this.props.onSearchComplete(places);
                    this.state.setNewCenter(places);
                    // refs.map.fitBounds(bounds);
                },
            })
        },
        componentWillUpdate(nextProps) {
            if (nextProps.externalMarkers !== this.props.externalMarkers) {
                this.state.bounds = this.state.buildNewBoundsObject(this.state.center);
            }
        },
        componentDidUpdate(prevProps) {
            const { place } = prevProps;
            if (!this.state.markers.length && place && !place.coords && this.props.place.coords) {
                const places = [{
                    geometry: {
                        location: this.props.place.coords,
                    },
                }];
                this.state.setNewCenter(places);
            }
            if (prevProps.coords && prevProps.coords.lat !== this.props.coords.lat && prevProps.coords.lng !== this.props.coords.lng) {
                const places = [{
                    geometry: {
                        location: this.props.coords,
                    },
                }];
                this.state.setNewCenter(places);
            }
        },
    }),
)((props) => {
    const { bounds } = props;
    const map = props.getMapRef();
    const markers = props.markers.map((marker, index) => {
        if (marker.position) {
            if (props.resizeBounds && marker.position.lat) {
                bounds.extend(new window.google.maps.LatLng(
                    typeof marker.position.lat === 'function' ? marker.position.lat() : marker.position.lat,
                    typeof marker.position.lng === 'function' ? marker.position.lng() : marker.position.lng,
                ));
            }
            return <Marker key={'internal-marker-' + index} position={marker.position} />;
        }
    });
    const externalMarks = props.externalMarkers.map((marker, index) => {
        if (marker.coords) {
            if (props.resizeBounds && marker.coords.lat) {
                bounds.extend(new window.google.maps.LatLng(
                    marker.coords.lat,
                    marker.coords.lng,
                ));
            }
            return <Marker key={'external-marker-' + index} position={marker.coords} onClick={() => props.onMarkerClick(marker)}/>;
        }
    });
    const fullMarkerArr = markers.concat(externalMarks);
    if (map && externalMarks.length) {
        map.fitBounds(bounds);
        map.panToBounds(bounds);
    }
    return (
        <GoogleMap
            ref={props.onMapMounted}
            defaultZoom={15}
            center={props.center}
            onBoundsChanged={props.onBoundsChanged}
        >
            {!props.hideSearchBar ? getSearchBox(props, bounds) : ''}
            {fullMarkerArr}
        </GoogleMap>);
});

MapSearchBox.propTypes = {
    className: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    externalMarkers: PropTypes.array,
    resizeBounds: PropTypes.bool,
    hideSearchBar: PropTypes.bool,
    onSearchComplete: PropTypes.func.isRequired,
};

MapSearchBox.defaultProps = {
    className: '',
    externalMarkers: [],
    resizeBounds: false,
};

export default MapSearchBox;