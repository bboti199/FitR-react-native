import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WaveIndicator} from 'react-native-indicators';
import {Colors} from '../styles/colors';

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <WaveIndicator size={80} color={Colors.grey} />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bgPrimary,
  },
});
