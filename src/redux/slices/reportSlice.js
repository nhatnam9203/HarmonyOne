import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.report';
const initialState = {
    staffSalary: [],
    staffSalary_pages: 0,
    staffSalary_count : 0,

    servicesDuration: [],
    servicesDuration_pages: 0,
    servicesDuration_count : 0
};

const reportSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setListStaffSalary: (state, action) => {
            if (action?.payload?.currentPage == 1) {
                state.staffSalary = action?.payload?.data;
            } else {
                state.staffSalary = state.staffSalary.concat(action?.payload?.data);
            }
            state.staffSalary_pages = action?.payload?.pages;
            state.staffSalary_count = action?.payload?.count;
        },

        setListServiceDuration : (state,action) =>{
            if (action?.payload?.currentPage == 1) {
                state.servicesDuration = action?.payload?.data;
            } else {
                state.servicesDuration = state.servicesDuration.concat(action?.payload?.data);
            }
            state.servicesDuration_pages = action?.payload?.pages;
            state.servicesDuration_count = action?.payload?.count;
        }
    },
});

const { actions, reducer } = reportSlice;

let reviewReducer = persistReducer(
    {
        key: 'report',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: reviewReducer,
    actions: { ...actions },
};