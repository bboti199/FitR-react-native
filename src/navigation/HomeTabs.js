import React from 'react';
import {StyleSheet} from 'react-native';

import RoutineScreen from '../screens/tabs/RoutineScreen';
import ExercisesScreen from '../screens/tabs/ExercisesScreen';
import ProgressScreen from '../screens/tabs/ProgressScreen';
import WorkoutLogScreen from '../screens/tabs/WorkoutLogScreen';

// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AnimatedTabBar from '@gorhom/animated-tabbar';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {Colors} from '../styles/colors';

const Tab = createBottomTabNavigator();

const tabs = {
  Routines: {
    labelStyle: {
      color: Colors.fgPrimary,
    },
    icon: {
      component: (
        <Ionicons name="ios-list" color={Colors.fgPrimary} size={22} />
      ),
      activeColor: 'rgba(240, 245, 249, 1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: '#363636',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Exercises: {
    labelStyle: {
      color: Colors.fgPrimary,
    },
    icon: {
      component: (
        <Ionicons name="md-fitness" color={Colors.fgPrimary} size={22} />
      ),
      activeColor: 'rgba(240, 245, 249, 1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: '#363636',
      inactiveColor: 'rgba(247,215,243,0)',
    },
  },
  Progress: {
    labelStyle: {
      color: Colors.fgPrimary,
    },
    icon: {
      component: (
        <Ionicons name="ios-trending-up" color={Colors.fgPrimary} size={22} />
      ),
      activeColor: 'rgba(240, 245, 249, 1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: '#363636',
      inactiveColor: 'rgba(251,239,211,0)',
    },
  },
  Logs: {
    labelStyle: {
      color: Colors.fgPrimary,
    },
    icon: {
      component: (
        <Ionicons name="ios-flame" color={Colors.fgPrimary} size={22} />
      ),
      activeColor: 'rgba(240, 245, 249, 1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: '#363636',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
};

export const BottomTabs = () => (
  <Tab.Navigator
    backBehavior="initialRoute"
    initialRouteName="Routines"
    tabBar={props => (
      <AnimatedTabBar style={styles.tabBar} tabs={tabs} {...props} />
    )}>
    <Tab.Screen name="Routines" component={RoutineScreen} />
    <Tab.Screen name="Exercises" component={ExercisesScreen} />
    <Tab.Screen name="Progress" component={ProgressScreen} />
    <Tab.Screen name="Logs" component={WorkoutLogScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#101010',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
  },
});

// const Tab = createMaterialBottomTabNavigator();

// export const BottomTabs = () => (
//   <Tab.Navigator
//     initialRouteName="Routines"
//     backBehavior="initialRoute"
//     sceneAnimationEnabled={false}
//     style={styles.navStyle}
//     barStyle={styles.barStyle}>
//     <Tab.Screen
//       name="Routines"
//       component={RoutineScreen}
//       options={{
//         tabBarIcon: ({color}) => (
//           <Ionicons name="ios-list" color={color} size={26} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="Exercises"
//       component={ExercisesScreen}
//       options={{
//         tabBarIcon: ({color}) => (
//           <Ionicons name="md-fitness" color={color} size={26} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="Progress"
//       component={ProgressScreen}
//       options={{
//         tabBarIcon: ({color}) => (
//           <Ionicons name="ios-trending-up" color={color} size={26} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="Logs"
//       component={WorkoutLogScreen}
//       options={{
//         tabBarIcon: ({color}) => (
//           <Ionicons name="ios-flame" color={color} size={26} />
//         ),
//       }}
//     />
//   </Tab.Navigator>
// );

// const styles = StyleSheet.create({
//   barStyle: {
//     backgroundColor: '#101010',
//     borderTopLeftRadius: 45,
//     borderTopRightRadius: 45,
//     borderColor: 'transparent',
//     overflow: 'hidden',
//     paddingVertical: 10,
//   },
//   navStyle: {
//     backgroundColor: Colors.bgPrimary,
//   },
// });
