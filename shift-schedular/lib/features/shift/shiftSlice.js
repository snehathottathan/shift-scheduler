import { createSlice } from '@reduxjs/toolkit'

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

            state.list.push({ id: Date.now(), ...action.payload })
        },

        upadateShift: (state, action) => {

            const index = state.list.findIndex(s => s.id === action.payload.id);
            if (index !== -1) state.list[index] = action.payload;

        },
        deleteShift: (state, action) => {
            state.list = state.list.filter((data) => data.id !== action.payload.id)
        }
    }
})

export const {addShift,upadateShift,deleteShift} = shiftSlice.actions;
export default shiftSlice.reducer;