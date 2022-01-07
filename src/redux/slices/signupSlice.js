import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.signupPos';
const initialState = {
    generalInformation: {},
    businessInformation : {},
    bankInformation : {},
    principalInfo : {},
};

const signupSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        updateGeneralInformation: (state, action) => {
            state.generalInformation = action.payload;
        },

        updateBusinessInformation : (state, action) =>{
            state.businessInformation = action.payload;
        },

        updateBankInformation : (state , action) =>{
            state.bankInformation = action.payload;
        },

        updatePrincipalInformation : (state, action) =>{
            state.principalInfo = action.payload;
        },

        reset: (state) => {
            state.generalInformation = {};
            state.businessInformation = {};
            state.bankInformation = {};
            state.principalInfo = {};
        }
    },
});

const { actions, reducer } = signupSlice;

let staffReducer = persistReducer(
    {
        key: 'signup',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: staffReducer,
    actions: { ...actions },
};