import {LogTypes} from './types';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

export const fetchLogs = () => async dispatch => {
  dispatch({type: LogTypes.FETCH_LOGS_START});
  try {
    const token = (await auth().currentUser.getIdTokenResult()).token;

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const res = await axios.get('/api/logs', config);

    dispatch({type: LogTypes.FETCH_LOGS_SUCCESS, payload: res.data.data});
  } catch (error) {
    if (!error.response) {
      dispatch({
        type: LogTypes.FETCH_LOGS_ERROR,
        payload: 'Can not reach backend',
      });
    } else {
      dispatch({
        type: LogTypes.FETCH_LOGS_ERROR,
        payload: error.response.data.error,
      });
    }
  }
};

export const createLog = routineId => async dispatch => {
  dispatch({type: LogTypes.CREATE_LOG_START});
  try {
    const token = (await auth().currentUser.getIdTokenResult()).token;

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const data = {
      workout: routineId,
      completed: true,
    };

    await axios.post('/api/logs', data, config);

    dispatch({type: LogTypes.CREATE_LOG_SUCCESS});
  } catch (error) {
    if (!error.response) {
      dispatch({
        type: LogTypes.CREATE_LOG_ERROR,
        payload: 'Can not reach backend',
      });
    } else {
      dispatch({
        type: LogTypes.CREATE_LOG_ERROR,
        payload: error.response.data.error,
      });
    }
  }
};
