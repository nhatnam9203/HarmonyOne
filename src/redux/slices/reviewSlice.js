import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.review';
const initialState = {
    summary: {},
    listReviews: [],
    pages: 0,
    count: 0
};

const reviewSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setSummaryReview: (state, action) => {
            state.summary = action.payload;
        },
        setListReview: (state, action) => {
            if (action?.payload?.currentPage == 1) {
                state.listReviews = action?.payload?.data;
            } else {
                state.listReviews = state.listReviews.concat(action?.payload?.data);
            }
            state.pages = action?.payload?.pages;
            state.count = action?.payload?.count;
        },
        updateStatusReview : (state,action) =>{
            let ratingIndex = state.listReviews.findIndex(item => item.staffRatingId == action.payload?.staffRatingId);
            if(ratingIndex !== -1){
                if(action.payload.status == "hidden"){
                    state.listReviews[ratingIndex].isDisabled = 1;
                }else{
                    state.listReviews[ratingIndex].isDisabled = 0;
                }
            }
        }
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