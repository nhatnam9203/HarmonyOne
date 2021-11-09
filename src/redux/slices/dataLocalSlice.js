import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.dataLocal';
const initialState = {
    isQuickLogin: false,
};

const dataLocalSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setQuickLogin: (state, action) => {
            state.isQuickLogin = action.payload;
        },
    },
});

const { actions, reducer } = dataLocalSlice;

let dataLocalReducer = persistReducer(
    {
        key: 'dataLocal',
        storage: AsyncStorage,
    },
    reducer,
);

module.exports = {
    reducer: dataLocalReducer,
    actions: { ...actions },
};