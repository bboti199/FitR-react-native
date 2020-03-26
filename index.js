import React from 'react';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './src/App';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens';

enableScreens();

import {
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
} from 'react-native-paper';

import LoadingSpinner from './src/components/LoadingSpinner';

import {ThemeProvider as ElementsProvider} from 'react-native-elements';
import {Provider as ReduxProvider} from 'react-redux';

import persistConfig from './src/redux/configureStore';
import {PersistGate} from 'redux-persist/integration/react';

import {Colors} from './src/styles/colors';

import {GoogleSignin} from '@react-native-community/google-signin';

import axios from 'axios';

import {API_URL, WEB_CLIENT_ID} from 'react-native-dotenv';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'NunitoSans-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'NunitoSans-SemiBold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'NunitoSans-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'NunitoSans-Light',
      fontWeight: 'normal',
    },
  },
};

const colorTheme = {
  ...DefaultTheme.colors,
  text: Colors.fgPrimary,
  primary: Colors.bluePrimary,
  surface: Colors.bgSecondary,
  placeholder: Colors.bgSecondary,
  background: Colors.bgPrimary,
  accent: Colors.red,
  disabled: Colors.grey,
  backgrop: Colors.grey,
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  dark: true,
  colors: colorTheme,
};

const Root = () => {
  React.useEffect(() => {
    async function bootstrap() {
      await GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        forceConsentPrompt: true,
      });
    }

    bootstrap();

    axios.defaults.baseURL = API_URL;
  }, []);

  const {store, persistor} = persistConfig();

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <ElementsProvider>
          <PaperProvider theme={theme}>
            <App />
          </PaperProvider>
        </ElementsProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
