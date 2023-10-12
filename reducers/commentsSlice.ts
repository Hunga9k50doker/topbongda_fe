import { createSlice } from "@reduxjs/toolkit";
import { ItemCommentModel } from "@/models/comment_model";

export const initState = {
  data: {},
  comments: [],
  childrenComments: {},
} as any;

const commentsSlice = createSlice({
  name: "commentsStore",
  initialState: initState,
  reducers: {
    updateComments: (state, action) => {
      state.comments = action.payload;
    },
    updateComment: (state, action) => {
      const { code } = action.payload;
      state.comments = state.comments.map((item: ItemCommentModel) =>
        item.code === code ? action.payload : item
      );
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (item: ItemCommentModel) => item.code !== action.payload
      );
      delete state.childrenComments[action.payload];
    },

    updateSubComments: (state, action) => {
      state.childrenComments = {
        ...state.childrenComments,
        ...action.payload,
      };
    },

    updateSubComment: (state, action) => {
      const { code, parentCode, parent } = action.payload;
      state.childrenComments[parentCode || parent.code] =
        state.childrenComments[parentCode || parent.code].map(
          (item: ItemCommentModel) =>
            item.code === code ? action.payload : item
        );
    },

    deleteSubComment: (state, action) => {
      const { code, parentCode, parent } = action.payload;
      state.childrenComments[parentCode || parent.code] =
        state.childrenComments[parentCode || parent.code].filter(
          (item: ItemCommentModel) => item.code !== code
        );
    },
    resetComments: () => initState,
  },
});

export const {
  updateComment,
  updateSubComment,
  updateSubComments,
  deleteSubComment,
  updateComments,
  deleteComment,
  resetComments,
} = commentsSlice.actions;
export default commentsSlice;
