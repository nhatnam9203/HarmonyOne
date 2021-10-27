import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.settlement';
const initialState = {
    batchHistory: [],
};

const settlemtSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setBatchHistory: (state, action) => {
            console.log({ action })
            if (action?.payload?.currentPage == 1) {
                state.batchHistory = action?.payload?.data;
            } else {
                state.batchHistory = state.batchHistory.concat(action?.payload?.data);
            }
            state.pages = action?.payload?.pages;
            state.count = action?.payload?.count;
        }
    },
});

const { actions, reducer } = settlemtSlice;

let settlementReducrer = persistReducer(
    {
        key: 'settlement',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: settlementReducrer,
    actions: { ...actions },
};