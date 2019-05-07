import { LOG_IN, LOG_OUT } from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: null,
  userId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, isLoggedIn: true, userId: action.payload };
    case LOG_OUT:
      return { ...state, isLoggedIn: false, userId: null };
    default:
      return state;
  }
};
