import React from 'react';
import classNames from 'classnames/bind';
import RouteList from '../components/RouteList';

class Carrier extends React.Component {

  render() {
    return (
      <div>
      <RouteList
        carrier_id={this.props.params.id}
        carrier_name={this.props.params.name} />
      </div>
    );
  }
};

export default Carrier;
