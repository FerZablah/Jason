import {
  RESPONSE_OK,
  INCOMPLETE_COMMAND,
  RESPONSE_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  response: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESPONSE_OK:
      return { ...state, response: action.payload };
    case INCOMPLETE_COMMAND:
      return { ...state, response: 'Sorry, could you repeat that?' };
    case RESPONSE_ERROR:
      return { ...state, response: action.payload };
    default:
      return { ...state };
  }
};
