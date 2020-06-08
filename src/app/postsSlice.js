/* eslint-disable no-param-reassign */
// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import * as api from "./api";

const postsAdapter = createEntityAdapter();

export const fetchTop50 = createAsyncThunk(
  "posts/fetchTop50",
  async () => {
    console.log("dispatched fetchTop50 action");
    const response = await api.fetchTop50();
    return response;
  },
  {
    condition: (foo, thunkApi) => {
      const { getState, requestId } = thunkApi;
      const { currentRequestId, loading } = getState().posts;
      return !(loading && requestId === currentRequestId);
    },
  }
);

export const slice = createSlice({
  name: "users",
  initialState: {
    selectedPost: null,
    ...postsAdapter.getInitialState({ loading: false, currentRequestId: null }),
  },
  reducers: {
    selectPost: (state, action) => {
      const post = state.entities[action.payload];
      post.unread = false;
      state.selectedPost = post;
    },
    dismissPost: postsAdapter.removeOne,
    dismissAllPosts: postsAdapter.removeAll,
  },
  extraReducers: {
    [fetchTop50.fulfilled]: (state, action) => {
      console.log("fetch fullfilled", action.payload);
      if (Array.isArray(action.payload)) postsAdapter.upsertMany(state, action.payload);
      state.loading = false;
      state.currentRequestId = null;
    },
    [fetchTop50.pending]: (state, action) => {
      if (!state.loading) {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      }
    },
  },
});
export const actions = { ...slice.actions, fetchTop50 };
export const selectors = postsAdapter.getSelectors((state) => state.posts);

const { reducer } = slice;
export default reducer;
