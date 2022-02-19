import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { rootReducer, rootSaga } from './rootReducerSaga';

export function configureAppStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer(),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware).concat(logger),
    devTools: process.env.NODE_ENV !== 'production' || process.env.PUBLIC_URL.length > 0,
  });
  sagaMiddleware.run(rootSaga);
  return store;
}
