import React from 'react';
import Page from '../pages/Page';
import AppContainer from '../containers/App';
import { title, meta, link } from './assets';
import styles from '../css/main';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


const App = props => (
  <div className={cx('container')}>
    <Page title={title} meta={meta} link={link}>
      <AppContainer {...props} />
    </Page>
  </div>
);

export default App;
