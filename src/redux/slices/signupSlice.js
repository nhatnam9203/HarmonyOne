import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.signupPos';
const initialState = {
    generalInfor: {},
    businessInformation : {},
    bankInformation : {},
    principalInfo : {},
    packages : [],
    type : "",
};

const signupSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        updateGeneralInformation: (state, action) => {
            state.generalInfor = action.payload?.generalInfor;
            state.type = action.payload?.type;
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

        setPackages : (state , action) =>{
            state.packages = action.payload;
        },

        reset: (state) => {
            state.generalInfor = {};
            state.businessInformation = {};
            state.bankInformation = {};
            state.principalInfo = {};
            state.packages = [];
            state.type = "",
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