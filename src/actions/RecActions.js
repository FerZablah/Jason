import Voice from 'react-native-voice';
import {
  RECOGNIZE_REQUESTED,
  RECOGNIZE_SPEECH,
  RECOGNIZE_SUCCESS,
  RECOGNIZE_ERROR,
  RECOGNIZE_STOP
} from '../actions/types';

export const recognizeSpeech = () => async (dispatch) => {
    dispatch({ type: RECOGNIZE_REQUESTED });
    try {
      await Voice.start('en-US');
    } catch (er) {
      console.log('_startRecognizingError');
      console.error(er);
    }
};

export const onRecognizeBegan = () => {
  return ({ type: RECOGNIZE_SPEECH });
};

export const stopRecognizer = () => async (dispatch) => {
  try {
    await Voice.stop();
    dispatch({ type: RECOGNIZE_STOP });
  } catch (err) {
    recognizedError(err);
  }
};

export const recognizedError = (err) => {
  return ({
      type: RECOGNIZE_ERROR,
      payload: err
  });
};

export const recognizedSuccess = (text) => {
  return ({
    type: RECOGNIZE_SUCCESS,
    payload: text
  });
};
