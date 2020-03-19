import {RoutineTypes} from './types';

const initialState = {
  routines: [],
  fetchError: null,
  deleteError: null,
  modified: false,
  fetching: false,
  creating: false,
  createFinished: false,
  createError: null,
};

export default function(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case RoutineTypes.ROUTINE_FETCH_START:
      return {
        ...state,
        fetching: true,
        deleteError: null,
        fetchError: null,
        createFinished: false,
      };
    case RoutineTypes.ROUTINE_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        modified: false,
        routines: payload,
      };
    case RoutineTypes.ROUTINE_FETCH_ERROR:
      return {
        ...state,
        fetching: false,
        modified: false,
        fetchError: payload,
      };
    case RoutineTypes.ROUTINE_DELETE_START:
      return {
        ...state,
        deleteError: null,
      };
    case RoutineTypes.ROUTINE_DELETE_SUCCESS:
      return {
        ...state,
        modified: true,
      };
    case RoutineTypes.ROUTINE_DELETE_ERROR:
      return {
        ...state,
        modified: false,
        fetchError: payload,
      };
    case RoutineTypes.ROUTINE_CREATE_START:
      return {
        ...state,
        creating: true,
      };
    case RoutineTypes.ROUTINE_CREATE_SUCCESS:
      return {
        ...state,
        modified: true,
        creating: false,
        createFinished: true,
      };
    case RoutineTypes.ROUTINE_CREATE_ERROR:
      return {
        ...state,
        modified: false,
        creating: false,
        createFinished: false,
        createEror: payload,
      };
    case RoutineTypes.CLEANUP:
      return initialState;
    default:
      return state;
  }
}
