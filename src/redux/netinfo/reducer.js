import {NetinfoTypes} from './types';

const initialState = {
  connected: null,
  internetReachable: null,
  details: null,
};

export default function(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case NetinfoTypes.SET_NETWORK_STATE:
      return {
        ...state,
        connected: payload.connected,
        internetReachable: payload.internetReachable,
        details: payload.details,
      };
    default:
      return state;
  }
}
