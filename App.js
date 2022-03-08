import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {store} from './src/redux/store';
import { PersistGate } from "redux-persist/integration/react";
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation';
import { persistStore } from 'redux-persist';

export default function App() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigator/>
      </PersistGate>
    </Provider>
  );
}

