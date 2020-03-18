import {NetinfoTypes} from './types';

export const setNetworkState = payload => async dispatch => {
  dispatch({type: NetinfoTypes.SET_NETWORK_STATE, payload});
};
