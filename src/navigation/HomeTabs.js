import React from 'react';
import {StyleSheet} from 'react-native';

import RoutineScreen from '../screens/tabs/RoutineScreen';
import ExercisesScreen from '../screens/tabs/ExercisesScreen';
import ProgressScreen from '../screens/tabs/ProgressScreen';
import WorkoutLogScreen from '../screens/tabs/WorkoutLogScreen';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {Colors} from '../styles/colors';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = () => (
  <Tab.Navigator
    initialRouteName="Routines"
    backBehavior="initialRoute"
    sceneAnimationEnabled={false}
    style={styles.navStyle}
    barStyle={styles.barStyle}>
    <Tab.Screen
      name="Routines"
      component={RoutineScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="ios-list" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Exercises"
      component={ExercisesScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="md-fitness" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Progress"
      component={ProgressScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="ios-trending-up" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Logs"
      component={WorkoutLogScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="ios-flame" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#101010',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderColor: 'transparent',
    overflow: 'hidden',
    paddingVertical: 10,
  },
  navStyle: {
    backgroundColor: Colors.bgPrimary,
  },
});
