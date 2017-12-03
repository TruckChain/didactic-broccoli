import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import RouteItem from '../components/RouteItem';
import styles from '../css/components/main-section';
import { createSearchAction, getSearchSelectors } from 'redux-search'

const cx = classNames.bind(styles);

import trips from '../data/trips.json';


export default class RouteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Routes: trips.filter(trip => trip.carriers.indexOf(this.props.carrier_id) !== -1),
    };
  };

  tripItems = () => {
    return trips.map((trip, key) => {
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
