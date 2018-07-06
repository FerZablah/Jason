import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const Button = ({ onPress, uri }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle} >
      <Image
        source={uri}
        style={styles.imageStyle}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );
};

const styles = {
  imageStyle: {
    height: 100,
    width: 100
  },
  buttonStyle: {
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
    marginLeft: 5,
    marginRight: 5,
    height: 100,
    width: 100
  }
};

export { Button };
