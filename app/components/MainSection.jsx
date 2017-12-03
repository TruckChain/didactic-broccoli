import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import CarrierItem from '../components/CarrierItem';
import styles from '../css/components/main-section';
import { createSearchAction, getSearchSelectors } from 'redux-search'


import carrierz from '../data/carrier.json';

const cx = classNames.bind(styles);

export default class MainSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carriers: carrierz.sort((a,b) => a.rating < b.rating),
    };
  };

  carrierItems = () => {
    return carrierz.map((carrier, key) => {
      return (
        <CarrierItem
          index={key}
          id={carrier.carrier_id}
          key={key}
          name={carrier.carrier_name}
          rating={carrier.rating}
        />
      );
    });
  };

  sortCarriers = () => {
    this.setState({
      carriers: this.state.carriers.sort((a,b) => a.rating < b.rating),
    })
  };

  render () {
    const { children, carriers, onIncrement, onDecrement, onDestroy } = this.props;

    return (
      <div className={cx('main-section')}>
        <div className={cx('header')}>
          <h3 >Carriers List</h3>
          {children}
        </div>
        <ul className={cx('list')}>{this.carrierItems()}</ul>
      </div>
    );
  };
};
