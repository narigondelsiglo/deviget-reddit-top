/* eslint-disable no-param-reassign */
// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import fetchTop50RedditPosts from "app/api";

const postsAdapter = createEntityAdapter();

export const fetchTop50 = createAsyncThunk("posts/fetchTop50", async () => {
  const response = await fetchTop50RedditPosts();
  return response.data;
});

export const slice = createSlice({
  name: "users",
  initialState: {
    selectPost: null,
    ...postsAdapter.getInitialState({ loading: false, activeRequestId: null }),
  },
  reducers: {
    selectPost: (state, action) => {
      state.selectedPost = state.entities.find((p) => p.id === action.payload);
    },
    dismissPost: postsAdapter.removeOne,
    dismissAllPosts: postsAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTop50.fulfilled, (state, action) => {
      postsAdapter.upsertMany(state, action.payload);
    });
  },
});
export const { actions } = slice;

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
