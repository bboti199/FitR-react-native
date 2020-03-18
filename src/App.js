import React, {useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {setUser} from './redux/auth/actions';
import {setNetworkState} from './redux/netinfo/actions';

import auth from '@react-native-firebase/auth';

import NetInfo from '@react-native-community/netinfo';

import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './navigation/AuthStack';
import {HomeNavigation} from './navigation/HomeNav';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);

  const onAuthStateChanged = user => {
    dispatch(setUser(user));
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(
        setNetworkState({
          connected: state.isConnected,
          internetReachable: state.isInternetReachable,
          details: state.type,
        }),
      );
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isAuth ? <HomeNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
