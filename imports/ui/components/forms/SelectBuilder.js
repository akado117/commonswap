import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SelectBuilder extends Component {
    constructor(){
        super();

        this.state = {
            value: undefined,
        }
    }
    onChangeHandler = (e, t, value) => {
        this.props.onChange(value);
        this.setState({value})
    };
    render () {
        const {
            selectArrObj = { values: [], displayNames: [] },
            label,
            extraProps = {},
            defaultSelection}
         = this.props;
        return (
            <SelectField fullWidth floatingLabelText={label} {...extraProps} onChange={this.onChangeHandler} value={this.state.value}>
                {defaultSelection ? <MenuItem disabled value={undefined} primaryText={defaultSelection}/> : ''}
                {selectArrObj.values.map((value, idx) => <MenuItem key={`${label}-${idx}`} value={value}
                                                                   primaryText={selectArrObj.displayNames[idx]}/>)}
            </SelectField>)
    }
}

SelectBuilder.propTypes = {
    defaultSelection: PropTypes.any,
    selectArrObj: PropTypes.shape({
        values: PropTypes.array,
        displayNames: PropTypes.array,
    }),
    label: PropTypes.string,
    onChange: PropTypes.func,
    extraProps: PropTypes.object,
};

export default SelectBuilder