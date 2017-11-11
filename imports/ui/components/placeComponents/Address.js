import React from 'react';
import PropTypes from 'prop-types';
import SelectBuilder from '../forms/SelectBuilder';

function onChangeHelper(event) {
    return event.target.value;
}

const stateFields = {
    fields: {
        displayNames: ["N/A","Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Maryland", "Massachusetts", "Michigan",
            "Minnesota", "Mississippi", "Missouri", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
        values: ["N/A","AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MT","NE",
            "NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","MD","MA","MI","MN","MS","MO","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"],
    },
};

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
                    selectArrObj={stateFields.fields}
                    label="State"
                    extraProps={{
                        style: { top: '-7px' },
                    }}
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