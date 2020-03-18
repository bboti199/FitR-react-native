import axios from 'axios';
import auth from '@react-native-firebase/auth';

import {RoutineTypes} from './types';

export const fetchRoutines = () => async dispatch => {
  dispatch({type: RoutineTypes.ROUTINE_FETCH_START});

  try {
    const token = (await auth().currentUser.getIdTokenResult()).token;

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const res = await axios.get('/api/routines', config);

    dispatch({
      type: RoutineTypes.ROUTINE_FETCH_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    if (!error.response) {
      dispatch({
        type: RoutineTypes.ROUTINE_FETCH_ERROR,
        payload: 'Can not reach backend',
      });
    } else {
      dispatch({
        type: RoutineTypes.ROUTINE_FETCH_ERROR,
        payload: error.response.data.error,
      });
    }
  }
};

export const deleteRoutine = id => async dispatch => {
  dispatch({type: RoutineTypes.ROUTINE_DELETE_START});

  try {
    const token = (await auth().currentUser.getIdTokenResult()).token;

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    await axios.delete(`/api/routines/${id}`, config);

    dispatch({type: RoutineTypes.ROUTINE_DELETE_SUCCESS});
  } catch (error) {
    if (!error.response) {
      dispatch({
        type: RoutineTypes.ROUTINE_DELETE_ERROR,
        payload: 'Can not reach backend',
      });
    } else {
      dispatch({
        type: RoutineTypes.ROUTINE_DELETE_ERROR,
        payload: error.response.data.error,
      });
    }
  }
};
