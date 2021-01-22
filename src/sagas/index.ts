import { put, takeEvery, call } from "redux-saga/effects";
import { getSessionError, REQUEST_USER, saveUser } from "../actions";
import { SagaIterator } from "redux-saga";
import api from "../api";

function* rootSaga(): SagaIterator {
  yield takeEvery(REQUEST_USER, saveUserAsync);
}

function* saveUserAsync() {
  try {
    const user = yield call(api.fetchUser);
    yield put(saveUser(user));
  } catch (error) {
    yield put(getSessionError());
  }
}

export default rootSaga;
