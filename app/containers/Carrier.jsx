import React from 'react';
import classNames from 'classnames/bind';

class Carrier extends React.Component {

  render() {
    return (
      <div>
          {this.props.params.name}
      </div>
    );
  }
};

export default Carrier;
