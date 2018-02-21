import React, { Component } from 'react';

class Testimonials extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="testimonial-container">
                <div className="">
                    <div className="row">
                        <div className="col s12 m6 l4 center-align image-container">
                            <img className="grow test-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/Testimonials/Testimonial2.JPG" alt="" />
                        </div>
                        <div className="col s12 m6 l4 center-align image-container">
                            <img className="grow test-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/Testimonials/Testimonial1.JPG" alt="" />
                        </div>
                        <div className="col s12 m6 l4 center-align image-container">
                            <img className="grow test-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/Testimonials/Testimonial3.JPG" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Testimonials;
