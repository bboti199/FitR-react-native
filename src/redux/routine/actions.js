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

    const res = await axios.get('/api/v1/routine', config);

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

    await axios.delete(`/api/v1/routine/${id}`, config);

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

export const createRoutine = routineData => async dispatch => {
  dispatch({type: RoutineTypes.ROUTINE_CREATE_START});

  try {
    const token = (await auth().currentUser.getIdTokenResult()).token;

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    await axios.post('/api/v1/routine', routineData, config);

    dispatch({type: RoutineTypes.ROUTINE_CREATE_SUCCESS});
  } catch (error) {
    if (!error.response) {
      dispatch({
        type: RoutineTypes.ROUTINE_CREATE_ERROR,
        payload: 'Can not reach backend',
      });
    } else {
      dispatch({
        type: RoutineTypes.ROUTINE_CREATE_ERROR,
        payload: error.response.data.error,
      });
    }
  }
};

export const updateRoutine = (routineId, updateData) => async dispatch => {
  dispatch({type: RoutineTypes.ROUTINE_UPDATE_START});

  try {
    const token = (await auth().currentUser.getIdTokenResult()).token;

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    await axios.patch(`/api/v1/routine/${routineId}`, updateData, config);

    dispatch({type: RoutineTypes.ROUTINE_UPDATE_SUCCESS});
  } catch (error) {
    if (!error.response) {
      dispatch({
        type: RoutineTypes.ROUTINE_UPDATE_ERROR,
        payload: 'Can not reach backend',
      });
    } else {
      dispatch({
        type: RoutineTypes.ROUTINE_UPDATE_ERROR,
        payload: error.response.data.error,
      });
    }
  }
};

export const fetchChartData = (routineId, timePeriod) => async dispatch => {
  dispatch({type: RoutineTypes.FETCH_CHART_DATA_START});

  try {
    const token = (await auth().currentUser.getIdTokenResult()).token;

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const res = await axios.get(
      `/api/v1/routine/${routineId}/chart/${timePeriod}`,
      config,
    );

    dispatch({
      type: RoutineTypes.FETCH_CHART_DATA_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (!error.response) {
      dispatch({
        type: RoutineTypes.FETCH_CHART_DATA_ERROR,
        payload: 'Can not reach backend',
      });
    } else {
      dispatch({
        type: RoutineTypes.FETCH_CHART_DATA_ERROR,
        payload: error.response.data.error,
      });
    }
  }
};

export const fetchLatestLog = id => async dispatch => {
  dispatch({type: RoutineTypes.FETCH_LATEST_LOG_START});

  try {
    const token = (await auth().currentUser.getIdTokenResult()).token;

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const latestLog = await axios.get(`/api/v1/routine/${id}/history`, config);

    if (latestLog.data.count === 0) {
      dispatch({
        type: RoutineTypes.FETCH_LATEST_LOG_ERROR,
        payload: 'No logs found for routine',
      });
    } else {
      dispatch({
        type: RoutineTypes.FETCH_LATEST_LOG_SUCCESS,
        payload: latestLog.data.data[0],
      });
    }
  } catch (error) {
    if (!error.response) {
      dispatch({
        type: RoutineTypes.FETCH_LATEST_LOG_ERROR,
        payload: 'Can not reach backend',
      });
    } else {
      dispatch({
        type: RoutineTypes.FETCH_LATEST_LOG_ERROR,
        payload: error.response.data.error,
      });
    }
  }
};
