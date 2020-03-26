import React from 'react';
import {BottomTabs} from './HomeTabs';
import CreateRoutineScreen from '../screens/other/CreateRoutineScreen';
import ExerciseSelectionScreen from '../screens/other/ExerciseSelectionScreen';
import WorkoutScreen from '../screens/other/WorkoutScreen';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import ProgressInfoScreen from '../screens/other/ProgressInfoScreen';

const Stack = createStackNavigator();

export const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      header: () => null,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
    <Stack.Screen name="Home" component={BottomTabs} />
    <Stack.Screen name="CreateRoutine" component={CreateRoutineScreen} />
    <Stack.Screen
      name="ExerciseSelection"
      component={ExerciseSelectionScreen}
    />
    <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
    <Stack.Screen name="ProgressInfoScreen" component={ProgressInfoScreen} />
  </Stack.Navigator>
);
