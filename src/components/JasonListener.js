import React, { Component } from 'react';
import { View, Text, Alert, AsyncStorage, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { Button } from './common/Button';
import { HeaderButton } from './common/HeaderButton';
import HUDAnimation from '../HUDAnimation';
import I18n from '../translation/i18n';
import {
  recognizeSpeech,
  recognizedSuccess,
  recognizedError,
  stopRecognizer,
  onRecognizeBegan,
  callWitAi } from '../actions';

class JasonListener extends Component {

componentDidMount() {
  AsyncStorage.getAllKeys().then((keys) => {
    if (keys.length === 0) {
      const message = (I18n.t('INITIALMESSAGE')).toString();
      const title = (I18n.t('INITIALMESSAGETITLE')).toString();
      const okButton = (I18n.t('ALERTBUTTON')).toString();
      const webButton = (I18n.t('WEBBUTTON')).toString();
      Alert.alert(
      title,
       message,
      [
        { text: okButton, onPress: () => AsyncStorage.setItem('FIRSTTIME', 'true') },
        { text: webButton, onPress: () => Linking.openURL('https://www.hackster.io/zablahdeveloper/voice-controlled-lights-from-anywhere-e22792') }
      ],
      { cancelable: false }
    );
    }
  });
}
  onSpeechStart() {
    console.log('SpeechStarted');
    this.props.onRecognizeBegan();
  }

  onSpeechRecognized() {
    console.log('Speech Recognized');
  }

  onSpeechEnd() {
    console.log('SpeechEnd');
  }

  onSpeechError(e) {
    console.log('Error in Speech');
    this.props.recognizedError(e);
  }

  onSpeechResults(e) {
    console.log('Speech Results');
    this.props.recognizedSuccess(e);
    this.props.callWitAi(this.props.text);
  }
  getMicIcon() {
    const { loading, hearing } = this.props;
    if (!loading && !hearing) {
      return require('../img/MicOff.png');
    } else if (loading && !hearing) {
      console.log('CARGANDO');
      return require('../img/MicLoading.png');
    } else if (!loading && hearing) {
      console.log('READY');
      return require('../img/MicListening.png');
  }
}
  startRecognizing(e) {
    Tts.stop();
    if (this.props.hearing === false) {
      this.props.recognizeSpeech(e);
    } else {
      this.props.stopRecognizer();
    }
  }

  capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    const { containerStyle,
            linearGradient,
            textStyle,
            HUDStyle,
            buttonStyle,
            jasonResponseContainer,
            buttonContainer,
            textContainer,
            headerTextStyle
           } = styles;
    return (

      <LinearGradient colors={['#004e92', '#000428']} style={linearGradient}>

        <Header
          outerContainerStyles={{ borderBottomWidth: 0, backgroundColor: '#6C7A89', height: 60 }}
          leftComponent={
            <HeaderButton
              icon={'md-menu'}
              onPress={() => this.props.screenProps.rootNavigation.openDrawer()}
            />
          }
          centerComponent={<Text style={headerTextStyle}> Jason </Text>}
        />

        <View style={containerStyle}>

          <View style={{ flex: 2, marginTop: 30 }} >
            <HUDAnimation style={HUDStyle} />
          </View>

          <View style={jasonResponseContainer}>
            <Text style={textStyle}>
             {this.props.response}
            </Text>
          </View>

          <View style={buttonContainer}>
          <Button
            onPress={this.startRecognizing.bind(this)}
            uri={this.getMicIcon()}
            style={buttonStyle}
          />
          </View>

          <View style={textContainer}>
            <Text
              style={textStyle}
            > {this.capitalizeString(this.props.text)} </Text>
          </View>
        </View>

      </LinearGradient>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  jasonResponseContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 60
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 1,
    paddingRight: 1
  },
  textStyle: {
    fontSize: 26,
    color: 'white',
    textAlign: 'center'
  },
  HUDStyle: {
    flex: 2
  },
  headerTextStyle: {
    fontSize: 24,
    color: 'white'
  }
};

const mapStateToProps = state => {
  return {
      hearing: state.recognition.hearing,
      text: state.recognition.text,
      response: state.wit_ai.response,
      loading: state.recognition.loading
  };
};

export default connect(mapStateToProps, {
  recognizeSpeech,
  recognizedSuccess,
  recognizedError,
  stopRecognizer,
  onRecognizeBegan,
  callWitAi
})(JasonListener);
