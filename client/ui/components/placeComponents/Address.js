import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash.merge';
import SelectBuilder from '../forms/SelectBuilder';
import { stateFields } from '../../../../imports/lib/Constants';
import StandAloneSearchBox from '../StandaloneSearchBox';
import { getCoordsFromPlaces, mapPlaceAddressCompsToCSData } from '../../../../imports/helpers/DataHelpers';
import MapWithASearchBox from '../MapWithASearchBox';


const { values } = stateFields.fields;
const dropObj = {
    values,
    displayNames: values,
};
function onChangeHelper(event) {
    return event.target.value;
}

class AddressComponent extends React.Component {
    constructor(props) {
        super(props);
        const { apt = '', street = '', city = '', state = '', zip = ''} = props.address;
        this.state = {
            apt,
            street,
            city,
            state,
            zip,
            showDisclaimer: false,
        };
    }
    updateMaterializeFields() {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }
    componentDidMount = () => {

    }

    componentDidUpdate(prevProps) {
        if (prevProps.address !== this.props.address) {
            this.setState(this.props.address, this.updateMaterializeFields);
        }
    }

    toggleDisclaimer = () => this.setState({ showDisclaimer: !this.state.showDisclaimer });

    getValueFunc(field, value) {
        if (field === 'coords') {
            this.props.getValueFunc('place', field, value);
        } else {
            this.props.getValueFunc('address', field, value);
        }
        this.setState({
            [field]: value,
        });
    }

    onSearchComplete = (places) => {
        const coordsObj = getCoordsFromPlaces(places)[0];
        this.onSetLocation(coordsObj, places[0]);
    }

    onSetLocation = (coords, place) => {
        this.getValueFunc('coords', coords);
        let addressObj = { apt: '', street: '', city: '', state: '', zip: ''};
        if (place) addressObj = merge(addressObj, mapPlaceAddressCompsToCSData(place));
        Object.keys(addressObj).forEach((key) => {
            this.getValueFunc(key, addressObj[key]);
        });
        this.setState({ coords, ...addressObj }, this.updateMaterializeFields);
    }

    render() {
        const { place } = this.props;
        const dislaimerText = this.state.showDisclaimer
            ? 'Your address will be kept private for security reasons until you have confirmed to swap. If you do not wish to disclose your full address, we recommend using the closest intersection using the interactive map below. (i.e.. 14th st and 6th ave, New York, NY)'
            : 'Click to see security information about your address';
        return (
            <div>
                <div className="row" style={{marginBottom: '0'}}>
                    <StandAloneSearchBox
                        className="col s12"
                        onSearchComplete={this.onSearchComplete}
                        labelText={<span>Find Your Place {!place.coords ? <span className="alert-text">- Required to show in "Explore"</span> : ''}</span>}
                    />
                    <div className="col s3 input-field inline">
                        <label htmlFor="apt">Apt #</label>
                        <input
                            id="apt"
                            type="text"
                            onChange={e => this.getValueFunc('apt', onChangeHelper(e))}
                            value={this.state.apt}
                        />
                    </div>
                    <div className="col s9 input-field inline">
                        <label htmlFor="street">Address</label>
                        <input
                            id="street"
                            type="text"
                            onChange={e => this.getValueFunc('street', onChangeHelper(e))}
                            value={this.state.street}
                        />
                    </div>
                    <div className="col s6 input-field inline">
                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            type="text"
                            onChange={e => this.getValueFunc('city', onChangeHelper(e))}
                            value={this.state.city}
                        />
                    </div>
                    <div className="col s3">
                        <SelectBuilder
                            onChange={value => this.getValueFunc('state', value)}
                            selectArrObj={dropObj}
                            label="State"
                            extraProps={{}}
                            value={this.state.state}
                        />
                    </div>
                    <div className="col s3 input-field inline">
                        <label htmlFor="zip">Zip</label>
                        <input
                            id="zip"
                            type="number"
                            onChange={e => this.getValueFunc('zip', onChangeHelper(e))}
                            value={this.state.zip}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="address-disclaimer center-align col s12 m8 offset-m2" onClick={this.toggleDisclaimer} >{dislaimerText}</div>
                </div>
                <MapWithASearchBox
                    onSearchComplete={this.onSearchComplete}
                    place={place}
                    coords={this.state.coords}
                    hideSearchBar
                />
            </div>
        );
    }
};

AddressComponent.propTypes = {
    getValueFunc: PropTypes.func.isRequired,
    address: PropTypes.object,
    place: PropTypes.object,
};

AddressComponent.defaultProps = {
    address: {},
    place: {},
};

export default AddressComponent;