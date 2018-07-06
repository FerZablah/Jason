
import {
  GET_DEVICES_SUCCESS,
  GET_DEVICES_FAILED,
  CLEAR
} from '../actions/types';

const INITIAL_STATE = {
  devices: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DEVICES_SUCCESS:
      return { ...state, devices: [...state.devices, action.payload] };
    case GET_DEVICES_FAILED:
    case CLEAR:
      return { ...state, ...INITIAL_STATE };
    default:
     return state;
  }
};
