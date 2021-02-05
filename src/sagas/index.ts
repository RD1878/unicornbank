import { put, takeEvery, call } from "redux-saga/effects";
import {
  getSessionError,
  REQUEST_USER,
  saveUser,
  GET_CURRENCY,
  saveCurrency,
  getCurrencyError,
} from "../actions";
import { SagaIterator } from "redux-saga";
import api from "../api";

function* rootSaga(): SagaIterator {
  yield takeEvery(REQUEST_USER, saveUserAsync);
  yield takeEvery(GET_CURRENCY, getCurrencyAsync);
}

function* saveUserAsync() {
  try {
    const user = yield call(api.fetchUser);
    yield put(saveUser(user));
  } catch (error) {
    yield put(getSessionError(error.message));
  }
}

function* getCurrencyAsync() {
  try {
    const currency = yield call(api.fetchCurrency);
    yield put(saveCurrency(currency));
  } catch (error) {
    yield put(getCurrencyError());
  }
}

export default rootSaga;
