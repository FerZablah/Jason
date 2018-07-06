import {
  RECOGNIZE_REQUESTED,
  RECOGNIZE_SPEECH,
  RECOGNIZE_SUCCESS,
  RECOGNIZE_ERROR,
  RECOGNIZE_STOP
} from '../actions/types';

const INITIAL_STATE = {
  hearing: false,
  text: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECOGNIZE_REQUESTED:
      return { ...state, hearing: false, loading: true };
    case RECOGNIZE_SPEECH:
      return { ...state, text: '', hearing: true, loading: false };
    case RECOGNIZE_SUCCESS:
      return { ...state, hearing: false, loading: false, text: action.payload.value[0] };
    case RECOGNIZE_STOP:
      return { ...state, hearing: false, loading: false };
    case RECOGNIZE_ERROR:
      console.log('REC_REDUCER_ERROR:');
      console.log(action.err);
      return { ...state, hearing: false, loading: false, text: '' };
    default:
     return state;
  }
};
