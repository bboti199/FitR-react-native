import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Text} from 'react-native-paper';

import {Colors} from '../../styles/colors';

const {width, height} = Dimensions.get('screen');

const ProgressScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Progress Screen</Text>
    </View>
  );
};

export default ProgressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
