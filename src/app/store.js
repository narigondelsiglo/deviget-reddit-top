import { configureStore } from "@reduxjs/toolkit";
import throttle from "lodash/throttle";
import postsReducer from "./postsSlice";
import { loadState, saveState } from "./localStorage";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(
  throttle(() => {
    saveState({
      posts: store.getState().posts,
    });
  }, 1000)
);

export default store;
