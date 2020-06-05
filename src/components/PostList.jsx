import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import PostListItem from "./PostListItem";

import posts from "../app/api";

export default function PostList() {
  return (
    <List>
      {posts.map((post) => {
        return <PostListItem key={post.id} post={post} />;
      })}
    </List>
  );
}
