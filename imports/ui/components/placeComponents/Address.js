import React from 'react';
import PropTypes from 'prop-types';
import SelectBuilder from '../forms/SelectBuilder';
import { stateFields } from '../../../lib/Constants';

const { values } = stateFields.fields;
const dropObj = {
    values,
    displayNames: values,
};
function onChangeHelper(event) {
    return event.target.value;
}

const AddressComponent = ({ getValueFunc = () => {}, defaultValues = {} }) => {
    return (
        <div className="row" style={{ marginBottom: '0' }}>
            <div className="col s3 input-field inline">
                <label htmlFor="apt">Apt #</label>
                <input id="apt" type="text" onChange={e => getValueFunc('apt', onChangeHelper(e))} defaultValue={defaultValues.apt} />
            </div>
            <div className="col s9 input-field inline">
                <label htmlFor="street">Street</label>
                <input id="street" type="text" onChange={e => getValueFunc('street', onChangeHelper(e))} defaultValue={defaultValues.street} />
            </div>
            <div className="col s6 input-field inline">
                <label htmlFor="city">City</label>
                <input id="city" type="text" onChange={e => getValueFunc('city', onChangeHelper(e))} defaultValue={defaultValues.city} />
            </div>
            <div className="col s3">
                <SelectBuilder
                    onChange={value => getValueFunc('state', value)}
                    selectArrObj={dropObj}
                    label="State"
                    extraProps={{}}
                    defaultValue={defaultValues.state}
                />
            </div>
            <div className="col s3 input-field inline">
                <label htmlFor="zip">Zip</label>
                <input id="zip" type="number" onChange={e => getValueFunc('zip', onChangeHelper(e))} defaultValue={defaultValues.zip} />
            </div>
        </div>
    );
};

AddressComponent.propTypes = {
    getValueFunc: PropTypes.func.isRequired,
    defaultValues: PropTypes.object,
};

export default AddressComponent;