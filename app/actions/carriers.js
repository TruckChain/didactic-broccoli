/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';
import { carrierService } from '../services';


function createCarrierRequest(data) {
  return {
    type: types.CREATE_CARRIER_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

function createCarrierSuccess() {
  return {
    type: types.CREATE_CARRIER_SUCCESS
  };
}

function createCarrierFailure(data) {
  return {
    type: types.CREATE_CARRIER_FAILURE,
    id: data.id,
    error: data.error
  };
}

function createCarrierDuplicate() {
  return {
    type: types.CREATE_CARRIER_DUPLICATE
  };
}

export function typing(text) {
  return {
    type: types.TYPING,
    newCarrier: text
  };
}

export function createCarrier(text) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (text.trim().length <= 0) return;

    const id = md5.hash(text);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { topic } = getState();
    const data = {
      count: 1,
      id,
      text
    };

    // Conditional dispatch
    // If the topic already exists, make sure we emit a dispatch event
    if (topic.topics.filter(topicItem => topicItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate topic
      return dispatch(createCarrierDuplicate());
    }

    // First dispatch an optimistic update
    dispatch(createCarrierRequest(data));

    return carrierService().createCarrier({ id, data })
      .then((res) => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_CARRIER_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createCarrierSuccess());
        }
      })
      .catch(() => {
        return dispatch(createCarrierFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}
