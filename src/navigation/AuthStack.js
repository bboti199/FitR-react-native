import React from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator screenOptions={{header: () => null}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);
