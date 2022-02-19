/*
 *
 * HomePage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from '.';

export function* get() {
  try {
    const { response, error } = yield call(request, {
      url: '/posts',
      method: 'GET',
    });
    if (response) {
      yield put(actions.getSuccess(response));
    } else if (error) {
      yield put(actions.getFailure());
    } else {
      yield put(actions.getFailure());
    }
  } catch (err) {
    yield put(actions.getFailure());
  }
}

export function* homePageSaga() {
  yield takeLatest(actions.get.type, get);
}
