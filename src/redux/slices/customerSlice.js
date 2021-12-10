import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { useAxiosQuery, getListCustomer } from '../../apis/routes';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.customer';
const initialState = {
    customerList: [],
    customerDetail: {},
    pages : 0,
    count : 0,
    stateCity : [],
};

const customerSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setCustomerDetail: (state, action) => {
            state.customerDetail = action.payload;
        },
        setCustomerList : (state,action) =>{
            if (action?.payload?.currentPage == 1) {
                state.customerList = action?.payload?.data;
            } else {
                state.customerList = state.customerList.concat(action?.payload?.data);
            }
            state.pages = action?.payload?.pages;
            state.count = action?.payload?.count;
        },
        setStateCity : (state, action) =>{
            state.stateCity = action.payload;
        }
    },
});

const { actions, reducer } = customerSlice;

let customerReducer = persistReducer(
    {
        key: 'customer',
        storage: AsyncStorage,
        whitelist: ['customerList'],
    },
    reducer,
);

module.exports = {
    reducer: customerReducer,
    actions: { ...actions },
};