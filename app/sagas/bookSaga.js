import {
    call,
    fork,
    put,
    take,
    takeLatest,
} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';
import HomeRequest from '../requests/HomeRequest';

async function loadBookList() {
     const request = new HomeRequest();
     return request.getBookList();
}

function* fetchBookList() {
    try {
        const response = yield call(loadBookList);
        if (response) {
            yield put({
                type: actionTypes.FETCH_BOOKS_SUCCESS,
                payload: response,
            });
        }
    } catch (err) {
        console.log('balanceSaga: Fetch user information error', err);
    }
}

export function* watchFetchBookList() {
    while (yield take(actionTypes.FETCH_BOOKS)) {
        yield fork(fetchBookList);
    }
}
