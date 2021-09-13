import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.customer';
const initialState = {
    customerList: [],
};

const bookAppointmentSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        testaction: (state, action) => {
            console.log({ action })
        }
    },
});

const { actions, reducer } = bookAppointmentSlice;

module.exports = {
    reducer,
    actions: { ...actions },
};