import {combineReducers} from 'redux';
import loadingReducer from './loadingReducer';
import userInformationReducer from './userInformationReducer';
import bookReducer from './bookReducer';

export default combineReducers({
  loading: loadingReducer,
  user: userInformationReducer,
  books: bookReducer,
});
