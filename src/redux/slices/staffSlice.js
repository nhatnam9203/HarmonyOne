import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.staff';
const initialState = {
    staffsByDate: [],
};

const staffSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setStaffByDate: (state, action) => {
            state.staffsByDate = action.payload;
        }
    },
});

const { actions, reducer } = staffSlice;

let staffReducer = persistReducer(
    {
        key: 'staff',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: staffReducer,
    actions: { ...actions },
};