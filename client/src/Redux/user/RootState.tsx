// RootState.ts

import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../user/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers if you have them
});

export type RootState = ReturnType<typeof rootReducer>;
