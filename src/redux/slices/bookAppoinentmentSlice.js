import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.customer';
const initialState = {
    staffsOfService: [],
    timesAvailable: [],
};

const bookAppointmentSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setStafsfOfService: (state, action) => {
            state.staffsOfService = action.payload;
        },
        setTimesAvailable: (state, action) => {
            state.timesAvailable = action.payload;
        }
    },
});

const { actions, reducer } = bookAppointmentSlice;

module.exports = {
    reducer,
    actions: { ...actions },
};