import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text } from 'react-native';
import { Header, ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { HeaderButton } from './common/HeaderButton';
import { onGetDevice, onClear } from '../actions/GetDevicesActions';
import NavigationService from '../NavigationService.js';

class Devices extends Component {
  componentWillMount() {
    this.props.onClear();
    this.props.onGetDevice();
  }

  componentDidMount() {
  }
  refreshFunction(comp) {
    comp.props.onClear();
    comp.props.onGetDevice();
  }
  renderDevices() {
    console.log(this.props);
      return (
        <View>
          {this.props.devices.map((l) => (
            <ListItem
              key={l.name}
              leftIcon={
                <Icon
                  name={l.icon}
                  type={'entypo'}
                  color={'grey'}
                />}
              rightIcon={
                <Icon name='edit' />
              }
              title={l.name}
              subtitle={'Pin ' + l.pin}
              containerStyle={{ margin: 5 }}
              onPress={() => {
                const device = this.props.devices.filter(deviceObj => deviceObj.pin === l.pin);
                this.props.onClear();
                NavigationService.navigate('ModifyDevice', {
                  refresh: this.refreshFunction,
                  comp: this,
                  deviceToModify: device
                });
              }}

            />
          ))

        }
        </View>
      );
  }


  render() {
    return (
      <LinearGradient colors={['#004e92', '#000428']} style={styles.linearGradient}>
        <View>
        <Header
          outerContainerStyles={{ borderBottomWidth: 0, backgroundColor: '#6C7A89', height: 60 }}
          leftComponent={
            <HeaderButton
              icon={'md-menu'}
              onPress={() => this.props.screenProps.rootNavigation.openDrawer()}
            />
          }
          centerComponent={<Text style={styles.headerTextStyle}> Devices </Text>}
          rightComponent={
            <HeaderButton
              icon={'md-add'}
              onPress={() => NavigationService.navigate('ModifyDevice', {
                 refresh: this.refreshFunction, comp: this })}
            />
          }
        />
          <View>
            { this.renderDevices() }
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = {
  headerTextStyle: {
    fontSize: 24,
    color: 'white'
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 1,
    paddingRight: 1
  },
};

const mapStateToProps = state => {
  return {
      devices: state.getDevices.devices
  };
};

export default connect(mapStateToProps, { onGetDevice, onClear })(Devices);
