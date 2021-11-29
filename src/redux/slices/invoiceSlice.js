import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.invoice';
const initialState = {
    invoiceList: [],
    pages: 0,
    count: 0,
    invoiceDetail: {},
    invoiceViewAppointmentDetail: {},
    isProcessVoidPaymentClover: false,
};

const invoiceSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setInvoiceList: (state, action) => {
            if (action?.payload?.currentPage == 1) {
                state.invoiceList = action?.payload?.data;
            } else {
                state.invoiceList = state.invoiceList.concat(action?.payload?.data);
            }
            state.pages = action?.payload?.pages;
            state.count = action?.payload?.count;

        },
        setInvoiceDetail: (state, action) => {
            state.invoiceDetail = action.payload;
        },
        setInvoiceViewAppointmentDetail: (state, action) => {
            state.invoiceViewAppointmentDetail = action.payload;
        },
        updateStatusInvoiceSuccess: (state, action) => {
            const invoice = action.payload;
            let temp = [...state.invoiceList];
            const findIndex = temp.findIndex(obj => obj.checkoutId == invoice?.checkoutId);
            if (findIndex !== -1) {
                if (invoice?.status == "paid") {
                    temp[findIndex].status = "refund";
                } else {
                    temp[findIndex].status = "void";
                }
            }
            state.invoiceList = temp;
        },
        setIsProcessVoidPaymentClover: (state, action) => {
            state.isProcessVoidPaymentClover = action.payload;
        },
    },
});

const { actions, reducer } = invoiceSlice;

let invoiceReducer = persistReducer(
    {
        key: 'invoice',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: invoiceReducer,
    actions: { ...actions },
};