import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedStatus: "All",
  selectedPriority: "All",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setPriority: (state, action) => {
      state.selectedPriority = action.payload;
    },
  },
});

export const { setStatus, setPriority } = filterSlice.actions;

export default filterSlice.reducer;
