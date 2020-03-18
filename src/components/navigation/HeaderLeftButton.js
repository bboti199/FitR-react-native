import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const HeaderLeftButton = ({size, color, style, buttonStyle}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()}
      style={{...styles.container, style}}>
      <Feather name="menu" size={size} style={buttonStyle} />
    </TouchableOpacity>
  );
};

export default HeaderLeftButton;

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
});
