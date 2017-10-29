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
            <SelectField fullWidth
                         underlineStyle={{ borderBottomColor: '#9e9e9e' }}
                         floatingLabelText={label}
                         floatingLabelStyle={{ top: '33px', fontSize: '1rem', color: '#9e9e9e' }}
                         {...extraProps}
                         onChange={this.onChangeHandler}
                         value={this.state.value}
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
    label: PropTypes.string,
    onChange: PropTypes.func,
    extraProps: PropTypes.object,
    defaultValue: PropTypes.string,
};

export default SelectBuilder