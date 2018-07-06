import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

class HUDAnimation extends Component {
  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    //this.animation.play(30, 120);
  }

  render() {
    return (
      <View style={{ width: 500, flex: 1 }} >
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{ flex: 1 }}
          source={require('./data.json')}
        />
      </View>
    );
  }
}

export default HUDAnimation;
