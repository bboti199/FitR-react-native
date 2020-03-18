import {AuthTypes} from './types';

const initialState = {
  user: null,
  isAuth: false,
  loading: false,
  error: null,
};

export default function(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case AuthTypes.LOGIN_START:
    case AuthTypes.REGISTER_START:
    case AuthTypes.FACEBOOK_LOGIN_START:
    case AuthTypes.GOOGLE_LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AuthTypes.LOGIN_SUCCESS:
    case AuthTypes.REGISTER_SUCCESS:
    case AuthTypes.FACEBOOK_LOGIN_SUCCESS:
    case AuthTypes.GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuth: true,
        loading: false,
        error: null,
      };
    case AuthTypes.LOGIN_ERROR:
    case AuthTypes.REGISTER_ERROR:
    case AuthTypes.FACEBOOK_LOGIN_ERROR:
    case AuthTypes.GOOGLE_LOGIN_ERROR:
      return {
        ...state,
        error: payload,
        user: null,
        loading: false,
        isAuth: false,
      };
    case AuthTypes.LOGOUT:
      return {
        ...state,
        loading: false,
        user: null,
        isAuth: false,
        error: null,
      };
    case AuthTypes.SET_USER:
      return {
        ...state,
        user: payload,
        error: null,
      };
    default:
      return state;
  }
}
