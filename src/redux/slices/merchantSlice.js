import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.merchant';
const initialState = {
    merchantDetail: {},
};

const merchantSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setMerchantDetail: (state, action) => {
            state.merchantDetail = action.payload;
        }
    },
});

const { actions, reducer } = merchantSlice;

let merchantReducer = persistReducer(
    {
        key: 'merchant',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: merchantReducer,
    actions: { ...actions },
};