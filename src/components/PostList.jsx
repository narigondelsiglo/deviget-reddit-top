import React from "react";
import { useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";

import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";
import LinearProgress from "@material-ui/core/LinearProgress";
import PostListItem from "./PostListItem";

export default function PostList() {
  const postsList = useSelector((state) => state.posts.entities);
  const loading = useSelector((state) => state.posts.loading);
  switch (true) {
    case loading:
    case Object.values(postsList).length === 0:
      return <LinearProgress />;
    default:
      return (
        <TransitionGroup>
          {Object.values(postsList).map((post) => {
            return (
              <Slide in key={post.id} timeout={800} direction="right" unmountOnExit>
                <Box>
                  <PostListItem post={post} />
                </Box>
              </Slide>
            );
          })}
        </TransitionGroup>
      );
  }
}
