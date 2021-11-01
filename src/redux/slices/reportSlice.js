import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.report';
const initialState = {
    staffSalary: [],
    staffSalary_pages: 0,
    staffSalary_count: 0,

    servicesDuration: [],
    servicesDuration_pages: 0,
    servicesDuration_count: 0,

    listGiftCardSales: [],
    listCustomerSales: [],
    listCategorySales: [],
    listServiceSales: [],
    listProductCategorySales: [],
    listProductSales : [],
    listPaymentMethod : [], 
    listMarketingEffciency : [],
    serviceDurationStaffDetail : [],
};

const reportSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setListStaffSalary: (state, action) => {
            if (action?.payload?.currentPage == 1) {
                state.staffSalary = action?.payload?.data;
            } else {
                state.staffSalary = state.staffSalary.concat(action?.payload?.data);
            }
            state.staffSalary_pages = action?.payload?.pages;
            state.staffSalary_count = action?.payload?.count;
        },

        setListServiceDuration: (state, action) => {
            if (action?.payload?.currentPage == 1) {
                state.servicesDuration = action?.payload?.data;
            } else {
                state.servicesDuration = state.servicesDuration.concat(action?.payload?.data);
            }
            state.servicesDuration_pages = action?.payload?.pages;
            state.servicesDuration_count = action?.payload?.count;
        },

        setListGiftCardSales: (state, action) => {
            state.listGiftCardSales = action?.payload?.data;
        },
        setListCustomerSales: (state, action) => {
            state.listCustomerSales = action.payload?.data;
        },
        setListCategorySales: (state, action) => {
            console.log({ action })
            state.listCategorySales = action.payload?.data;
        },
        setListServiceSales: (state, action) => {
            state.listServiceSales = action.payload?.data;
        },
        setListProductCategorySales: (state, action) => {
            state.listProductCategorySales = action.payload?.data;
        },
        setListProductSales: (state, action) => {
            state.listProductSales = action.payload?.data;
        },
        setListPaymentMethod : (state, action) =>{
            state.listPaymentMethod = action.payload?.data;
        },
        setListMarketingEffciency : (state, action) =>{
            state.listMarketingEffciency = action.payload?.data;
        },
        setServiceDurationStaffDetail : (state , action) =>{
            state.serviceDurationStaffDetail = action.payload?.data;
        }
    },
});

const { actions, reducer } = reportSlice;

let reviewReducer = persistReducer(
    {
        key: 'report',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: reviewReducer,
    actions: { ...actions },
};