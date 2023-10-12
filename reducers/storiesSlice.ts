import { createSlice } from "@reduxjs/toolkit";
import { StoryDetailModel } from "@/models/new_model";
export const initState = {
  stories: {
    current: 0,
    hasNext: false,
    data: [],
    numPages: 0,
    total: 0,
  },
  isLoading: true,
};

const storiesSlice = createSlice({
  name: "storiesStore",
  initialState: initState,
  reducers: {
    updateStories: (state, action) => {
      state.stories = action.payload;
      state.isLoading = false;
    },
    deleteStory: (state, action) => {
      state.stories.data = state.stories.data.filter(
        (item: StoryDetailModel) => item.code !== action.payload
      );
      state.isLoading = false;
    },
    resetStories: () => initState,
  },
});

export const { updateStories, deleteStory, resetStories } =
  storiesSlice.actions;
export default storiesSlice;
