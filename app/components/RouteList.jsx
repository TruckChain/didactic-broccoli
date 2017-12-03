import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import RouteItem from '../components/RouteItem';
import styles from '../css/components/main-section';
import { createSearchAction, getSearchSelectors } from 'redux-search'

const cx = classNames.bind(styles);

import trips from '../data/trips.json';
import carriers from '../data/carriers.json';


export default class RouteList extends React.Component {
  constructor(props) {
    console.log(carriers);
    super(props);
    const selectedCarrier = carriers.filter(carrier => carrier.carrier_name === props.carrier_name)[0];
    this.state = {
      routes: trips.filter(trip => trip.carriers.indexOf(selectedCarrier.carrier_id) !== -1),
    };
  };

  tripItems = () => {
    return this.state.routes.map((trip, key) => {
      return (
        <RouteItem
          index={key}
          id={trip.trip_id}
          key={key}
          name={trip.trip_name}
          rating={trip.rating}
        />
      );
    });
  };

  render () {
    const { children, carrier_name } = this.props;

    return (
      <div className={cx('main-section')}>
        <div className={cx('header')}>
          <h3 >{carrier_name} takes these routes </h3>
          {children}
        </div>
        <ul className={cx('list')}>{this.tripItems()}</ul>
      </div>
    );
  };
};
