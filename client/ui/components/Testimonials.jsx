import React, { Component } from 'react';
import Footer from './Footer';

class Testimonials extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="testimonial-container">
                <div className="">
                    <div className="row">
                        <div className="col s12 l8 offset-l2 center-align">
                            <img className="grow test-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/Testimonials/Testimonial2.JPG" alt="" />
                        </div>
                        <div className="col s12 l8 offset-l2 center-align">
                            <img className="grow test-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/Testimonials/Testimonial1.JPG" alt="" />
                        </div>
                        <div className="col s12 l8 offset-l2 center-align">
                            <img className="grow test-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/Testimonials/Testimonial3.JPG" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Testimonials;
