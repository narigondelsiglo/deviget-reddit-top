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
    dismissPost: (state, key) => {
      console.log(state, key);
      postsAdapter.removeOne(state, key);
    },
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

const { reducer } = slice;
export default reducer;

/*
export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    loading: true,
    list: postsAdapter.getInitialState(),
    selectedPost: null,
  },
  reducers: {
    loadPosts: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    selectPost: (state, action) => {
      state.selectedPost = state.list.find((p) => p.id === action.payload);
    },
    dismissPost: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
    dismissAllPosts: (state) => {
      state.list = [];
    },
  },
});

export const { loadPosts, selectPost, dismissPost, dismissAllPosts } = postsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPosts = (state) => state.posts;

export default postsSlice.reducer;
*/
