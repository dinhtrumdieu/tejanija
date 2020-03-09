import * as actionTypes from './types';

export const fetchBooks = () => ({type: actionTypes.FETCH_BOOKS});

export const showLoading = () => ({type: actionTypes.SHOW_LOADING});

export const hideLoading = () => ({type: actionTypes.HIDE_LOADING});
export const fetchUserInformation = () => ({
  type: actionTypes.FETCH_USER_INFORMATION,
});
export const updateUserInformation = () => ({
  type: actionTypes.UPDATE_USER_INFORMATION,
});
export const changeLanguage = params => ({
  type: actionTypes.CHANGE_LANGUAGE,
  params,
});

export const logOut = () => ({type: actionTypes.LOG_OUT});
