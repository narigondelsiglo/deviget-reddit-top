// test-utils.js
import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";

import postsReducer from "./postsSlice";

// posts mock data
const postsList = {
  h0nv2s: {
    id: "h0nv2s",
    author: "Atomic_Panda95",
    thumbnail: "https://b.thumbs.redditmedia.com/DgOO-r08kYEpru1o1cUsg1WwuY0PDTUnyaMANBtSFYs.jpg",
    image: "https://preview.redd.it/0bvasgnea6451.jpg?auto=webp&s=2365a90e83e9eca1556543cbbf865aa3204d1c91",
    title: "My local supermarket made a garden on their roof and is distributing the goods directly in store!",
    time: 1591834132,
    comments: 1551,
    unread: false,
  },
  h0ccvu: {
    id: "h0ccvu",
    author: "Slaughterpig09",
    thumbnail: "https://a.thumbs.redditmedia.com/4MFnr10fBYEQXGnxyYzv5xnYRe28ZgFnOS8_nTQ9ED0.jpg",
    image:
      "https://external-preview.redd.it/njDz7dMcb4_d_1HzCd_z4cInHhA_3UvMXhjXEzUkhwk.jpg?auto=webp&s=9cfb6ce084e638810ae69bfe7a874de32faf9345",
    title: "Preacher speaks out against gay rights and then...wait for it.",
    time: 1591800060,
    comments: 4688,
    unread: true,
  },
  h0enoh: {
    id: "h0enoh",
    author: "lol62056",
    thumbnail: "https://b.thumbs.redditmedia.com/z7tzofnYcL-HCLiV2NaVdKN0nBCpYETdEO0jCfRJL2w.jpg",
    image:
      "https://external-preview.redd.it/vpB95cac-xAIT7W4wuwvkj1IzB8khr9ncifpBcOveNM.png?format=pjpg&auto=webp&s=8b73a39fb6e89b914a65794ebabff23688150dfa",
    title: "He tried to put it back",
    time: 1591807548,
    comments: 1209,
    unread: false,
  },
  h0ee4f: {
    id: "h0ee4f",
    author: "TheTerminator2000",
    thumbnail: "https://b.thumbs.redditmedia.com/FIrTzWDn-nuF7mw9nWZ4zeTBbpsLmgyxxwRTetSBExc.jpg",
    image: "https://preview.redd.it/l84p8qj914451.jpg?auto=webp&s=c0860c29ecb2b983a7e835b04609309e1392354e",
    title: "How the turntables...",
    time: 1591806770,
    comments: 781,
    unread: true,
  },
};

const defaultStore = (
  initialState = {
    posts: {
      entities: postsList,
      ids: Object.keys(postsList),
      selectedPost: null,
      loading: false,
    },
  }
) =>
  configureStore({
    reducer: {
      posts: postsReducer,
    },
    preloadedState: initialState,
  });

const postsInitialState = {
  posts: {
    entities: postsList,
    ids: Object.keys(postsList),
    selectedPost: null,
    loading: false,
  },
};

function render(ui, { initialState = postsInitialState, store = defaultStore(initialState), ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
