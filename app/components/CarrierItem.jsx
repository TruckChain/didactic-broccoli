import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/carrier-item';

const cx = classNames.bind(styles);

const CarrierItem = ({ text, id }) => {

  return (
    <li className={cx('carrier-item')} key={id}>
      <span className={cx('carrier')}>{text}</span>
    </li>
  );
};

CarrierItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CarrierItem;
