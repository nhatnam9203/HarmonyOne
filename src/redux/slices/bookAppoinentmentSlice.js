import { createSlice } from '@reduxjs/toolkit';
import moment from "moment";
import { isEmpty } from "lodash";

const reducerName = 'hpo.customer';
const initialState = {
    staffsOfService: [],
    timesAvailable: [],
    customerBooking: {},
    servicesBooking: [],
    extrasBooking: [],
    dayBooking: moment(),
    timeBooking: "",
    notesBooking : "",
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
        },
        setCustomerBooking: (state, action) => {
            state.customerBooking = action.payload;
        },
        setServicesBooking: (state, action) => {
            state.servicesBooking = action.payload;
        },
        setExtrasBooking: (state, action) => {
            state.extrasBooking = action.payload;
        },

        editService: (state, action) => {
            const { service, duration } = action.payload;
            let tempServices = [...state.servicesBooking];
            const findIndex = tempServices.findIndex(s => s?.serviceId == service?.serviceId);
            if (findIndex !== -1) {
                tempServices[findIndex].duration = duration;
                state.servicesBooking = tempServices;
            } else {
                return state;
            }
        },

        deleteService: (state, action) => {
            const service = action.payload;
            let tempServices = [...state.servicesBooking];
            let tempExtras = [...state.extrasBooking];
            tempServices = tempServices.filter(obj => obj.serviceId !== service?.serviceId);
            tempExtras = tempExtras.filter(obj => obj.serviceId !== service?.serviceId);
            state.servicesBooking = tempServices;
            state.extrasBooking = tempExtras;
        },

        updateStaffService: (state, action) => {
            const { service, staff } = action.payload;
            let tempServices = [...state.servicesBooking];
            const findIndex = tempServices.findIndex(s => s.serviceId == service.serviceId);
            if (findIndex !== -1) {
                tempServices[findIndex].staffId = staff.staffId;
                tempServices[findIndex].displayName = staff.displayName;
                state.servicesBooking = tempServices;
            } else {
                return state;
            }
        },

        updateExtrasBooking: (state, action) => {
            const extrasList = action.payload;
            let tempExtrasBooking = [...state.extrasBooking];
            for (const el of extrasList) {
                const index = findPositionExtra(tempExtrasBooking, el);
                if (index !== -1) {
                    tempExtrasBooking[index] = el;
                } else {
                    if (el.checked == true) {
                        tempExtrasBooking.push(el);
                    }
                }
            }
            state.extrasBooking = tempExtrasBooking;
        },

        setDayBooking: (state, action) => {
            state.dayBooking = action.payload;
        },

        setTimeBooking: (state, action) => {
            state.timeBooking = action.payload;
        },

        updateNote : (state,action) =>{
            state.notesBooking = action.payload;
        },

        resetBooking: (state, action) => {
            state.staffsOfService = [];
            state.timesAvailable = [];
            state.customerBooking = {};
            state.servicesBooking = [];
            state.extrasBooking = [];
            state.dayBooking = moment();
            state.timeBooking = "";
            state.notesBooking = "";
        }
    },
});

function findPositionExtra(extrasBooking = [], extra) {
    let index = -1;
    index = extrasBooking.findIndex(ex => ex.extraId == extra.extraId);
    return index;
}

const { actions, reducer } = bookAppointmentSlice;


module.exports = {
    reducer,
    actions: { ...actions },
};