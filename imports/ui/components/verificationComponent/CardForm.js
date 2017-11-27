import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Card from './Card';
import handleSignup from '../../../modules/signup';

class CardForm extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //handleSignup({ component: this });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        handleSignup({ component: this });
    };

    render() {
        return (
            <div>
                <Card ref={card => (this.card = card)} />
                <RaisedButton label="Sign Up" primary={true} onClick={this.handleSubmit}/>
            </div>
        );
    }
}

export default CardForm;
