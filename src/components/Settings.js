import React, { Component } from 'react';
import { Text, View, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { HeaderButton } from './common/HeaderButton';
import { onInputChanged, onSaveKeys } from '../actions/SettingsActions';
import I18n from '../translation/i18n';

class Settings extends Component {
  render() {
    return (
      <LinearGradient colors={['#004e92', '#000428']} style={styles.linearGradient}>
        <Header
          outerContainerStyles={{ borderBottomWidth: 0, backgroundColor: '#6C7A89', height: 60 }}
          leftComponent={
            <HeaderButton
              icon={'md-menu'}
              onPress={() => this.props.screenProps.rootNavigation.openDrawer()}
            />
          }
          centerComponent={<Text style={styles.headerTextStyle}> Settings </Text>}
        />
        <View style={styles.topContainer}>
          <Input
            placeholder={I18n.t('KEYPLACEHOLDER')}
            label={I18n.t('UBIDOTSKEYLABEL')}
            labelStyle={{ color: 'white' }}
            containerStyle={{ margin: 5 }}
            inputStyle={{ color: 'white' }}
            placeholderTextColor='rgba(255, 255, 255, 0.2)'
            inputContainerStyle={styles.inputContainer}
            onChangeText={(text) => this.props.onInputChanged('ubidotsInput', text)}
            value={this.props.ubidotsInput}
          />
        </View>
        <Button
          title={I18n.t('SAVE')}
          containerStyle={{ borderWidth: 2 }}
          buttonStyle={{
            height: 60,
            backgroundColor: 'green'
          }}
          onPress={() => {
            Keyboard.dismiss();
            this.props.onSaveKeys(this.props.ubidotsInput);
          }}
        />
      </LinearGradient>
    );
  }
}

const styles = {
  linearGradient: {
    flex: 1,
    paddingLeft: 1,
    paddingRight: 1,
    justifyContent: 'flex-start'
  },
  headerTextStyle: {
    fontSize: 24,
    color: 'white'
  },
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10
  },
};


const mapStateToProps = state => {
  return {
      ubidotsInput: state.settings.ubidotsInput
  };
};
export default connect(mapStateToProps, { onInputChanged, onSaveKeys })(Settings);
