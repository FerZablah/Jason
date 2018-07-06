
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from './Button';

const Header = ({ text }) => {
  const { textStyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
      <View style={{ flex: 0, backgroundColor: 'red' }} >
      <Button
        style={{ flex: 1 }}
        uri={require('../../img/menuIcon.png')}
      />
      </View>

      <View style={{ flex: 1, backgroundColor: 'yellow', justifyContent: 'space-around' }}>
        <Text style={textStyle}> {text} </Text>
      </View>


    </View>
  );
};

const styles = {
  viewStyle: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    elevation: 5,
    position: 'relative'
  },
  textStyle: {
     fontSize: 20,
     flex: 1
  }
};

export { Header };
