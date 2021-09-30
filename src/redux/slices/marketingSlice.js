import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.marketing';
const initialState = {
    promotion: [],
};

const marketingSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setPromotion: (state, action) => {
            state.promotion = action.payload;
        }
    },
});

const { actions, reducer } = marketingSlice;

let marketingReducer = persistReducer(
    {
        key: 'marketing',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: marketingReducer,
    actions: { ...actions },
};