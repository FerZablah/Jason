import { AsyncStorage, Alert } from 'react-native';
import {
  INPUT_CHANGED
} from '../actions/types';

export const onInputChanged = (key, payload) => {
  return ({ type: INPUT_CHANGED, key, payload });
};

export const onSaveKeys = (witKey, ubidotsKey) => async(dispatch) => {
  console.log('Aqui');
  console.log(ubidotsKey);
  AsyncStorage.setItem('UBIDOTSKEY', ubidotsKey).then(() => {
    console.log('llegoaubi');
    AsyncStorage.setItem('WITKEY', witKey).then(() => {
      Alert.alert(
      'Keys Saved!',
      'All data has been saved',
      [
        { text: 'OK' }
      ],
      { cancelable: false }
    );
    });
  }).catch((e) => {
    console.log(e);
  });
};
