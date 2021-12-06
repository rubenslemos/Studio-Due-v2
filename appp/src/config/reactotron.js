import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reactotronRedux} from 'reactotron-redux';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({name: 'appp'})
  .useReactNative()
  .use(sagaPlugin())
  .use(reactotronRedux())
  .connect();

console.tron = Reactotron;
//console.tron.log() -> envia o log para o Reactotron para ajudar o debug do sistema
export default Reactotron;
