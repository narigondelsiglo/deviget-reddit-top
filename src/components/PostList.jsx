import React from "react";
import { useSelector, useDispatch } from "react-redux";

import LinearProgress from "@material-ui/core/LinearProgress";
import { actions } from "app/postsSlice";
import PostListItem from "./PostListItem";

export default function PostList() {
  const postsList = useSelector((state) => state.posts.entities);
  const loading = useSelector((state) => state.posts.loading);
  return loading ? (
    <LinearProgress />
  ) : (
    <>
      {Object.values(postsList).map((post) => {
        return <PostListItem key={post.id} post={post} />;
      })}
    </>
  );
}
