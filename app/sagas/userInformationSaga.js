import {
    call,
    fork,
    put,
    take,
    takeLatest,
} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';
import UserRequest from '../requests/UserRequest';
import Navigator from '../utils/Navigator';
import AppPreferences from '../utils/AppPreferences';
import I18n from '../i18n/i18n';

async function loadUserInformation() {
    // const request = new UserRequest();
    // return request.getCurrentUser();
    return await AppPreferences.getAccountLogin();
}

function* fetchUserInformation() {
    try {
        const response = yield call(loadUserInformation);
        if (response) {
            yield put({
                type: actionTypes.FETCH_USER_INFORMATION_SUCCESS,
                payload: {
                    isLogin: true,
                    profile: JSON.parse(response),
                },
            });
        }
    } catch (err) {
        console.log('balanceSaga: Fetch user information error', err);
    }
}

function* updateUserInformation() {
    try {
        const response = yield call(loadUserInformation);
        if (response) {
            yield put({
                type: actionTypes.UPDATE_USER_INFORMATION_SUCCESS,
                payload: {
                    isLogin: true,
                    profile: response,
                },
            });
            Navigator.goBack();
        }
    } catch (err) {
        console.log('balanceSaga: Fetch user information error', err);
    }
}

export function* watchFetchUserInformation() {
    while (yield take(actionTypes.FETCH_USER_INFORMATION)) {
        yield fork(fetchUserInformation);
    }
}

export function* watchUpdateUserInformation() {
    while (yield take(actionTypes.UPDATE_USER_INFORMATION)) {
        yield fork(updateUserInformation);
    }
}

function* _changeLanguage(action) {
    try {
        yield put({ type: actionTypes.UPDATE_LANGUAGE, payload: action.params });
    } catch (err) {
        console.log('Change language Setting', err);
    }
}

export function* watchChangeLanguage() {
    yield takeLatest(actionTypes.CHANGE_LANGUAGE, _changeLanguage);
}
