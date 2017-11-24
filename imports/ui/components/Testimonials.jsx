import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

class Testimonials extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="testimonial-container">
                <Navbar></Navbar>
                <header></header>
                <div className="container pad-top">
                    <div className="row">
                        <div className="col s12 l4">
                            <img className="grow test-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/Testimonials/Testimonial2.JPG" alt="" />
                        </div>
                        <div className="col s12 l4">
                            <img className="grow test-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/Testimonials/Testimonial1.JPG" alt="" />
                        </div>
                        <div className="col s12 l4">
                            <img className="grow test-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/Testimonials/Testimonial3.JPG" alt="" />
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Testimonials;
