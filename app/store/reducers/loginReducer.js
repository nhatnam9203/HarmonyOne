import { createReducer } from '@utils';

const initialState = {
  isLogin: false
};

export const loginReducer = createReducer(initialState, {
  ['LOGIN_SUCCESS'](state) {
    return {
      ...state,
      isLogin: true,
    };
  },
  ['LOGOUT_SUCCESS'](state) {
    return {
      ...state,
      isLogin: false,
    };
  },
});


