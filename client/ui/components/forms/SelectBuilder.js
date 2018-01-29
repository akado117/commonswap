import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SelectBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.defaultValue,
        };
    }
    onChangeHandler = (e, t, value) => {
        this.props.onChange(value);
        this.setState({ value });
    };
    render () {
        const {
            selectArrObj = { values: [], displayNames: [] },
            label,
            extraProps = {},
            defaultSelection}
         = this.props;
        return (
            <SelectField
                fullWidth
                style={{ height: '48px', marginBottom: '10px', top: '9px' }}
                underlineStyle={{ borderBottomColor: '#9e9e9e', bottom: '0px' }}
                floatingLabelText={label}
                floatingLabelStyle={{ top: '14px', fontSize: '1rem', color: '#9e9e9e' }}
                {...extraProps}
                labelStyle={{marginTop: '-20px' }}
                iconStyle={{marginTop: '-20px' }}
                onChange={this.onChangeHandler}
                value={this.state.value}
                multiple={this.props.multiple}
            >
                {defaultSelection ? <MenuItem disabled value={undefined} primaryText={defaultSelection}/> : ''}
                {selectArrObj.values.map((value, idx) => <MenuItem key={`${label}-${idx}`} value={value}
                                                                   primaryText={selectArrObj.displayNames[idx]}/>)}
            </SelectField>);
    }
}

SelectBuilder.propTypes = {
    defaultSelection: PropTypes.any,
    selectArrObj: PropTypes.shape({
        values: PropTypes.array,
        displayNames: PropTypes.array,
    }),
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    onChange: PropTypes.func,
    extraProps: PropTypes.object,
    defaultValue: PropTypes.string,
    multiple: PropTypes.bool,
};

export default SelectBuilder