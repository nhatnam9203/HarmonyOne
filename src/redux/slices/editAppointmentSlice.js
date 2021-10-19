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
        },

        removeServiceBooking: (state, action) => {
            const bookingServiceId = action.payload;
            let tempAppointment = {
                ...state.appointmentEdit,
            }
            let tempServices = tempAppointment.services || [];
            let tempExtras = tempAppointment.extras || [];
            tempServices = tempServices.filter(sv => sv.bookingServiceId !== bookingServiceId);
            tempExtras = tempExtras.filter(ex => ex.bookingServiceId !== bookingServiceId);
            tempAppointment = {
                ...tempAppointment,
                services: tempServices,
                extras: tempExtras,
            }
            state.appointmentEdit = tempAppointment;
        },

        removeServiceAdded: (state, action) => {
            const serviceId = action.payload;
            let tempAppointment = {
                ...state.appointmentEdit,
            }
            let tempServices = tempAppointment.services || [];
            let tempExtras = tempAppointment.extras || [];
            tempServices = tempServices.filter(sv => sv.serviceId !== serviceId);
            tempExtras = tempExtras.filter(ex => ex.serviceId !== serviceId);
            tempAppointment = {
                ...tempAppointment,
                services: tempServices,
                extras: tempExtras,
            }
            state.appointmentEdit = tempAppointment;
        },

        addService: (state, action) => {
            let { service, extras = [] } = action.payload;
            let tempAppointment = {
                ...state.appointmentEdit,
            }
            let tempServices = tempAppointment.services || [];
            let tempExtras = tempAppointment.extras || [];
            if (tempServices?.length > 0) {
                service.fromTime = calculateFromTimePreviousService(tempServices, tempExtras);
            } else {
                service.fromTime = `${moment().format("YYYY-MM-DD")}T${moment().format("HH:mm")}:00`;
            }

            tempServices.push(service);
            tempExtras = [
                ...tempExtras,
                ...extras
            ];
            tempAppointment = {
                ...tempAppointment,
                services: tempServices,
                extras: tempExtras,
            }
            state.appointmentEdit = tempAppointment;
        },
    },
});

const calculateFromTimePreviousService = (services = [], tempExtras) => {
    let fromTime = `${moment().format("YYYY-MM-DD")}T${moment().format("HH:mm")}:00`;
    if (services.length > 0) {
        let duration = 0;
        const previousService = { ...services[services.length - 1] };
        for (let i = 0; i < tempExtras.length; i++) {
            if (tempExtras[i]?.bookingServiceId &&
                previousService?.bookingServiceId &&
                tempExtras[i]?.bookingServiceId == previousService?.bookingServiceId) {
                duration += parseInt(tempExtras[i].duration);
            } else
                if (tempExtras[i]?.serviceId &&
                    previousService?.serviceId &&
                    tempExtras[i]?.serviceId == previousService?.serviceId) {
                    duration += parseInt(tempExtras[i].duration);
                }
        }
        duration += parseInt(previousService.duration);
        fromTime = moment(previousService.fromTime).add("minutes", duration);
        fromTime = `${moment(fromTime).format("YYYY-MM-DD")}T${moment(fromTime).format("HH:mm")}:00`;
    }
    return fromTime;
}

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