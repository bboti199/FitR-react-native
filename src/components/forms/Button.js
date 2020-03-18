import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Button as ElementButton} from 'react-native-elements';
import {Colors} from '../../styles/colors';

const Button = ({title, loading, disabled, ...props}) => {
  return (
    <ElementButton
      title={title}
      loading={loading}
      disabled={disabled}
      titleStyle={styles.titleStyle}
      buttonStyle={styles.buttonStyle}
      {...props}
    />
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    width: Dimensions.get('screen').width * 0.3,
    backgroundColor: Colors.bluePrimary,
    marginVertical: 5,
    paddingVertical: 10,
  },
  titleStyle: {
    color: Colors.fgPrimary,
    paddingHorizontal: 20,
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 16,
  },
});
