import React from 'react';
import Page from '../pages/Page';
import { title, meta, link } from './assets';
import CarrierContainer from '../containers/Carrier';


const Carrier = (props) => (
  <Page title={title} meta={meta} link={link}>
    <CarrierContainer {...props} />
  </Page>
);

export default Carrier;
