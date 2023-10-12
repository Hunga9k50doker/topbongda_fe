import { TopicDetailModel } from "@/models/topic_model";
import { createSlice } from "@reduxjs/toolkit";
export const initState = {
  data: {
    avatarSet: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
      og: "",
    },
    coverSet: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
      og: "",
    },
    email: "",
    emailVerified: "",
    username: "",
    dateJoined: "",
    birthYear: "",
    code: "",
    exp: 0,
    favoriteTeam: {
      name: "",
      icon: "",
      numFans: 0,
      url: "",
    },
    facebook: "",
    twitter: "",
    tiktok: "",
    favoriteTeamOther: "",
    levelIndex: 0,
    levelName: "",
    levelColor: "",
    nextLevel: {
      name: "",
      index: 0,
      percent: 0,
      requiredExp: 0,
      requiredBreak: null,
    },
    location: "",
    numComments: 0,
    numTopics: 0,
    phoneNumber: 0,
    updatedAt: "",
    name: "",
    url: "",
    fullUrl: "",
    userTitle: "",
    isAuth: false,
    numUnreadNotifications: 0,
    isVerifiedEmail: false,
    mycomments: {},
    myLikes: [],
    socialLoginUrls: {},
    followMatches: [],
    followTeams: [],
  },
  topUser: [],
  isLoading: true,
};

const userSlice = createSlice({
  name: "userStore",
  initialState: initState,
  reducers: {
    updateUser: (state, action) => {
      state.data = { ...state.data, ...action.payload };
      state.isLoading = false;
    },
    updateTopUser: (state, action) => {
      state.topUser = action.payload;
      state.isLoading = false;
    },
    updateFollowMatchs: (state, action) => {
      state.data.followMatches = action.payload;
      state.isLoading = false;
    },
    updateFollowTeams: (state, action) => {
      state.data.followTeams = action.payload;
      state.isLoading = false;
    },

    updateListLike: (state, action) => {
      state.data.myLikes = { ...state.data.myLikes, ...action.payload };
      state.isLoading = false;
    },
    deleteFollowMatch: (state, action) => {
      state.data.followMatches = state.data.followMatches.filter(
        (item) => item !== action.payload
      );
      state.isLoading = false;
    },
    deleteFollowTeam: (state, action) => {
      state.data.followTeams = state.data.followTeams.filter(
        (item) => item !== action.payload
      );
      state.isLoading = false;
    },

    resetUser: () => initState,
  },
});

export const {
  updateUser,
  resetUser,
  updateListLike,
  updateTopUser,
  updateFollowMatchs,
  deleteFollowMatch,
  updateFollowTeams,
  deleteFollowTeam,
} = userSlice.actions;
export default userSlice;
