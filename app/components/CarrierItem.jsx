import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from '../css/components/carrier-item';

const cx = classNames.bind(styles);

const CarrierItem = ({ name, id, rating, numberOfTrips }) => {
  const formattedRating = +(rating).toFixed(2);
  return (
    <li className={cx('carrier-item')} key={id}>
      <div className={cx('info')}>
        <span className={cx('carrier')}>{name}</span>
        <Link to={`/carrier/${name}`} name={name} className={cx('link')}>See Trips</Link>
      </div>
      <div className={cx('info')}>
        <span className={cx('ratings')}><b>rating: {formattedRating}%</b></span>
        <span className={cx('ratings')}>based on {numberOfTrips} trips</span>
      </div>
    </li>
  );
};

CarrierItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default CarrierItem;
