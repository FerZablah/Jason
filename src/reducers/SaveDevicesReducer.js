import {
  NAME_CHANGED,
  PIN_CHANGED,
  SAVE_DEVICE,
  SAVE_DEVICE_REQUEST,
  DEVICE_FILLED
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  icon: '',
  pin: '0'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DEVICE_FILLED:
      return { ...state,
          name: action.payload.name,
          icon: action.payload.icon,
          pin: action.payload.pin.toString()
        };
    case NAME_CHANGED:
      return { ...state, name: action.payload };
    case PIN_CHANGED:
      return { ...state, pin: action.payload };
    case SAVE_DEVICE_REQUEST:
      return { ...state };
    case SAVE_DEVICE:
      return { ...state, ...INITIAL_STATE };
    default:
     return state;
  }
};
