import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import moment from "moment";

const reducerName = 'hpo.appointmentEdit';
const initialState = {
    appointmentEdit: {},
};

const editAppointment = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setAppointentEdit : (state,action) =>{
            state.appointmentEdit = action.payload;
        }
    },
});

const { actions, reducer } = editAppointment;

let editAppointmentReducer = persistReducer(
    {
        key: 'appointmentEdit',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: editAppointmentReducer,
    actions: { ...actions },
};