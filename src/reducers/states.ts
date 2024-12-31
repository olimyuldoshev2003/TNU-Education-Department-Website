import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const initialState = {
  number: 0,
};

export const statesSlice = createSlice({
  name: "states",
  initialState,
    reducers: {
        changeNumber(state, action) {
            state.number = action.payload
      }
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.states

export default statesSlice.reducer