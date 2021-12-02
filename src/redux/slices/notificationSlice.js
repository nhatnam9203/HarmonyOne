import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.notification';
const initialState = {
    notifications: [],
    countUnread: 0,

    notifications_roleStaff: [],
    countUnread_roleStaff: 0,
    pages_roleStaff: 1,
};

const notificationSlice = createSlice({
    name: reducerName,
    initialState: initialState,
    reducers: {
        setNotificationList: (state, action) => {
            if (action?.payload?.currentPage == 1) {
                state.notifications = action?.payload?.data;
            } else {
                state.notifications = state.notifications.concat(action?.payload?.data);
            }
            state.pages = action?.payload?.pages;
        },

        setCountUnread: (state, action) => {
            state.countUnread = action.payload;
        },

        setCountUnread_roleStaff : (state, action) =>{
            state.countUnread_roleStaff = action?.payload?.count;
        },

        changeNotifyRead: (state, action) => {
            const index = state.notifications.findIndex(obj => obj?.merchantNotificationId == action.payload);
            if (index !== -1) {
                state.notifications[index].view = 1;
            }
        },

        changeNotifyRoleStaffRead: (state, action) => {
            const index = state.notifications_roleStaff.findIndex(obj => obj?.staffNotificationId == action.payload);
            if (index !== -1) {
                state.notifications_roleStaff[index].isDisabled = 1;
            }
        },


        setNotificationList_roleStaff: (state, action) => {
            if (action?.payload?.currentPage == 1) {
                state.notifications_roleStaff = action?.payload?.data;
            } else {
                state.notifications_roleStaff = state.notifications_roleStaff.concat(action?.payload?.data);
            }
            state.pages_roleStaff = action?.payload?.pages;
            state.countUnread_roleStaff = action?.payload?.count;
        },
    },
});

const { actions, reducer } = notificationSlice;

let notificationReducer = persistReducer(
    {
        key: 'notification',
        storage: AsyncStorage,
        whitelist: [],
    },
    reducer,
);

module.exports = {
    reducer: notificationReducer,
    actions: { ...actions },
};
