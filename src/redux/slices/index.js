import appSlice from './appSlice';
import authSlice from './authSlice';

const rootReducers = Object.assign(
  {},
  {
    app: appSlice.reducer,
    auth: authSlice.reducer,
  },
);

module.exports = {
  rootReducers,
  auth: authSlice.actions,
  app: appSlice.actions,
};
