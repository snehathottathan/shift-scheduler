import {createSlice} from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
/**Initial state to store room */
const initialState = {
    list : []
}

/**
 *  Create a slice of Rooms
 */
const roomSlice = createSlice({

   name : 'roomslice',

   initialState,

   reducers : {

    addRooms : (state, action) =>{
        state.list.push({id: uuidv4(),...action.payload})
    },

     loadRoomsFromStorage: (state, action) => {
      state.list = action.payload;
    },

    updateRoom: (state, action) => {
      const index = state.list.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },

    deleteRoom: (state, action) => {
      state.list = state.list.filter(item => item.id !== action.payload.id);
    }
   }
})

export const {addRooms,updateRoom,loadRoomsFromStorage,deleteRoom} = roomSlice.actions;

export default roomSlice;