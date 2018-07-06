import Reactotron, { asyncStorage } from 'reactotron-react-native';
import { AppRegistry } from 'react-native';
import App from './src/App';

Reactotron
  .configure({ host: '192.168.1.88' }) // controls connection & communication settings
  .useReactNative(asyncStorage()) // add all built-in react native plugins
  .connect(); // let's connect!

AppRegistry.registerComponent('Jason', () => App);
