import { put, takeEvery } from "redux-saga/effects";
import { SAVE_USER } from "../actions/constants";
import { SagaIterator } from "redux-saga";

import api from "../api";

import { saveUser } from "./../actions";

function* rootSaga(): SagaIterator {
  yield takeEvery(SAVE_USER, saveUserAsync);
}

function* saveUserAsync() {
  try {
    const data = yield api.fetchUser();

    yield put(saveUser(data));
  } catch (error) {
    console.error(error.message);
  }
}

export default rootSaga;
