import { combineReducers } from "redux";
import userSlice from "./userSlice";
import loadingSlice from "./loadingSlice";
import teamSlice from "./teamSlice";
import systemSlice from "./systemSlice";
import commentsSlice from "./commentsSlice";
import topicsSlice from "./topicsSlice";
import matchSlice from "./matchSlice";
import categoriesSlice from "./categoriesSlice";
import storiesSlice from "./storiesSlice";

const rootReducer = combineReducers({
  userStore: userSlice.reducer,
  loadingStore: loadingSlice.reducer,
  teamStore: teamSlice.reducer,
  systemStore: systemSlice.reducer,
  commentsStore: commentsSlice.reducer,
  topicsStore: topicsSlice.reducer,
  categoriesStore: categoriesSlice.reducer,
  matchStore: matchSlice.reducer,
  storiesStore: storiesSlice.reducer,
});

export default rootReducer;
