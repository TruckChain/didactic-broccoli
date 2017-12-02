import { combineReducers } from 'redux';
import * as types from '../types';

const carrier = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_CARRIER_REQUEST:
      return {
        id: action.id,
        count: action.count,
        text: action.text
      };
    case types.INCREMENT_COUNT:
      if (state.id === action.id) {
        return { ...state, count: state.count + 1 };
      }
      return state;
    case types.DECREMENT_COUNT:
      if (state.id === action.id) {
        return { ...state, count: state.count - 1 };
      }
      return state;
    default:
      return state;
  }
};

const carriers = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    case types.CREATE_CARRIER_REQUEST:
      return [...state, carrier(undefined, action)];
    case types.CREATE_CARRIER_FAILURE:
      return state.filter(t => t.id !== action.id);
    case types.DESTROY_CARRIER:
      return state.filter(t => t.id !== action.id);
    case types.INCREMENT_COUNT:
    case types.DECREMENT_COUNT:
      return state.map(t => carrier(t, action));
    default:
      return state;
  }
};

const newCarrier = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TYPING:
      return action.newCarrier;
    case types.CREATE_CARRIER_REQUEST:
      return '';
    default:
      return state;
  }
};

const carrierReducer = combineReducers({
  carriers,
  newCarrier
});

export default carrierReducer;
