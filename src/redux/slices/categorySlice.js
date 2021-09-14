import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.category';
const initialState = {
    category: [],
};

const serviceSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setCategoryList: (state, action) => {
            state.category = action.payload;
        }
    },
});

const { actions, reducer } = serviceSlice;

let categoryReducer = persistReducer(
    {
        key: 'category',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: categoryReducer,
    actions: { ...actions },
};