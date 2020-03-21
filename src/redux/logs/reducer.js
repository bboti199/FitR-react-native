import {LogTypes} from './types';

const initialState = {
  logs: [],
  fetching: false,
  creating: false,
  fetchError: null,
  createError: null,
  modified: false,
};

export default function(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case LogTypes.FETCH_LOGS_START:
      return {
        ...state,
        fetching: true,
        fetchError: null,
        modified: false,
      };
    case LogTypes.FETCH_LOGS_SUCCESS:
      return {
        ...state,
        logs: payload,
        fetching: false,
      };
    case LogTypes.FETCH_LOGS_ERROR:
      return {
        ...state,
        fetchError: payload,
        fetching: false,
      };
    case LogTypes.CREATE_LOG_START:
      return {
        ...state,
        creating: true,
        createError: null,
      };
    case LogTypes.CREATE_LOG_SUCCESS:
      return {
        ...state,
        creating: false,
        modified: true,
      };
    case LogTypes.CREATE_LOG_ERROR:
      return {
        ...state,
        creating: false,
        createError: payload,
      };
    default:
      return state;
  }
}
