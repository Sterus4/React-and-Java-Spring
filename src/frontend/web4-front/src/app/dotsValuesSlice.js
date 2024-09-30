import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    x: 1,
    y: 1,
    r: 3
}

export const dotSlice = createSlice({
    name: "dotInfo",
    initialState,
    reducers: {
        setX: (state, action) => {
            state.x = action.payload;
        },
        setY: (state, action) => {
            state.y = action.payload;
        },
        setR: (state, action) => {
            state.r = action.payload;
        }
    }
})
export const {setX, setY, setR} = dotSlice.actions;

export default dotSlice.reducer