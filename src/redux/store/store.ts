import { applyMiddleware, compose, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers'
import rootSaga from '../saga/root';
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();
const authPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'profile', 'cart', 'checkout']
};

const persistReducer = persistCombineReducers(authPersistConfig, rootReducer);
export default function configureAppStore() {
  const store = configureStore({
    reducer: persistReducer,
    middleware: [sagaMiddleware]
  });

  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};