import { createSlice } from "@reduxjs/toolkit";
export const initState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "loadingStore",
  initialState: initState,
  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { updateLoading } = loadingSlice.actions;
export default loadingSlice;
