 import { createReducer } from '@utils';

const initialState = {
  isLoadingButton: false,
  isLoadingRoot : false,
  contentError : '',
};

export const loadingReducer = createReducer(initialState, {
  ['START_LOADING_BUTTON'](state) {
    return {
      ...state,
      isLoadingButton: true,
    };
  },
  ['STOP_LOADING_BUTTON'](state) {
    return {
      ...state,
      isLoadingButton: false,
    };
  },
  ['START_LOADING_ROOT'](state) {
    return {
      ...state,
      isLoadingRoot: true,
    };
  },
  ['STOP_LOADING_ROOT'](state) {
    return {
      ...state,
      isLoadingRoot: false,
    };
  },
  ['SET_CONTENT_ERROR'](state,action) {
    return {
      ...state,
      contentError: action.content,
    };
  },
});



