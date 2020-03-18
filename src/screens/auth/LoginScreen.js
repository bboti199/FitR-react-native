import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {Text, Button} from 'react-native-elements';
import {Caption} from 'react-native-paper';
import TextInput from '../../components/forms/TextInput';
import {default as CustomButton} from '../../components/forms/Button';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Animated, {Easing} from 'react-native-reanimated';

import {GoogleSigninButton} from '@react-native-community/google-signin';

import {useDispatch, useSelector} from 'react-redux';
import {
  loginWithEmailAndPassword,
  googleLogin,
  loginWithFacebook,
} from '../../redux/auth/actions';

import {Formik} from 'formik';
import * as Yup from 'yup';

import {Colors} from '../../styles/colors';

const {width} = Dimensions.get('screen');

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Email field can not be empty'),
  password: Yup.string()
    .label('Password')
    .required('Password field can not be empty')
    .min(6, 'Password must have at least 6 characters'),
});

const LoginScreen = ({navigation}) => {
  const [passwordSecure, setPasswordSecure] = useState(true);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const dispatch = useDispatch();

  const [slideUpAnim] = useState(new Animated.Value(0));

  const togglePasswordSecure = () => setPasswordSecure(!passwordSecure);

  useEffect(() => {
    Animated.timing(slideUpAnim, {
      toValue: -500,
      duration: 1000,
      easing: Easing.bounce,
    }).start();
  }, [slideUpAnim]);

  return (
    <ImageBackground
      style={styles.bgImage}
      source={require('../../../assets/bg.jpg')}>
      <Animated.View
        style={{
          ...styles.container,
          transform: [
            {
              translateY: slideUpAnim,
            },
          ],
        }}>
        <Text style={styles.text}>Welcome!</Text>
        <Formik
          validationSchema={validationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={({email, password}) => {
            dispatch(loginWithEmailAndPassword(email, password));
          }}>
          {({
            errors,
            handleBlur,
            handleChange,
            values,
            handleSubmit,
            touched,
            isValid,
          }) => (
            <React.Fragment>
              <TextInput
                label="Email"
                placeholder="Enter your email here..."
                value={values.email}
                onChangeText={handleChange('email')}
                autoCapitalize="none"
                autoCompleteType="email"
                onBlur={handleBlur('email')}
                errorMessage={touched.email && errors.email}
              />
              <TextInput
                label="Password"
                placeholder="***************"
                value={values.password}
                secureTextEntry={passwordSecure}
                onChangeText={handleChange('password')}
                autoCapitalize="none"
                autoCompleteType="password"
                onBlur={handleBlur('password')}
                errorMessage={touched.password && errors.password}
                rightIcon={
                  <TouchableOpacity onPress={togglePasswordSecure}>
                    <Feather
                      name={passwordSecure ? 'eye' : 'eye-off'}
                      color={Colors.fgPrimary}
                      size={22}
                    />
                  </TouchableOpacity>
                }
              />

              {error ? (
                <Text style={styles.errorContainer}>{error}</Text>
              ) : null}

              <CustomButton
                title="Sign In"
                disabled={!isValid}
                loading={loading}
                onPress={handleSubmit}
              />

              <View style={styles.separator}>
                <Caption appearance="hint">OR</Caption>
              </View>

              <GoogleSigninButton
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => dispatch(googleLogin())}
                disabled={false}
              />

              <Button
                title="Continue with Facebook"
                onPress={() => dispatch(loginWithFacebook())}
                buttonStyle={styles.fbButton}
                icon={
                  <FontAwesome5
                    name="facebook-f"
                    size={20}
                    color={Colors.fgPrimary}
                    style={{marginRight: 15}}
                  />
                }
                titleStyle={styles.fbButtonTitle}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.registerTextContainer}>
                <Text style={styles.registerText}>
                  Don't have an account? Register here!
                </Text>
              </TouchableOpacity>
            </React.Fragment>
          )}
        </Formik>
      </Animated.View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 40,
    borderTopLeftRadius: 40,
    borderTopEndRadius: 40,
    width: width,
    bottom: -500,
    backgroundColor: Colors.bgPrimary,
  },
  text: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 35,
    color: Colors.fgPrimary,
  },
  errorContainer: {
    marginHorizontal: 25,
    textAlign: 'center',
    color: Colors.red,
  },
  separator: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#a1a1a1',
    marginTop: 15,
    width: Dimensions.get('screen').width * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  registerTextContainer: {
    marginTop: 25,
  },
  registerText: {
    color: Colors.blueSecondary,
  },
  googleButton: {
    width: width * 0.52,
    paddingVertical: 27,
  },
  fbButton: {
    backgroundColor: '#1877f2',
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: width * 0.5,
    marginTop: 10,
  },
  fbButtonTitle: {
    fontFamily: 'NunitoSans-Bold',
    color: Colors.fgPrimary,
    fontSize: 15,
  },
});
