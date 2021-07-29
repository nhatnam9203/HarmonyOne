import { createReducer } from '@utils';

const initialState = {
    staffInfo: '',
};

export const authReducer = createReducer(initialState, {
    ['SET_INFO_LOGIN'](state, action) {
        console.log('set info login', action)
        return {
            ...state,
            staffInfo: action.payload,
        };
    },
    ['LOGOUT_SUCCESS'](state, action) {
        return {
            ...state,
            staffInfo: '',
        };
    },
});

