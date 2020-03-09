import {all} from 'redux-saga/effects';
import {watchFetchUserInformation} from './userInformationSaga';
import {watchFetchBookList} from './bookSaga';

export default function* rootSaga() {
  yield all([watchFetchUserInformation(), watchFetchBookList()]);
}
