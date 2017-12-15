import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Card from './Card';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import handleSignup from '../../../../imports/modules/signup';

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
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { profile, user } = state;
    return {
        profile,
        user
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
  
    };
  }
  
  CardForm.propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
