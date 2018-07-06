import { AsyncStorage } from 'react-native';
import { GET_DEVICES_SUCCESS, CLEAR } from './types';

export const onGetDevice = () => async (dispatch) => {
        AsyncStorage.getAllKeys().then(keys => {
          keys.forEach((key) => {
            if (key !== 'UBIDOTSKEY' && key !== 'WITKEY' && key !== 'FIRSTTIME') {
              getDevice(dispatch, key);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
};

const getDevice = (dispatch, key) => {
  AsyncStorage.getItem(key).then((item) => {
    const device = JSON.parse(item);
    dispatch({ type: GET_DEVICES_SUCCESS, payload: device });
  })
  .catch((error) => {
    console.log(error);
  });
};

export const onClear = () => {
    return ({ type: CLEAR });
};
