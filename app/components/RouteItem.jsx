import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from '../css/components/route-item';

const cx = classNames.bind(styles);

const RouteItem = ({ name, id, rating }) => {

  const [source, destination] = name.trim().split(' to ');
  const formattedRating = +(rating).toFixed(2);

  return (
    <li className={cx('carrier-item')} key={id}>
      <div className={cx('info')}>
        <span className={cx('carrier')}><b>source:</b> {source}</span>
        <span className={cx('carrier')}><b>destination:</b> {destination}</span>
      </div>
      <ul className={cx('ratings')}><b>rating: {formattedRating}%</b></ul>
    </li>
  );
};

RouteItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default RouteItem;
