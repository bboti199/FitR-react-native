import React from 'react';
import {BottomTabs} from './HomeTabs';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={BottomTabs}
      options={{
        header: () => null,
      }}
    />
  </Stack.Navigator>
);
