import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
/**Initial state to store shift */
const initialState = {
  list: []
}

/**
 *  Create a slice of shift
 */
const shiftSlice = createSlice({

  name: 'shiftslice',

  initialState,

  reducers: {

    addShift: (state, action) => {

      state.list.push({ id: uuidv4(), ...action.payload })
    },
    loadShiftsFromStorage: (state, action) => {
      state.list = action.payload;
    },

    updateShift: (state, action) => {
      const index = state.list.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },

    deleteShift: (state, action) => {
      state.list = state.list.filter(item => item.id !== action.payload.id);
    }
  }
})

export const { addShift, updateShift, deleteShift, loadShiftsFromStorage } = shiftSlice.actions;
export default shiftSlice;