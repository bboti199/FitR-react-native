import {RoutineTypes} from './types';

const initialState = {
  routines: [],
  fetchError: null,
  deleteError: null,
  modified: false,
  fetching: false,
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
    case RoutineTypes.CLEANUP:
      return initialState;
    default:
      return state;
  }
}
