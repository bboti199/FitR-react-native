import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Headline} from 'react-native-paper';
import {Colors} from '../../styles/colors';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Headline>Settings Screen</Headline>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgPrimary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
