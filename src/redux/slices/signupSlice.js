import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.signupPos';
const initialState = {
    generalInfor: {},
    businessInformation : {},
    bankInfor : {},
    principalInfo : {},
    packages : [],
    packagePricing : 1,
    type : "",
    sameAsBusiness : true,
};

const signupSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        updateGeneralInformation: (state, action) => {
            state.generalInfor = action.payload?.generalInfor;
            state.type = action.payload?.type;
            state.sameAsBusiness = action?.payload?.sameAsBusiness
        },

        updateBusinessInformation : (state, action) =>{
            state.businessInformation = action.payload;
        },

        updateBankInformation : (state , action) =>{
            state.bankInfor = action.payload;
        },

        updatePrincipalInformation : (state, action) =>{
            state.principalInfo = action.payload;
        },

        updatePackagePricing : (state , action) =>{
            state.packagePricing = action.payload;
        },

        setPackages : (state , action) =>{
            state.packages = action.payload;
        },

        reset: (state) => {
            state.generalInfor = {};
            state.businessInformation = {};
            state.bankInfor = {};
            state.principalInfo = {};
            state.packages = [];
            state.type = "";
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