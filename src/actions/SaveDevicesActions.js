import { AsyncStorage } from 'react-native';
import NavigationService from '../NavigationService.js';
import {
  NAME_CHANGED,
  PIN_CHANGED,
  SAVE_DEVICE,
  SAVE_DEVICE_REQUEST,
  DEVICE_FILLED,
  DELETE_DEVICE
} from '../actions/types';


export const onNameChanged = (name) => {
  return ({ type: NAME_CHANGED, payload: name });
};

export const onPinChanged = (pin) => {
  return ({ type: PIN_CHANGED, payload: pin });
};

export const fillDeviceData = (device) => {
  return ({ type: DEVICE_FILLED, payload: device });
};


export const onSaveDevice = (device) => async (dispatch) => {
    dispatch({ type: SAVE_DEVICE_REQUEST });
    AsyncStorage.removeItem(device.name).then(() => {
      AsyncStorage.setItem(device.name, JSON.stringify(device)).then(() => {
        dispatch({ type: SAVE_DEVICE });
        NavigationService.refresh();
        NavigationService.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
    });
};

export const onDeleteDevice = (device) => async (dispatch) => {
  AsyncStorage.removeItem(device.name).then(() => {
    dispatch({ type: DELETE_DEVICE });
    NavigationService.refresh();
    NavigationService.goBack();
  })
  .catch((error) => {
    console.log(error);
  });
};
