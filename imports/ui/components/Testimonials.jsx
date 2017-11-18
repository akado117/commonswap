import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

class Testimonials extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="testimonials" >
        <Navbar></Navbar>
        <div className="container">
          <div className="col s12 center-align">
            <img src="http://stretchflex.net/photos/Testimonial1.JPG" alt="" style={{width: '60%'}}/>
          </div>
          <div className="col s12 center-align">
            <img src="http://stretchflex.net/photos/Testimonial2.JPG" alt="" style={{width: '60%'}} />
          </div>
          <div className="col s12 center-align">
            <img src="http://stretchflex.net/photos/Testimonial3.JPG" alt="" style={{width: '60%'}} />
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Testimonials;
