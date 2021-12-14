import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
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

const warn = console.warn;

function logWarning(...warnings){
  let showWarning = true;
  warnings.forEach(warning => {
    if (warning.includes("UNSAFE_")) showWarning = false;
    else if (warning.includes("componentWillMount")) showWarning = false;
    else if (warning.includes("componentWillReceiveProps")) showWarning = false;
    else if (warning.includes("Animated:")) showWarning = false;
    else if (warning.includes("Require cycle:")) showWarning = false;
  });
  if(showWarning) warn(...warnings);
}


console.warn  = logWarning;

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
