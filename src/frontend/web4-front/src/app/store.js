import {configureStore} from "@reduxjs/toolkit";
import hitsReducer from "./hitSlice"
import dotReduces from "./dotsValuesSlice"
export const store = configureStore({
    reducer: {
        hits: hitsReducer,
        dotInfo: dotReduces
    }
})