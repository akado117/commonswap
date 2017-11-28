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
                <AppBar
                    title={<span><FontIcon className="material-icons">lock</FontIcon> Billing Information</span>}
                    showMenuIconButton={false}
                    style={{ marginBottom: '10px', zIndex: '0' }}
                />
                <div className="row">
                    <div className="col l8" style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                        <Card ref={card => (this.card = card)} />
                    </div>
                    <div className="col l12">
                        <RaisedButton label="Update Card" primary={true} onClick={this.handleSubmit} />
                    </div>
                    {/* <div className="col l12" style={{ marginTop: '1.5rem' }}>
                        <div className="col l12" style={{ color: 'red' }} >
                            Learn about available cities weekly!
                        </div>
                        <div className="col l6 input-field inline">
                            <input type="text" className="" id="short-desc" />
                            <label htmlFor="short-desc"><i className="fa fa-mail" aria-hidden="true"></i>Email</label>
                        </div>
                        <div className="col l12">
                            <RaisedButton label="Sign up" primary={true} onClick={this.handleSubmit} />
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default CardForm;
