import {ExerciseTypes} from './types';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

export const fetchExercises = () => async dispatch => {
  dispatch({type: ExerciseTypes.EXERCISE_FETCH_START});

  try {
    const token = (await auth().currentUser.getIdTokenResult()).token;

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const res = await axios.get('/api/exercises', config);

    dispatch({
      type: ExerciseTypes.EXERCISE_FETCH_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    if (!error.response) {
      dispatch({
        type: ExerciseTypes.EXERCISE_FETCH_ERROR,
        payload: 'Can not reach backend',
      });
    } else {
      dispatch({
        type: ExerciseTypes.EXERCISE_FETCH_ERROR,
        payload: error.response.data.error,
      });
    }
  }
};

export const deleteExercise = id => async dispatch => {
  dispatch({type: ExerciseTypes.EXERCISE_DELETE_START});

  try {
    const token = (await auth().currentUser.getIdTokenResult()).token;

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    await axios.delete(`/api/exercises/${id}`, config);

    dispatch({type: ExerciseTypes.EXERCISE_DELETE_SUCCESS, payload: id});
  } catch (error) {
    if (!error.response) {
      dispatch({
        type: ExerciseTypes.EXERCISE_DELETE_ERROR,
        payload: 'Can not reach backend',
      });
    } else {
      dispatch({
        type: ExerciseTypes.EXERCISE_DELETE_ERROR,
        payload: error.response.data.error,
      });
    }
  }
};

export const addExercise = exerciseData => async dispatch => {
  dispatch({type: ExerciseTypes.EXERCISE_CREATE_START});

  try {
    const token = (await auth().currentUser.getIdTokenResult()).token;

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const res = await axios.post('/api/exercises', exerciseData, config);

    dispatch({
      type: ExerciseTypes.EXERCISE_CREATE_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    if (!error.response) {
      dispatch({
        type: ExerciseTypes.EXERCISE_CREATE_ERROR,
        payload: 'Can not reach backend',
      });
    } else {
      dispatch({
        type: ExerciseTypes.EXERCISE_CREATE_ERROR,
        payload: error.response.data.error,
      });
    }
  }
};
