import { createSlice } from "@reduxjs/toolkit";

export const initState = {
  categories: [],
  loading: true,
};

const categoriesSlice = createSlice({
  name: "categoriesStore",
  initialState: initState,
  reducers: {
    updateCategories: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
    resetCategories: () => initState,
  },
});

export const { updateCategories, resetCategories } = categoriesSlice.actions;
export default categoriesSlice;
