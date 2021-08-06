import { configureStore } from '@reduxjs/toolkit';
import activateSlice from './activateSlice';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    activate: activateSlice
  },
})