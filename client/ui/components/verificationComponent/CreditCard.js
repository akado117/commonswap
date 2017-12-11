import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const _ = require('lodash')//required so it can be used easily in chrome dev tools.a
import Payment from 'payment';
import { Row, Col, FormGroup, ControlLabel, Button, Alert } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { getStripeToken } from '../../../../imports/modules/get-stripe-token';
import { createCustomer } from '../../../../imports/modules/store-card';

class CreditCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: null,
      exp_month: null,
      exp_year: null,
      cvc: null,
      token: null,
    };
    this.setCardType = this.setCardType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetCard = this.resetCard.bind(this);
  }

  resetCard() {
    this.setState({ number: null, exp_month: null, exp_year: null, cvc: null, token: null });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.resetCard();

    const { refs } = this;
    const number = refs.number.value;
    const expiration = refs.expiration.value.split('/');
    const exp_month = parseInt(expiration[0], 10);
    const exp_year = parseInt(expiration[1], 10);
    const cvc = refs.cvc.value;
    const card = { number, exp_month, exp_year, cvc };

    getStripeToken(card)
      .then((token) => {
        card.token = token;
        this.setState(card);
      }).catch((error) => {
        Bert.alert(error, 'danger');
      });

    this.props.dispatch(createCustomer(card.token, this.props.profile.profile.email))
  }




  setCardType(event) {
    const type = Payment.fns.cardType(event.target.value);
    const cards = document.querySelectorAll('[data-brand]');

    [].forEach.call(cards, (element) => {
      if (element.getAttribute('data-brand') === type) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }

  componentDidMount() {
    const { number, expiration, cvc } = this.refs;
    Payment.formatCardNumber(number);
    Payment.formatCardExpiry(expiration);
    Payment.formatCardCVC(cvc);
    Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  }

  renderCardList() {
    return (<ul className="credit-card-list clearfix">
      <li><i data-brand="visa" className="fa fa-cc-visa"></i></li>
      <li><i data-brand="amex" className="fa fa-cc-amex"></i></li>
      <li><i data-brand="mastercard" className="fa fa-cc-mastercard"></i></li>
      <li><i data-brand="jcb" className="fa fa-cc-jcb"></i></li>
      <li><i data-brand="discover" className="fa fa-cc-discover"></i></li>
      <li><i data-brand="dinersclub" className="fa fa-cc-diners-club"></i></li>
    </ul>);
  }

  renderCardForm() {
    return (<form className="CardForm" onSubmit={this.handleSubmit}>
      <Row>
        <Col xs={12}>
          <FormGroup>
            <ControlLabel>Card Number</ControlLabel>
            <input
              onKeyUp={this.setCardType}
              className="form-control"
              type="text"
              ref="number"
              placeholder="Card Number"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={5}>
          <FormGroup>
            <ControlLabel>Expiration</ControlLabel>
            <input
              className="form-control text-center"
              type="text"
              ref="expiration"
              placeholder="MM/YYYY"
            />
          </FormGroup>
        </Col>
        <Col xs={6} sm={4} smOffset={3}>
          <FormGroup>
            <ControlLabel>CVC</ControlLabel>
            <input
              className="form-control text-center"
              type="text"
              ref="cvc"
              placeholder="CVC"
            />
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit" bsStyle="success" block>Generate Token</Button>
    </form>);
  }

  renderCard() {
    const { number, exp_month, exp_year, cvc, token } = this.state;
    return number ? (<Alert bsStyle="info">
      <h5>{number}</h5>
      <p className="exp-cvc">
        <span>{exp_month}/{exp_year}</span>
        <span>{cvc}</span>
      </p>
      <em>{token}</em>
    </Alert>) : '';
  }

  render() {
    return (<div className="CreditCard">
      {this.renderCardList()}
      {this.renderCardForm()}
      {this.renderCard()}
    </div>);
  }
}
function mapStateToProps(state) {
  const { profile } = state;
  return {
    profile
  };
}

CreditCard.propTypes = {
  profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(CreditCard);