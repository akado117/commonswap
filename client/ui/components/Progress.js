import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Progress extends Component {
  constructor(props) {
    super(props);
    this.calculateFill = this.calculateFill.bind(this);
  }

  calculateFill() {
    const { bottom, top } = this.props;
    return `${(bottom / top) * 100}%`;
  }

  render() {
    return (<div className="progress" >
        <div className="determinate" style={{ width: this.calculateFill() }}></div>
    </div>);
  }
}

Progress.propTypes = {
  bottom: PropTypes.number,
  top: PropTypes.number,
};

export default Progress;
