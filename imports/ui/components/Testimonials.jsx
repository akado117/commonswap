import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

class Testimonials extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="testimonial-container" >
        <Navbar></Navbar>
        <header></header>
        <div className="container pad-top">
          <div className="row">
            <div className="col s12 l4">
              <img className="grow test-img" src="http://stretchflex.net/photos/Testimonial2.JPG" alt="" />
            </div>
            <div className="col s12 l4">
              <img className="grow test-img" src="http://stretchflex.net/photos/Testimonial1.JPG" alt="" />
            </div>
            <div className="col s12 l4">
              <img className="grow test-img" src="http://stretchflex.net/photos/Testimonial3.JPG" alt="" />
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Testimonials;
