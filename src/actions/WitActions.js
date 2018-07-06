import Tts from 'react-native-tts';
import stringSimilarity from 'string-similarity';
import { AsyncStorage } from 'react-native';
import {
  RESPONSE_OK,
  RESPONSE_ERROR
} from './types';
import { modiffyValue } from './UbidotsActions';

export const callWitAi = (query) => {

  return (dispatch) => {
    AsyncStorage.getItem('WITKEY').then((key) => {
      fetch('https://api.wit.ai/message?v=20180613&q=' + query, {
      cache: 'no-cache',
      credentials: 'same-origin',
      // 4VXH37FVRNHMD2U5RMRQZUJS6XDR5MCT
      headers: {
        Authorization: 'Bearer ' + key,
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    })
    .then(response => response.json())// parses response to JSON
     .then(data => handleResponse(data, dispatch));
    });
  };
};

const handleResponse = (response, dispatch) => {
  if (Object.prototype.hasOwnProperty.call(response.entities, 'electrical_state')
   && Object.prototype.hasOwnProperty.call(response.entities, 'home_area')) {
     //checkIfDevice exists
     console.log(response.entities.home_area[0].value);
    checkDevice(response.entities.home_area[0].value).then((bestMatch) => {
      AsyncStorage.getItem(bestMatch.target).then((item) => {
        console.log(bestMatch);
        item = JSON.parse(item);
        if(bestMatch.rating > 0.65){
          //Call Ubidots
          const state = response.entities.electrical_state[0].value === 'on' ? 1 : 0;
          modiffyValue(item.pin, state);//If command is 'on' send 1 if not send 0
          //Dispatch response
          const payload = 'Turning ' + response.entities.electrical_state[0].value + ' the lights, sir';
          dispatch({ type: RESPONSE_OK, payload });
          Tts.speak(payload);
        } else {
          deviceDoesntExist(dispatch);
        }
      })
    })

  } else {
    deviceDoesntExist(dispatch);
  }
};

const deviceDoesntExist = (dispatch) => {
  const payload =
   'Ups, I dont have that device in my records, to register it, please go to the devices tab, sir';
  Tts.speak(payload);
  dispatch({
    type: RESPONSE_ERROR,
    payload
   });
}

async function checkDevice(area){
  console.log('called');
  const devices = [];
  const keys = await AsyncStorage.getAllKeys();
  console.log(keys);
  for (const key of keys) {
    if (key !== 'UBIDOTSKEY' && key !== 'WITKEY') {
      let device = await AsyncStorage.getItem(key);
      device = JSON.parse(device);
      devices.push(device.toString());
      console.log(devices);
    }
  }
  console.log(area);
  return stringSimilarity.findBestMatch(area.toString(), keys).bestMatch;
};
