import { createSlice } from '@reduxjs/toolkit'

/**Initial state to store block */
const initialState = {
  list: []
}

/**
 *  Create a slice of Block
 */
const blockSlice = createSlice({

  name: 'blockslice',

  initialState,

  reducers: {

    addBlock: (state, action) => {

      state.list.push({ id: Date.now(), ...action.payload })
    },
    
    loadBlocksFromStorage: (state, action) => {
      state.list = action.payload;
    },

    updateBlock: (state, action) => {
      const index = state.list.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },

    deleteBlock: (state, action) => {
      state.list = state.list.filter(item => item.id !== action.payload.id);
    }
  }
})

export const { addBlock, updateBlock, deleteBlock, loadBlocksFromStorage } = blockSlice.actions;
export default blockSlice;