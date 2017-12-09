import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

class ButtonArrayComp extends Component {
    constructor(props){
        super(props);

        this.state = {
            ...props.defaultValues,
        };
    }

    onChangeHandler = (e, type) => {
        const value = !this.state[type];
        this.props.getValueFunc(type, value);
        this.setState({ [type]: value });
    }

    render() {
        const buttons = this.props.buttonData.map((btnData, idx) => {
            return <Checkbox key={`interests-${idx}`} onClick={this.onChangeHandler} name={btnData.name} active={this.state[btnData.name]} label={btnData.label} />;
        });
        return (
            <div className="interests-container" style={{ paddingTop: '15px' }}>
                {buttons}
            </div>
        );
    }
}

ButtonArrayComp.propTypes = {
    getValueFunc: PropTypes.func.isRequired,
    buttonData: PropTypes.array.isRequired,
    defaultValues: PropTypes.object,
};

ButtonArrayComp.defaultProps = {
    getValueFunc: () => {},
    buttonData: [],
    defaultValues: {},
};

export default ButtonArrayComp;