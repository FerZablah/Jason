import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderButton = ({ onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle} >
      <Icon name={icon} size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.0)'
  }
};

export { HeaderButton };
