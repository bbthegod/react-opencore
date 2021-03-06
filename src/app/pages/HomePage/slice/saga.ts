import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { homePageActions as actions } from '.';

export function* get() {
  try {
    const respone = yield call(request, {
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET',
    });
    if (respone) {
      yield put(actions.getSuccess(respone));
    } else {
      yield put(actions.getFailures());
    }
  } catch (err) {
    yield put(actions.getFailures());
  }
}

export function* homePageSaga() {
  yield takeLatest(actions.get.type, get);
}
