import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";

export default function PostListItem({ post }) {
  const { id, author, title, imgUrl, time, comments } = post;

  return (
    <ListItem role={undefined} onClick={() => console.log("post click")}>
      {imgUrl && <img src={imgUrl} alt={title} />}
      <ListItemText>
        <h5>{title}</h5>
      </ListItemText>
      <ListItemText>{author}</ListItemText>
      <Badge badgeContent={post.comments} max={9999} color="primary">
        <CommentIcon />
      </Badge>
    </ListItem>
  );
}
