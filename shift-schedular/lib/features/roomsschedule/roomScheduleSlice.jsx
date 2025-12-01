/**
 * @author Sneha T
 */

import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
/**Initial state to store schedule */
const initialState = {
  list: []
};

const roomScheduleSlice = createSlice({
  name: "roomscheduleslice",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      state.list.push({ id: uuidv4(), ...action.payload });
    },
    removeAssignment: (state, action) => {
      state.list = state.list.filter(a => a.id !== action.payload.id);
    },

     loadScheduleFromStorage: (state, action) => {
      state.list = action.payload;
    },
  }
});

export const { addAssignment, removeAssignment,loadScheduleFromStorage } = roomScheduleSlice.actions;

export default roomScheduleSlice;   

