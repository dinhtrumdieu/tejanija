import {
    FETCH_USER_INFORMATION_SUCCESS,
    UPDATE_LOGIN_STATUS,
    UPDATE_LANGUAGE,
    LOG_OUT, UPDATE_USER_INFORMATION_SUCCESS,
} from '../actions/types';

const initialState = {
    isLogin: false,
    profile: {},
    language: 'en',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_INFORMATION_SUCCESS:
            return {
                ...state,
                profile: action.payload.profile,
                isLogin: action.payload.isLogin,
            };
        case UPDATE_USER_INFORMATION_SUCCESS:
            return {
                ...state,
                profile: action.payload.profile,
            };
        case UPDATE_LOGIN_STATUS:
            return {
                ...state,
                isLogin: action.payload,
            };
        case UPDATE_LANGUAGE:
            return {
                ...state,
                language: action.payload,
            };
        case LOG_OUT:
            return {
                isLogin: false,
                profile: {},
            };
        default:
            return state;
    }
}
