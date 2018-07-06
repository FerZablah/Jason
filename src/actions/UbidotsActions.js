import { AsyncStorage } from 'react-native';

export const modiffyValue = (pin, state) => {
AsyncStorage.getItem('UBIDOTSKEY').then((key) => {
  fetch('https://things.ubidots.com/api/v1.6/devices/ESP32/?token=' + key, {
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({ [pin]: state }),
  method: 'POST',
  mode: 'cors',
  redirect: 'follow',
  referrer: 'no-referrer',
})
.then(response => response.json())// parses response to JSON
 .then(data => console.log(data));
});
};
