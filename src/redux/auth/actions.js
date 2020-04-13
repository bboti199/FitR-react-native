import auth, {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {GoogleSignin} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import md5 from 'md5';
import {AuthTypes} from './types';
import {ExerciseTypes} from '../exercise/types';
import {LogTypes} from '../logs/types';
var RNFS = require('react-native-fs');

export const loginWithEmailAndPassword = (
  email,
  password,
) => async dispatch => {
  dispatch({type: AuthTypes.LOGIN_START});

  try {
    const user = await auth().signInWithEmailAndPassword(email, password);

    dispatch({type: AuthTypes.LOGIN_SUCCESS, payload: user.user});
  } catch (error) {
    dispatch({type: AuthTypes.LOGIN_ERROR, payload: error.userInfo.message});
  }
};

export const setUser = user => async dispatch => {
  dispatch({type: AuthTypes.SET_USER, payload: user});
};

export const logout = () => async dispatch => {
  auth().signOut();
  dispatch({type: AuthTypes.LOGOUT});
  dispatch({type: ExerciseTypes.CLEANUP});
  dispatch({type: LogTypes.CLEANUP});
};

export const googleLogin = () => async dispatch => {
  dispatch({type: AuthTypes.GOOGLE_LOGIN_START});

  try {
    await GoogleSignin.hasPlayServices();

    const {accessToken, idToken} = await GoogleSignin.signIn();

    const googleCreds = firebase.auth.GoogleAuthProvider.credential(
      idToken,
      accessToken,
    );

    const user = await firebase.auth().signInWithCredential(googleCreds);

    dispatch({type: AuthTypes.GOOGLE_LOGIN_SUCCESS, payload: user.user});
  } catch (error) {
    dispatch({type: AuthTypes.GOOGLE_LOGIN_ERROR, payload: error.message});
  }
};

export const loginWithFacebook = () => async dispatch => {
  dispatch({type: AuthTypes.FACEBOOK_LOGIN_START});

  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      dispatch({
        type: AuthTypes.FACEBOOK_LOGIN_ERROR,
        payload: 'User cancelled the login process',
      });
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      dispatch({
        type: AuthTypes.FACEBOOK_LOGIN_ERROR,
        payload: 'Something went wrong obtaining access token',
      });
    }

    const facebookCreds = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    const user = await auth().signInWithCredential(facebookCreds);

    dispatch({type: AuthTypes.FACEBOOK_LOGIN_SUCCESS, payload: user.user});
  } catch (error) {
    dispatch({
      type: AuthTypes.FACEBOOK_LOGIN_ERROR,
      payload: error.userInfo.message,
    });
  }
};

export const registerWithEmailAndPassword = ({
  email,
  password,
  username,
}) => async dispatch => {
  dispatch({type: AuthTypes.REGISTER_START});

  try {
    const hash = md5(new Date().toString());
    const avatarUrl = `http://www.gravatar.com/avatar/${hash}?d=identicon`;

    await auth().createUserWithEmailAndPassword(email, password);

    await auth().currentUser.updateProfile({
      displayName: username,
      photoURL: avatarUrl,
    });

    dispatch({type: AuthTypes.REGISTER_SUCCESS, payload: auth().currentUser});
  } catch (error) {
    dispatch({
      type: AuthTypes.REGISTER_ERROR,
      payload: error.userInfo.message,
    });
  }
};

export const updateProfile = data => async dispatch => {
  try {
    await auth().currentUser.updateProfile(data);
    const user = auth().currentUser;
    await dispatch(setUser(user));
  } catch (error) {}
};

export const uploadProfilePicture = data => async dispatch => {
  dispatch({type: AuthTypes.PICTURE_UPLOAD_START});
  const currenPhoto = auth().currentUser.photoURL;

  try {
    const avatarSignature = md5(
      `${auth().currentUser.uid + auth().currentUser.email}`,
    );
    const imageRef = storage().ref(`avatars/avatar_${avatarSignature}.jpg`);

    await imageRef.putFile(data.path);

    if (RNFS.exists(data.path)) {
      await RNFS.unlink(data.path);
      await RNFS.scanFile(data.path);
    }

    const imageUri = await imageRef.getDownloadURL();
    dispatch(updateProfile({photoURL: imageUri}));

    dispatch({type: AuthTypes.PICTURE_UPLOAD_SUCCESS});
  } catch (error) {
    // console.log(error);
    dispatch(updateProfile({photoURL: currenPhoto}));
    dispatch({
      type: AuthTypes.PICTURE_UPLOAD_ERROR,
      payload: 'An error occured during image upload.',
    });
  }
};
