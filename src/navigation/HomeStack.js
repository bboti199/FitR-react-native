import React from 'react';
import {BottomTabs} from './HomeTabs';
import CreateRoutineScreen from '../screens/other/CreateRoutineScreen';
import ExerciseSelectionScreen from '../screens/other/ExerciseSelectionScreen';
import WorkoutScreen from '../screens/other/WorkoutScreen';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{header: () => null}}>
    <Stack.Screen name="Home" component={BottomTabs} />
    <Stack.Screen name="CreateRoutine" component={CreateRoutineScreen} />
    <Stack.Screen
      name="ExerciseSelection"
      component={ExerciseSelectionScreen}
    />
    <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
  </Stack.Navigator>
);
