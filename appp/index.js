import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider as StoreProvider} from 'react-redux';
import {fonts} from './src/styles/themes.json';
import {
  DefaultTheme,
  configureFonts,
  Provider as PaperProvider,
} from 'react-native-paper';
import Home from './src/pages/Home';
import store from './src/store';
const themes = {
  ...DefaultTheme,
  fonts: configureFonts({
    ios: fonts,
    android: fonts,
  }),
};
const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={themes}>
        <Home />
      </PaperProvider>
    </StoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => App);
