
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from 'redux-thunk';
import rootReducer from './reducer/rootReducer';
import { configureStore, Action } from "@reduxjs/toolkit";


const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

let persistor = persistStore(store);

export {store,persistor}