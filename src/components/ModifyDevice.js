import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { Header, Input, Icon, Button } from 'react-native-elements';
import { HeaderButton } from './common/HeaderButton';
import {
  onNameChanged,
  onPinChanged,
  onSaveDevice,
  fillDeviceData,
  onDeleteDevice
} from '../actions/SaveDevicesActions';

class ModifyDevice extends Component {

  componentWillMount() {
    const { deviceToModify } = this.props.screenProps.rootNavigation.state.params;
    if (deviceToModify) {
      this.props.fillDeviceData(deviceToModify[0]);
    }
  }
  createPickerItems() {
    const nums = [];
    for (let i = 0; i < 10; i++) {
      nums[i] = i;
    }
    return nums;
  }

  saveDevice() {
    const device = {
      name: this.props.name,
      icon: 'light-bulb',
      pin: parseInt(this.props.pin)
    };
    this.props.onSaveDevice(device);
  }

  deleteDevice() {
    const device = {
      name: this.props.name,
      icon: 'light-bulb',
      pin: parseInt(this.props.pin)
    };
    this.props.onDeleteDevice(device);
  }

  render() {
    return (
      <LinearGradient colors={['#004e92', '#000428']} style={styles.linearGradient}>
        <View>
            <Header
              outerContainerStyles={styles.headerContainer}
              leftComponent={
                <HeaderButton
                  icon={'md-arrow-round-back'}
                  onPress={() => this.props.screenProps.rootNavigation.goBack()}
                />
              }
              centerComponent={
                <Text style={styles.headerTextStyle}>
                  {this.props.name === '' ? 'New Device' : this.props.name}
                </Text>
              }
            />
            <View style={styles.topContainer}>
              <Input
                placeholder='Bedroom Lights'
                label='Device Name'
                labelStyle={{ color: 'white' }}
                inputContainerStyle={styles.inputContainer}
                containerStyle={{ margin: 5 }}
                inputStyle={{ color: 'white' }}
                placeholderTextColor='rgba(255, 255, 255, 0.2)'
                onChangeText={(text) => this.props.onNameChanged(text)}
                value={this.props.name}
              />
              <Icon
                name='light-bulb'
                type='entypo'
                color='white'
                iconStyle={styles.customIcon}
                style={{ marginLeft: 15 }}
                size={50}
              />
            </View>

            <View>
            <Text style={styles.espPinText}> ESP32 I/O Pin </Text>
            <Picker
              style={{ backgroundColor: 'white' }}
              selectedValue={this.props.pin}
              onValueChange={pin => this.props.onPinChanged(pin)}
            >
              { (this.createPickerItems()).map((object, i) => {
                return <Picker.Item label={i.toString()} value={i.toString()} key={i} />;
              }) }

            </Picker>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title='Save'
              containerViewStyle={{ height: 100 }}
              buttonStyle={{
                height: 60,
                backgroundColor: 'green'
              }}
              onPress={this.saveDevice.bind(this)}
            />
            <Button
              title='Delete'
              containerViewStyle={{ height: 100 }}
              buttonStyle={{
                height: 60,
                backgroundColor: 'red'
              }}
              onPress={this.deleteDevice.bind(this)}
            />
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
  headerContainer: {
    borderBottomWidth: 0,
    backgroundColor: '#6C7A89',
    height: 60
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    margin: 10
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10
  },
  customIcon: {
    marginLeft: 15
  },
  espPinText: {
    color: 'white',
    fontWeight: 'bold',
    margin: 5
  },
  pickerContainer: {
    height: 300,
    justifyContent: 'space-around'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
};

const mapStateToProps = state => {
  return {
      name: state.devices.name,
      pin: state.devices.pin,
      icon: state.devices.icon
  };
};

export default connect(mapStateToProps,
  {
    onNameChanged,
    onPinChanged,
    onSaveDevice,
    fillDeviceData,
    onDeleteDevice
  })(ModifyDevice);
