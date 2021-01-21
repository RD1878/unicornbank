import { put, takeEvery, call } from "redux-saga/effects";
import { REQUEST_USER, saveUser } from "../actions";
import { SagaIterator } from "redux-saga";
import api from "../api";

function* rootSaga(): SagaIterator {
  yield takeEvery(REQUEST_USER, saveUserAsync);
}

function* saveUserAsync() {
  const user = yield call(api.fetchUser);
  yield put(saveUser(user));
}

export default rootSaga;
