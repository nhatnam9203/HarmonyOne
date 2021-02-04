 import { createReducer } from '@utils';

const initialState = {
  isLoadingButton: false,
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
  ['CONTENT_ERROR'](state) {
    return {
      ...state,
      contentError: action.payload,
    };
  },
});

