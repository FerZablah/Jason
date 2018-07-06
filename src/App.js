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

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
class App extends Component {

  componentWillMount() {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultVoice('en-us-x-sfg#male_3-local');
    });
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
  Home: {
    screen: ({ navigation }) => <JasonListener screenProps={{ rootNavigation: navigation }} />
  },
  Devices: {
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
  Settings: {
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
