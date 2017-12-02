import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import CarrierItem from '../components/CarrierItem';
import styles from '../css/components/main-section';

import carrierz from '../data/carrier.json';

const cx = classNames.bind(styles);

const MainSection = ({carriers, onIncrement, onDecrement, onDestroy }) => {

  const carrierItems = carrierz.map((carrier, key) => {
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

  return (
    <div className={cx('main-section')}>
      <h3 className={cx('header')}>Carriers List</h3>
      <ul className={cx('list')}>{carrierItems}</ul>
    </div>
  );
};

MainSection.propTypes = {
  carrier: PropTypes.array.isRequired,
};

export default MainSection;
