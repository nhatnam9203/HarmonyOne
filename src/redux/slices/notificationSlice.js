import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducerName = 'hpo.notification';
const initialState = {
    notifications: [],
    countUnread: 0
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
            state.count = action?.payload?.count;
        },
        setCountUnread: (state, action) => {
            state.countUnread = action.payload;
        },
        changeNotifyRead : (state, action) => {
            const index = state.notifications.findIndex(obj => obj?.merchantNotificationId == action.payload);
            console.log({ index });
            if (index !== -1) {
                state.notifications[index].view = 1;
            }
        }
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