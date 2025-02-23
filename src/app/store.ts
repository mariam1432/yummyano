// store.js

import { configureStore } from '@reduxjs/toolkit';
import { combinedApiSlice } from './features/apiSlice'; // Import your combined API slice
import { combineReducers } from 'redux';

// Combine reducers if needed (optional)
const rootReducer = combineReducers({
  // Add other reducers here if you have any
  [combinedApiSlice.reducerPath]: combinedApiSlice.reducer,
});

// Create the Redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(combinedApiSlice.middleware), // Add middleware for handling RTK Query requests
});

// Export types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
