import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    hits: []
}

export const hitSlice = createSlice({
    name: 'hits',
    initialState,
    reducers: {
        save: (state, action) => {
            state.hits = action.payload;
        }
    }
})

export const { save } = hitSlice.actions

export default hitSlice.reducer