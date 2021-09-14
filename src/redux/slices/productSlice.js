import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.product';
const initialState = {
    products: [],
};

const serviceSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setProductList: (state, action) => {
            state.products = action.payload;
        }
    },
});

const { actions, reducer } = serviceSlice;

let productReducer = persistReducer(
    {
        key: 'product',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: productReducer,
    actions: { ...actions },
};