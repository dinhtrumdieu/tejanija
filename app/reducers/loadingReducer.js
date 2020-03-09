import { HIDE_LOADING, SHOW_LOADING } from '../actions/types';

const initialState = {
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case SHOW_LOADING:
    return { loading: true };
  case HIDE_LOADING: return { loading: false };
  default:
    return state;
  }
}
