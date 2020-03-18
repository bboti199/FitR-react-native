import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../redux/auth/actions';

import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../../styles/colors';

const DrawerContent = ({navigation, ...props}) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri: user.photoURL,
            }}
            size={75}
          />
          <Title style={styles.title}>{user.displayName}</Title>
          <Caption style={styles.caption}>{user.email}</Caption>
        </View>
        <Drawer.Section style={styles.drawerSection} title="Pages">
          <DrawerItem
            icon={({size}) => (
              <Feather name="home" size={size} color={Colors.fgPrimary} />
            )}
            label="Home"
            labelStyle={styles.labelText}
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
          <DrawerItem
            icon={({size}) => (
              <Feather name="user" size={size} color={Colors.fgPrimary} />
            )}
            label="Profile"
            labelStyle={styles.labelText}
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />
          <DrawerItem
            icon={({size}) => (
              <Feather name="settings" size={size} color={Colors.fgPrimary} />
            )}
            label="Settings"
            labelStyle={styles.labelText}
            onPress={() => {
              navigation.navigate('Settings');
            }}
          />
        </Drawer.Section>
      </View>
      <Drawer.Section style={styles.drawerBottom}>
        <DrawerItem
          icon={({size}) => (
            <Feather name="log-out" size={size} color={Colors.fgPrimary} />
          )}
          label="Sign Out"
          labelStyle={styles.labelText}
          onPress={() => {
            navigation.closeDrawer();
            dispatch(logout());
          }}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.bgSecondary,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    marginBottom: 20,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  labelText: {
    color: Colors.fgPrimary,
    fontFamily: 'NunitoSans-Regular',
  },
});
