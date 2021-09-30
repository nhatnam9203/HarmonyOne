import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.marketing';
const initialState = {
    promotion: [],
    marketPlaces: [],
    pagesMarketPace: 0,
};

const marketingSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setPromotion: (state, action) => {
            state.promotion = action.payload;
        },
        setMarketPlaces: (state, action) => {
            if (action?.payload?.currentPage == 1) {
                state.pagesMarketPace = action?.payload?.data;
            } else {
                state.pagesMarketPace = state.pagesMarketPace.concat(action?.payload?.data);
            }
            state.pagesMarketPace = action?.payload?.pages;
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