import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import EntryBox from '../components/EntryBox';
import MainSection from '../components/MainSection';
import { typing } from '../actions/carriers';
import styles from '../css/components/search';

const cx = classNames.bind(styles);

class Search extends Component {

  componentDidMount() {
    setInterval(this.forceUpdate(), 2000);
  }
  render() {
    const {newCarrier, carriers, typing } = this.props;
    return (
      <div className={cx('search')}>
        <MainSection
          carriers={carriers}
        >
          <EntryBox
            carrier={newCarrier}
            onEntryChange={typing}
          />
        </MainSection>
      </div>
    );
  }
}

Search.propTypes = {
  carriers: PropTypes.array.isRequired,
  typing: PropTypes.func.isRequired,
  newCarrier: PropTypes.string
};

function mapStateToProps(state) {
  return {
    carriers: state.carrier.carriers,
    newCarrier: state.carrier.newCarrier
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { typing })(Search);
