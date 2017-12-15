import React from 'react';
import { get } from 'lodash';
import {compose, withProps, lifecycle, defaultProps} from 'recompose';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import PropTypes from 'prop-types';
const {SearchBox} = require('react-google-maps/lib/components/places/SearchBox');
import { buildMarkerObj } from '../../../imports/helpers/DataHelpers';

const MapSearchBox = compose(
    withProps(props => ({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDB1VkVvNXQUiKRzjVJoWfsyrusO5pkAWE&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `450px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
        ...props,
    })),
    defaultProps({
        externalMarkers: [],
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};
            const { lat, lng } = this.props.coords || (this.props.place && this.props.place.coords) || {};
            const initialMarker = lat !== undefined && lng !== undefined ? [buildMarkerObj({ lat, lng })] : [];
            this.setState({
                bounds: null,
                center: {
                    lat: lat || 41.9,
                    lng: lng || -87.624,
                },
                markers: initialMarker,
                injectedMarkers: this.props.markers || [],
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    })
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const bounds = new google.maps.LatLngBounds();

                    places.map(({address_components, geometry: {location}}) => {
                        console.log(location);
                        this.props.onSetLocation({
                            lat: location.lat(),
                            lng: location.lng(),
                        });
                    });

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    // refs.map.fitBounds(bounds);
                },
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}
    >
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
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
        </SearchBox>
        {props.markers.map((marker, index) =>
            <Marker key={`map-marker-${index}`} position={marker.position} />
        )}
        {props.externalMarkers.map((marker, index) =>
            <Marker key={`external-marker-${index}`} position={marker.coords} />
        )}
    </GoogleMap>
)

class MapComponent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = { isMarkerShown: false };
    }

    componentDidMount() {
        this.delayedShowMarker();
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true });
        }, 3000);
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false });
        this.delayedShowMarker();
    }

    render() {
        return (
            <MapSearchBox
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
            />
        );
    }
}

MapComponent.propTypes = {
    className: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    externalMarkers: PropTypes.array,
};

MapComponent.defaultProps = {
    className: '',
    externalMarkers: [],
};

export default MapSearchBox;