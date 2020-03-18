import React from 'react';
import {StyleSheet} from 'react-native';

import RoutineScreen from '../screens/tabs/RoutineScreen';
import ExercisesScreen from '../screens/tabs/ExercisesScreen';
import ProgressScreen from '../screens/tabs/ProgressScreen';
import WorkoutLogScreen from '../screens/tabs/WorkoutLogScreen';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Colors} from '../styles/colors';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = () => (
  <Tab.Navigator initialRouteName="Routines" barStyle={styles.barStyle}>
    <Tab.Screen
      name="Routines"
      component={RoutineScreen}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialIcons name="bookmark" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Exercises"
      component={ExercisesScreen}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialIcons name="fitness-center" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Progress"
      component={ProgressScreen}
      options={{
        tabBarIcon: ({color}) => (
          <FontAwesome5 name="chart-bar" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Logs"
      component={WorkoutLogScreen}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialIcons name="whatshot" color={color} size={24} />
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: Colors.bgSecondary,
  },
});
