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
  key: 'exercise',
  storage: AsyncStorage,
};

const logPersistConfig = {
  key: 'log',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  exercises: persistReducer(exercisePersistConfig, exercise),
  routines: routine,
  netinfo,
  logs: persistReducer(logPersistConfig, logs),
});

export default rootReducer;
