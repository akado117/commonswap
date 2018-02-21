import React from 'react';
import PropTypes from 'prop-types';
import { onChangeHelper } from '../../../imports/helpers/DataHelpers';
import PlacesWithStandaloneSearchBox from '../components/StandaloneSearchBox';
import { SEARCHED } from '../helpers/ConstantsRedux';

export default function BrowseControls({ onSearchChanged, searchButton, updateCordsDistance, searchMessage, placesForBrowsing, coords}) {
    return (
        <div className="browse-controls-container">
            <div className="row explore-container reduced-row-margin">
                <div className="col s12">
                    <h3 className="explore-title">Explore</h3>
                </div>
            </div>
            <div className="row reduced-row-margin">
                <div className="col s12">
                    <p>To browse potential swaps, first enter your desired travel destination in the search box. You can adjust the range of your search using the range field below</p>
                </div>
            </div>
            <div className="row">
                <PlacesWithStandaloneSearchBox
                    className="col s12 m5 l6"
                    onSearchComplete={onSearchChanged}
                />
                <div className="col s6 m3 input-field inline">
                    <input type="number" min={0} max={500} className="" id="range-cap" value={coords.distance} onChange={e => updateCordsDistance(onChangeHelper(e))} />
                    <label htmlFor="range-cap"><i className="fa fa-location-arrow" aria-hidden="true" /> Search Radius (Mi)</label>
                </div>
                <div className="col s6 m4 l3 search-button">
                    {searchButton}
                </div>
            </div>
            <div className={`row error-message ${searchMessage === '' ? 'hide' : ''}`} style={{ marginBottom: '10px' }}>
                <div className="col s6 m4 l3 offset-s6 offset-m8 offset-l9" >
                    {searchMessage !== SEARCHED ? searchMessage : `We found ${placesForBrowsing.length} places`}
                </div>
            </div>
        </div>
    );
};

BrowseControls.propTypes = {
    onSearchChanged: PropTypes.func.isRequired,
    searchButton: PropTypes.element.isRequired,
    updateCordsDistance: PropTypes.func.isRequired,
    searchMessage: PropTypes.string,
    placesForBrowsing: PropTypes.array.isRequired,
    coords: PropTypes.object.isRequired,
};