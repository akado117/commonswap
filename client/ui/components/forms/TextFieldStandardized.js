import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

function TextFieldStandardized({ floatingLabelText, onChange, extraProps, hintText }) {
    return (<TextField
        floatingLabelText={floatingLabelText}
        underlineStyle={{ borderBottomColor: '#9e9e9e' }}
        floatingLabelStyle={{ top: '33px', fontSize: '1rem', color: '#9e9e9e', left: '0 !important' }}
        multiLine
        rows={1}
        rowsMax={9}
        hintText={hintText}
        fullWidth
        onChange={onChange}
        floatingLabelShrinkStyle={{ top: '33px', fontSize: '1.05rem', color: '#9e9e9e' }}
        {...extraProps}
    />);
}

TextFieldStandardized.propTypes = {
    floatingLabelText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onChange: PropTypes.func,
    extraProps: PropTypes.object,
};

TextFieldStandardized.defaultProps = {
    floatingLabelText: '',
    onChange: () => { },
    extraProps: {},
}

export default TextFieldStandardized;