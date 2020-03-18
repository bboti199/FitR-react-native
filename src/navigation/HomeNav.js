import React from 'react';
import {HomeStack} from './HomeStack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../components/navigation/DrawerContent';

import ProfileScreen from '../screens/other/ProfileScreen';
import SettingsScreen from '../screens/other/SettingsScreen';

const Drawer = createDrawerNavigator();

export const HomeNavigation = () => (
  <Drawer.Navigator
    drawerContent={({navigation}) => <DrawerContent navigation={navigation} />}
    initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeStack} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
  </Drawer.Navigator>
);
