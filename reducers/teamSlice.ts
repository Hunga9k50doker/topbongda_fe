import { createSlice } from "@reduxjs/toolkit";
export const initState = {
  info: {},
  fans: {
    current: 1,
    numPages: 1,
    hasNext: false,
    hasPrevious: false,
    items: [],
  },
  members: [],
  topics: [],
  news: [],
  topTeams: [],
  isLoading: true,
};

const teamSlice = createSlice({
  name: "teamStore",
  initialState: initState,
  reducers: {
    updateTeamFans: (state, action) => {
      state.fans = action.payload;
      state.isLoading = false;
    },
    updateTopTeams: (state, action) => {
      state.topTeams = action.payload;
      state.isLoading = false;
    },
    updateTeamMembers: (state, action) => {
      state.members = action.payload;
      state.isLoading = false;
    },
    updateTeamInfo: (state, action) => {
      state.info = action.payload;
      state.isLoading = false;
    },
    updateTeamTopics: (state, action) => {
      state.topics = action.payload;
      state.isLoading = false;
    },
    updateTeamNews: (state, action) => {
      state.news = action.payload;
      state.isLoading = false;
    },
    resetTeamStore: () => initState,
  },
});

export const {
  updateTeamFans,
  updateTeamInfo,
  updateTeamNews,
  updateTeamMembers,
  updateTopTeams,
  updateTeamTopics,
  resetTeamStore,
} = teamSlice.actions;
export default teamSlice;
