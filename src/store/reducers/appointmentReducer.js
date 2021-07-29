import { createReducer } from '@utils';

const initialState = {
    appointmentList: [],
};

export const appointmentReducer = createReducer(initialState, {
    ['SET_APPOINTENT_LIST'](state, action) {
        return {
            ...state,
            appointmentList: action.payload,
        };
    },

});

