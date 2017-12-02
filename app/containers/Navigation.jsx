import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = () => {
    return (
      <div className={cx('container')} >
        <nav className={cx('navigation')} role="navigation">
          <Link
            to="/"
            className={cx('item', 'logo')}
            activeClassName={cx('active')}>Truck Chain</Link>
          <Link to="/about" className={cx('item')} activeClassName={cx('active')}>About</Link>
        </nav>
      </div>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Navigation);
