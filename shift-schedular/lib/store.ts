import { combineSlices, configureStore } from "@reduxjs/toolkit";
// import { quotesApiSlice } from "./features/quotes/quotesApiSlice";
import shiftSlice from "./features/shift/shiftSlice";
import blockSlice from "./features/block/blockSlice";
import roomSlice from "./features/room/roomSlice";
// Combine reducers (shiftSlice + RTK Query slice)
const rootReducer = combineSlices(
  shiftSlice,
  blockSlice,
  roomSlice
  // quotesApiSlice
);

// Create the Redux store (supports SSR for Next.js)
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(quotesApiSlice.middleware),
  });
};
