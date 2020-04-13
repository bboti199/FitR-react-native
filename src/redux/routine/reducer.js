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
  routineUpdating: false,
  routineUpdateComplete: false,
  updateError: null,
  latestLogFetching: true,
  latestLog: null,
  latestLogFetchError: null,
  chartData: null,
  chartDataFetching: false,
  chartDataFetchError: null,
  logCreated: false,
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
        routineUpdateComplete: false,
        logCreated: false,
      };
    case RoutineTypes.LOG_CREATED:
      return {
        ...state,
        logCreated: true,
        modified: true,
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
    case RoutineTypes.ROUTINE_UPDATE_START:
      return {
        ...state,
        routineUpdating: false,
        updateError: null,
        routineUpdateComplete: true,
      };
    case RoutineTypes.ROUTINE_UPDATE_ERROR:
      return {
        ...state,
        routineUpdating: false,
        updateError: payload,
      };
    case RoutineTypes.ROUTINE_UPDATE_SUCCESS:
      return {
        ...state,
        routineUpdating: false,
        modified: true,
      };
    case RoutineTypes.FETCH_LATEST_LOG_START:
      return {
        ...state,
        latestLogFetching: true,
        latestLog: null,
        latestLogFetchError: null,
      };
    case RoutineTypes.FETCH_LATEST_LOG_SUCCESS:
      return {
        ...state,
        latestLogFetching: false,
        latestLog: payload,
      };
    case RoutineTypes.FETCH_LATEST_LOG_ERROR:
      return {
        ...state,
        latestLogFetching: false,
        latestLog: null,
        latestLogFetchError: payload,
      };

    case RoutineTypes.FETCH_CHART_DATA_START:
      return {
        ...state,
        chartDataFetching: true,
        chartDataFetchError: null,
      };
    case RoutineTypes.FETCH_CHART_DATA_SUCCESS:
      return {
        ...state,
        chartDataFetching: false,
        chartData: payload,
      };

    case RoutineTypes.FETCH_CHART_DATA_ERROR:
      return {
        ...state,
        chartDataFetching: false,
        chartDataFetchError: payload,
      };

    case RoutineTypes.CLEANUP:
      return initialState;
    default:
      return state;
  }
}
