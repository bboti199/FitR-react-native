import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Headline} from 'react-native-paper';
import {Colors} from '../../styles/colors';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Headline>Profile Screen</Headline>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgPrimary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
