import { createSlice } from "@reduxjs/toolkit";
export const initState = {
  loading: true,
  predictionInfo: {
    current: 1,
    hasNext: false,
    items: [],
    numPages: 0,
    total: 0,
  },
  prediction: {
    data: [],
    usableExperience: 0,
  },
  upComingMatches: [],
};

const matchSlice = createSlice({
  name: "matchStore",
  initialState: initState,
  reducers: {
    updateUpcomingMatches: (state, action) => {
      state.upComingMatches = action.payload;
      state.loading = false;
    },
    updatePrediction: (state, action) => {
      state.prediction = action.payload;
      state.loading = false;
    },
    updatePredictionInfo: (state, action) => {
      state.predictionInfo = action.payload;
      state.loading = false;
    },
    cancelPrediction: (state, action) => {
      state.predictionInfo.items = state.predictionInfo.items.filter(
        (item: any) => item.code !== action.payload
      );
      state.loading = false;
    },
    resetMatchStore: () => initState,
  },
});

export const {
  updatePrediction,
  updatePredictionInfo,
  cancelPrediction,
  resetMatchStore,
  updateUpcomingMatches,
} = matchSlice.actions;
export default matchSlice;
