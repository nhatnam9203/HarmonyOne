import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { roundFloatNumber, formatNumberFromCurrency } from "@shared/utils";
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.settlement';
const initialState = {
    batchHistory: [],
    pages: 0,
    count: 0,

    transactions: [],
    transactions_count: 0,
    transactions_pages: 0,

    staffSales: [],
    giftCardSales: [],

    settlementWaiting: {},
    listStaffSales: [],
    listGiftCardSales: [],

};

const settlemtSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setBatchHistory: (state, action) => {
            if (action?.payload?.currentPage == 1) {
                state.batchHistory = action?.payload?.data;
            } else {
                state.batchHistory = state.batchHistory.concat(action?.payload?.data);
            }
            state.pages = action?.payload?.pages;
            state.count = action?.payload?.count;
        },

        setTransactions: (state, action) => {
            if (action?.payload?.currentPage == 1) {
                state.transactions = action?.payload?.data;
            } else {
                state.transactions = state.transactions.concat(action?.payload?.data);
            }
            state.transactions_pages = action?.payload?.pages;
            state.transactions_count = action?.payload?.count;
        },

        setStaffSales: (state, action) => {
            state.staffSales = action.payload;
        },

        setGiftCardSales: (state, action) => {
            state.giftCardSales = action.payload;
        },

        setSettlementWaiting: (state, action) => {
            state.settlementWaiting = action.payload;
        },

        setListStaffsSales: (state, action) => {
            state.listStaffSales = action.payload;
        },

        setListGiftCardSales: (state, action) => {
            state.listGiftCardSales = action.payload;
        },

        editAmountSettlementWaiting: (state, action) => {
            const { otherPayment, paymentByCash } = action.payload;
            let tempSettlementWating = {
                ...state.settlementWaiting,
                otherPayment,
                paymentByCash,
                total: roundFloatNumber(
                    formatNumberFromCurrency(state.settlementWaiting.paymentByHarmoy) +
                    formatNumberFromCurrency(state.settlementWaiting.paymentByCreditCard) +
                    formatNumberFromCurrency(paymentByCash) +
                    formatNumberFromCurrency(otherPayment) +
                    formatNumberFromCurrency(state.settlementWaiting.discount) +
                    formatNumberFromCurrency(state.settlementWaiting.paymentByGiftcard)
                ),
            };


            state.settlementWaiting = tempSettlementWating;
        },

        updateNote: (state, action) => {
            let tempSettlementWating = {
                ...state.settlementWaiting,
                note: action.payload
            };
            state.settlementWaiting = tempSettlementWating;
        }
    },
});

const { actions, reducer } = settlemtSlice;

let settlementReducrer = persistReducer(
    {
        key: 'settlement',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: settlementReducrer,
    actions: { ...actions },
};