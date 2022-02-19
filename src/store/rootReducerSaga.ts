import { combineReducers } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';

import { homePageSlice } from 'app/containers/HomePage/slice';
// GENERATE NEW IMPORT ABOVE, DO NOT DELETE IT

const slices = [
  homePageSlice,
  // GENERATE NEW SLICE ABOVE, DO NOT DELETE IT
];

export function rootReducer() {
  if (slices.length === 0) {
    return {};
  } else {
    let reducers = {};
    for (let reducer of slices) {
      reducers[reducer.key] = reducer.reducer;
    }
    return combineReducers(reducers);
  }
}

export function* rootSaga() {
  const sagas = yield slices.map(item => item.saga());
  yield all(sagas);
}
