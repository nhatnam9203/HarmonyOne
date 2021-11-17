 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import moment from "moment";
import { te } from 'date-fns/locale';

const reducerName = 'hpo.appointmentEdit';
const initialState = {
    appointmentEdit: {}
};

const editAppointment = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setAppointentEdit: (state, action) => {
            state.appointmentEdit = action.payload;
        },

        changeDateTime: (state, action) => {
            const dayChanged = action.payload?.toString()?.substring(0, 10);
            let tempAppointment = {
                ...state.appointmentEdit,
                fromTime: `${dayChanged}T${moment(state.appointmentEdit.fromTime).format('HH:mm')}:00`
            }
            state.appointmentEdit = tempAppointment;
        },

        changeServiceTime: (state, action) => {
            const { time, bookingServiceId } = action.payload;
            let tempAppointment = {
                ...state.appointmentEdit,
            }
            let tempServices = tempAppointment.services || [];
            const day = state.appointmentEdit.fromTime.toString()?.substring(0, 10);

            for (let i = 0; i < tempServices.length; i++) {
                if (tempServices[i].bookingServiceId == bookingServiceId) {
                    tempServices[i].fromTime = `${day}T${moment(time).format('HH:mm')}:00`;
                }
            }
            tempAppointment = {
                ...tempAppointment,
                services: tempServices,
                fromTime: tempServices.length > 0 ? tempServices[0].fromTime : `${moment().format("YYYY-MM-DD")}T${moment().format("HH:mm")}:00`
            }
            state.appointmentEdit = tempAppointment;
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
                fromTime: tempServices.length > 0 ? tempServices[0].fromTime : tempAppointment.fromTime
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
                fromTime: tempServices.length > 0 ? tempServices[0].fromTime : tempAppointment.fromTime
            }

            state.appointmentEdit = tempAppointment;
        },

        removeProduct: (state, action) => {

            const productId = action.payload;
            let tempAppointment = {
                ...state.appointmentEdit,
            }
            let tempProduct = tempAppointment.products || [];

            tempProduct = tempProduct.filter(sv => sv.productId !== productId);
            tempAppointment = {
                ...tempAppointment,
                products: tempProduct,
            }

            state.appointmentEdit = tempAppointment;
        },

        removeGiftCard: (state, action) => {
            const giftCardId = action.payload;
            let tempAppointment = {
                ...state.appointmentEdit,
            }
            let tempGiftCard = tempAppointment.giftCards || [];

            tempGiftCard = tempGiftCard.filter(sv => sv.giftCardId !== giftCardId);
            tempAppointment = {
                ...tempAppointment,
                giftCards: tempGiftCard,
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
                ...tempExtras.filter(ex => ({ ...ex, status: 1 })),
                ...extras.map(ex => ({ ...ex, status: 1 }))
            ];

            tempAppointment = {
                ...tempAppointment,
                services: tempServices,
                extras: tempExtras,
            }
            state.appointmentEdit = tempAppointment;
        },

        editService: (state, action) => {
            let tempAppointment = {
                ...state.appointmentEdit,
            }
            let tempServices = tempAppointment.services || [];
            const findIndex = tempServices.findIndex(obj => obj.serviceId == action.payload?.service?.serviceId);
            if (findIndex !== -1) {
                tempServices[findIndex] = action.payload?.service;
                tempAppointment = {
                    ...tempAppointment,
                    services: tempServices,
                }
                state.appointmentEdit = tempAppointment;
            }
        },

        updateExtras: (state, action) => {
            const extrasList = action.payload;
            let tempAppointment = {
                ...state.appointmentEdit,
            }
            let tempExtras = tempAppointment.extras || [];
            for (let el of extrasList) {
                const index = findPositionExtra(tempExtras, el);
                if (index !== -1) {
                    if (!el?.checked) {
                        if (!el?.bookingServiceId) {
                            tempExtras = tempExtras.filter(ex => ex?.serviceId !== el?.serviceId)
                        } else {
                            tempExtras[index] = { ...el, status: 0 }
                        }
                    } else {
                        tempExtras[index] = { ...el, status: 1 }
                    }

                } else {
                    if (el.checked == true) {
                        let tempEl = {
                            ...el,
                            status: 1
                        }
                        tempExtras.push(tempEl);
                    }
                }
            }
            tempAppointment = {
                ...tempAppointment,
                extras: tempExtras,
            }
            state.appointmentEdit = tempAppointment;
        },
    },
});

function findPositionExtra(extrasBooking = [], extra) {
    let index = -1;
    index = extrasBooking.findIndex(ex => ex.extraId == extra.extraId);
    return index;
}


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
