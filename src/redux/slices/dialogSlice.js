import {createSlice} from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    isOpen: false,
  },

  reducers: {
    toggleOpen: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
})

export const {toggleOpen} = dialogSlice.actions;
export default dialogSlice.reducer;