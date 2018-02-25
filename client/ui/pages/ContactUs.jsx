import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import ProfileActions from '../actions/ProfileActions';


class ContactUs extends Component {
    constructor(props) {
        super(props);
    }

    contactUs = (data) => {
        const { firstName, lastName, email, phone, comments } = data;
        this.props.profileActions.contactUs({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            comments: data.comments,
        });
    }

    render() {
        return (
            <div>
                <div className="contact-container">
                    <div className="container center-align">
                        <div className="row">
                            <h1 className="contact-title">Contact Us</h1>
                            <p><em>Please provide any feedback about our product.</em></p>
                        </div>
                        <ContactForm
                            contactUs={data => this.contactUs(data)}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(ProfileActions, dispatch),
    };
}

ContactUs.propTypes = {
    profileActions: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
