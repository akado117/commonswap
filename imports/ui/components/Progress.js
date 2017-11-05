import React from 'react';

class Progress extends React.Component {
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
  bottom: React.PropTypes.number,
  top: React.PropTypes.number,
};

export default Progress;
