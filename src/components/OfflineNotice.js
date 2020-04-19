import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
import {Colors} from '../styles/colors';
import {useSelector} from 'react-redux';

const OfflineNotice = () => {
  const connected = useSelector(state => state.netinfo.internetReachable);

  if (connected) {
    return null;
  }

  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
};

export default OfflineNotice;

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: Colors.red,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    //position: 'absolute',
    //top: 0,
    //borderTopRightRadius: 30,
    //borderTopLeftRadius: 30,
    //zIndex: 500,
  },
  offlineText: {
    color: '#fff',
  },
});
