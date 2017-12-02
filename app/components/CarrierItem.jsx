import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from '../css/components/carrier-item';

const cx = classNames.bind(styles);

const CarrierItem = ({ name, id, rating }) => {

  return (
    <li className={cx('carrier-item')} key={id}>
      <div className={cx('info')}>
        <span className={cx('carrier')}>{name}</span>
        <Link to={`/carrier/${name}`} className={cx('link')}> More Details </Link>
      </div>
      <ul className={cx('ratings')}>rating: {rating}</ul>
    </li>
  );
};

CarrierItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default CarrierItem;
