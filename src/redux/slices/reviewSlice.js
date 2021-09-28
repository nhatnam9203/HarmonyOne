import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.review';
const initialState = {
    summary : {},
    listReviews : [],
    pages : 0,
    count : 0
};

const reviewSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setSummaryReview: (state, action) => {
            state.summary = action.payload;
        },
        setListReview : (state, action) =>{
            state.listReviews = action?.payload?.data;
            state.pages = action?.payload?.pages;
            state.count = action?.payload?.count;
        },
    },
});

const { actions, reducer } = reviewSlice;

let reviewReducer = persistReducer(
    {
        key: 'review',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: reviewReducer,
    actions: { ...actions },
};