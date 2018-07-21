import Tts from 'react-native-tts';
import stringSimilarity from 'string-similarity';
import { AsyncStorage } from 'react-native';
import {
  RESPONSE_OK,
  RESPONSE_ERROR
} from './types';
import { modiffyValue } from './UbidotsActions';
import I18n from '../translation/i18n';



export const callWitAi = (query) => {
    return (dispatch) => {
      AsyncStorage.getItem('UBIDOTSKEY').then((key) => {
        fetch('https://things.ubidots.com/api/v1.6/variables?token=' + key, {
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Host': 'things.ubidots.com',
          'content-type': 'application/json'
        },
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      })
      .then(response => response.json())// parses response to JSON
      .then(data => {
        console.log(data);
        if(data.detail){
          const payload = I18n.t('RECERROR');
          dispatch({ type: RESPONSE_ERROR, payload });
          Tts.speak(payload);
        } else{
            const key = I18n.t('WITAIKEY');
            fetch('https://api.wit.ai/message?v=20180613&q=' + query, {
            cache: 'no-cache',
            credentials: 'same-origin',
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
            .then(data => handleResponse(data, dispatch))
            .catch(error => {
              const payload = I18n.t('RECERROR');
              dispatch({ type: RESPONSE_ERROR, payload });
              Tts.speak(payload);
            });
          }
      })
      });
    };
};

const handleResponse = (response, dispatch) => {
  if(response.error){
    console.log(response);
    const payload = I18n.t('RECERROR');
    dispatch({ type: RESPONSE_ERROR, payload });
    Tts.speak(payload);
  }
  else{
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
            console.log(response.entities);
            const state = 0;
            if (response.entities.electrical_state[0].value === ('on') ||
                response.entities.electrical_state[0].value === ('Encender') ||
                response.entities.electrical_state[0].value === ('encender')){
                  state = 1;
            }
            modiffyValue(item.pin, state);//If command is 'on' send 1 if not send 0
            //Dispatch response
            const payload = '';
            if (I18n.t('STTLOCALE') === 'en-US') {
              payload = 'Turning ' + response.entities.electrical_state[0].value + ' the lights, sir';
            }
            else {
              const accion = state === 1 ? 'Encendiendo' : 'Apagando';
              payload = accion + ' las luces, señor';
            }
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
  }

};

const deviceDoesntExist = (dispatch) => {
  const payload =
   I18n.t('UNEXISTANTDEVICERESPONSE');
  Tts.speak(payload);
  dispatch({
    type: RESPONSE_ERROR,
    payload
   });
}

async function checkDevice(area){
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
