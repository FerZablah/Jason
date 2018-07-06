import { combineReducers } from 'redux';
import RecReducer from './RecReducer';
import WitReducer from './WitReducer';
import SaveDevicesReducer from './SaveDevicesReducer';
import GetDevicesReducer from './GetDevicesReducer';
import SettingsReducer from './SettingsReducer';

export default combineReducers({
  recognition: RecReducer,
  wit_ai: WitReducer,
  devices: SaveDevicesReducer,
  getDevices: GetDevicesReducer,
  settings: SettingsReducer
});
