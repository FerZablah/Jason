import {
  INPUT_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  ubidotsInput: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INPUT_CHANGED:
      return { ...state, [action.key]: action.payload };
    default:
      return { ...state };
  }
};
