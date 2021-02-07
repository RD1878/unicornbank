import { put, takeEvery, call } from "redux-saga/effects";
import {
  getSessionError,
  REQUEST_USER,
  saveUser,
  REQUEST_CHATMESSAGES,
  saveChatMessages,
} from "../actions";
import { SagaIterator } from "redux-saga";
import { fetchChatMessages, fetchUser } from "../api";

function* rootSaga(): SagaIterator {
  yield takeEvery(REQUEST_USER, saveUserAsync);
  yield takeEvery(REQUEST_CHATMESSAGES, saveChatMessagesAsync);
}

function* saveUserAsync() {
  try {
    const user = yield call(fetchUser);
    yield put(saveUser(user));
  } catch (error) {
    yield put(getSessionError(error.message));
  }
}

function* saveChatMessagesAsync() {
  try {
    const chatMessages = yield call(fetchChatMessages);
    yield put(saveChatMessages(chatMessages));
  } catch (error) {
    yield put(getSessionError(error.message));
  }
}

export default rootSaga;
