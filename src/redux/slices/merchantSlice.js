import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.merchant';
const initialState = {
    merchantDetail: {},
    bannersMerchant : [],
};

const merchantSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setMerchantDetail: (state, action) => {
            console.log('merchat : ', { action })
            state.merchantDetail = action.payload?.merchant ?? action.payload;
        },
        setBannerMerchant : (state, action) =>{
            state.bannersMerchant = action.payload ? action.payload : []
        },
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