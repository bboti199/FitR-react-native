import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {Colors} from '../../styles/colors';

const TextInput = ({
  onChangeText,
  onBlur,
  value,
  autoCompleteType,
  autoCapitalize,
  label,
  placeholder,
  errorMessage,
  secureTextEntry,
  ...props
}) => {
  return (
    <Input
      {...props}
      inputStyle={styles.inputStyle}
      inputContainerStyle={styles.inputContainerStyle}
      labelStyle={styles.labelStyle}
      placeholderTextColor={Colors.fgPrimary}
      errorStyle={styles.errorStyle}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      autoCapitalize={autoCapitalize}
      autoCompleteType={autoCompleteType}
      autoCorrect={false}
      label={label}
      placeholder={placeholder}
      errorMessage={errorMessage}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({
  inputStyle: {
    color: Colors.fgPrimary,
    fontFamily: 'NunitoSans-Regular',
    fontSize: 14,
    paddingVertical: 8,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 20,
    borderColor: Colors.fgPrimary,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  labelStyle: {
    fontFamily: 'NunitoSans-Light',
    marginLeft: 22,
    color: Colors.grey,
    fontWeight: '600',
    fontSize: 14,
  },
  errorStyle: {
    color: Colors.red,
    alignSelf: 'center',
    fontSize: 13,
  },
});
