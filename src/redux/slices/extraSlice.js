import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.extra';
const initialState = {
    extras: [],
};

const serviceSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setExtraList: (state, action) => {
            state.extras = action.payload;
        }
    },
});

const { actions, reducer } = serviceSlice;

let extraReducer = persistReducer(
    {
        key: 'extra',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: extraReducer,
    actions: { ...actions },
};