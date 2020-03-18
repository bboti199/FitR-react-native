import {ExerciseTypes} from './types';

const initialState = {
  exercises: [],
  fetching: false,
  modified: false,
  modalLoading: false,
  fetchError: null,
  createError: null,
  deleteError: null,
  updateError: null,
  finishedCreate: false,
  finishedUpdate: false,
};

export default function(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case ExerciseTypes.EXERCISE_FETCH_START:
      return {
        ...state,
        fetching: true,
        fetchError: null,
        finishedCreate: false,
      };

    case ExerciseTypes.EXERCISE_FETCH_SUCCESS:
      return {
        ...state,
        exercises: payload,
        fetching: false,
        erorr: null,
        modified: false,
      };
    case ExerciseTypes.EXERCISE_FETCH_ERROR:
      return {
        ...state,
        exercises: [],
        fetching: false,
        fetchError: payload,
        modified: false,
      };
    case ExerciseTypes.EXERCISE_DELETE_START:
      return {
        ...state,
        deleteError: null,
      };
    case ExerciseTypes.EXERCISE_DELETE_SUCCESS:
      return {
        ...state,
        deleteError: null,
        modified: true,
      };
    case ExerciseTypes.EXERCISE_DELETE_ERROR:
      return {
        ...state,
        deleteError: payload,
      };
    case ExerciseTypes.EXERCISE_CREATE_START:
      return {
        ...state,
        modalLoading: true,
        createError: null,
        finishedCreate: false,
      };
    case ExerciseTypes.EXERCISE_CREATE_SUCCESS:
      return {
        ...state,
        modalLoading: false,
        finishedCreate: true,
        createError: null,
        modified: true,
      };
    case ExerciseTypes.EXERCISE_CREATE_ERROR:
      return {
        ...state,
        modalLoading: false,
        finishedCreate: false,
        createError: payload,
      };
    case ExerciseTypes.CLEANUP:
      return initialState;
    default:
      return state;
  }
}
