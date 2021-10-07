import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.appointment';
const initialState = {
    appointmentsByDate: [],
    appointmentDetail: {},
    blockTimes: [],
};

const appointmentSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setAppointmentsByDate: (state, action) => {
            state.appointmentsByDate = action.payload;
        },
        setAppointmentDetail: (state, action) => {
            state.appointmentDetail = action.payload;
        },
        setBlockTimeBydate: (state, action) => {
            state.blockTimes = action.payload;
        }
    },
});

const { actions, reducer } = appointmentSlice;

let appointmentReducer = persistReducer(
    {
        key: 'appointment',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: appointmentReducer,
    actions: { ...actions },
};