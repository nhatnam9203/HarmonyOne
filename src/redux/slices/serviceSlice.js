import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.service';
const initialState = {
    services: [],
};

const serviceSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setServiceList: (state, action) => {
            state.services = action.payload;
        }
    },
});

const { actions, reducer } = serviceSlice;

let serviceReducer = persistReducer(
    {
        key: 'service',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: serviceReducer,
    actions: { ...actions },
};