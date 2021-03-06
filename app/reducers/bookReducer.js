import {
    FETCH_BOOKS_SUCCESS,
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_BOOKS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
