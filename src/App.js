import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import ReduxThunk from 'redux-thunk';
import Tts from 'react-native-tts';
import Devices from './components/Devices';
import NavigationService from './NavigationService';
import ModifyDevice from './components/ModifyDevice';
import reducers from './reducers';
import JasonListener from './components/JasonListener';
import Settings from './components/Settings';
import I18n from './translation/i18n';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
class App extends Component {

  componentWillMount() {
    Tts.voices().then(voices => {
      let setted = false;
      for (let i = 0; i < voices.length; i++) {
        if (!voices[i].notInstalled && !setted) {
          if (voices[i].id.includes('male') && !voices[i].id.includes('female')) {
            if (voices[i].language === I18n.t('STTLOCALE')) {
              console.log(voices[i]);
              setted = true;
              Tts.setDefaultVoice(voices[i].id);
            }
          }
        }
      }
    });
    /*Tts.getInitStatus().then(() => {
      Tts.setDefaultVoice('en-us-x-sfg#male_3-local');
    });*/
  }
  render() {
    return (
      <Provider store={store}>
        <RootDrawer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}

const RootDrawer = DrawerNavigator(
{
  [I18n.t('HOMETAB')]: {
    screen: ({ navigation }) => <JasonListener screenProps={{ rootNavigation: navigation }} />
  },
  [I18n.t('DEVICESTAB')]: {
    screen: StackNavigator(
        {
          Devices: {
            screen: ({ navigation }) => <Devices screenProps={{ rootNavigation: navigation }} />
          },
          ModifyDevice: {
            screen: ({ navigation }) =>
            <ModifyDevice screenProps={{ rootNavigation: navigation }} />
          }
        }, {
          headerMode: 'none'
        }
    )
  },
  [I18n.t('SETTINGSTAB')]: {
    screen: ({ navigation }) => <Settings screenProps={{ rootNavigation: navigation }} />
  }
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#6C7A89',
    }
  }
},
{
  headerMode: 'float'
}
);

export default App;
