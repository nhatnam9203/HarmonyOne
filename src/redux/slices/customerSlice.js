import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { useAxiosQuery, getListCustomer } from '../../apis/routes';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.customer';
const initialState = {
    customerList: [],
    customerDetail: {},
};

const customerSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setCustomerDetail: (state, action) => {
            state.customerDetail = action.payload;
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