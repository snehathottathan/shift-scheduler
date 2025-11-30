import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { quotesApiSlice } from "./features/quotes/quotesApiSlice";
import shiftSlice from "./features/shift/shiftSlice";

// Combine reducers (shiftSlice + RTK Query slice)
const rootReducer = combineSlices(
  shiftSlice,
  quotesApiSlice
);

// Create the Redux store (supports SSR for Next.js)
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(quotesApiSlice.middleware),
  });
};
