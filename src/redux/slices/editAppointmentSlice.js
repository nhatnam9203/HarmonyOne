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
        setAppointentEdit: (state, action) => {
            state.appointmentEdit = action.payload;
        },
        changeDateTime: (state, action) => {
            let tempAppointment = {
                ...state.appointmentEdit,
                fromTime: action.payload
            }
            state.appointmentEdit = tempAppointment;
        },
        changeServiceTime: (state, action) => {
            const { time, bookingServiceId } = action.payload;
            let tempAppointment = {
                ...state.appointmentEdit,
            }
            let tempServices = tempAppointment.services || [];

            for (let i = 0; i < tempServices.length; i++) {
                if (tempServices[i].bookingServiceId == bookingServiceId) {
                    tempServices[i].fromTime = time;
                }
            }
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