import sinon from 'sinon';
import * as carrierService from '../../services/topics';

const createCarrierServiceStub = () => ({
  replace: method => ({
    with: data => {
      const sandbox = sinon.sandbox.create();
      sandbox.stub(carrierService, 'default').returns({
        [method]: data
      });
      return sandbox;
    }
  })
});

export default createCarrierServiceStub;

