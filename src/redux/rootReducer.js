import {combineReducers} from 'redux';
import {AsyncStorage} from 'react-native';
import {persistReducer} from 'redux-persist';
import auth from './auth/reducer';
import exercise from './exercise/reducer';
import routine from './routine/reducer';
import netinfo from './netinfo/reducer';
import logs from './logs/reducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const exercisePersistConfig = {
  key: 'exercises',
  storage: AsyncStorage,
};

const routinePersistConfig = {
  key: 'routines',
  storage: AsyncStorage,
};

const logPersistConfig = {
  key: 'logs',
  storage: AsyncStorage,
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  exercises: persistReducer(exercisePersistConfig, exercise),
  routines: persistReducer(routinePersistConfig, routine),
  netinfo,
  logs: persistReducer(logPersistConfig, logs),
});
