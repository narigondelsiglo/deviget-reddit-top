import React from "react";

import Box from "@material-ui/core/Box";
import { TransitionGroup } from "react-transition-group";
import Slide from "@material-ui/core/Slide";
import LinearProgress from "@material-ui/core/LinearProgress";
import PostListItem from "./PostListItem";

export default function PostList({ loading, postsList }) {
  switch (true) {
    case loading:
      return <LinearProgress />;
    case Object.values(postsList).length === 0:
      return <Box>No posts loaded</Box>;
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
