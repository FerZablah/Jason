import { AsyncStorage, Alert } from 'react-native';
import {
  INPUT_CHANGED
} from '../actions/types';
import I18n from '../translation/i18n';

export const onInputChanged = (key, payload) => {
  return ({ type: INPUT_CHANGED, key, payload });
};

export const onSaveKeys = (ubidotsKey) => async(dispatch) => {
  AsyncStorage.setItem('UBIDOTSKEY', ubidotsKey).then(() => {
      Alert.alert(
      I18n.t('SAVEDKEYTITLE'),
      I18n.t('SAVEDKEYMESSAGE'),
      [
        { text: 'OK' }
      ],
      { cancelable: false }
    );
  }).catch((e) => {
    console.log(e);
  });
};
