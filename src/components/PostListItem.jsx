import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";

import { IconButton, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CommentIcon from "@material-ui/icons/Comment";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    padding: 2,
  },
  title: {
    fontSize: 14,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function PostListItem({ post }) {
  const classes = useStyles();

  const { id, author, title, imgUrl, time, comments, unread } = post;

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.root}>
          <Box display="flex">
            <Box p={1}>{unread ? <MailOutlinedIcon /> : <DraftsOutlinedIcon />}</Box>
            <Box p={1} flexGrow={1} textAlign="left">
              <b>{author}</b>
            </Box>
            <Box p={1}>{moment.unix(time).fromNow()}</Box>
          </Box>
          <Box display="flex">
            <Box bgcolor="grey.300">{imgUrl && <img src={imgUrl} alt={title} />}</Box>
            <Box p={1} flexGrow={1} textAlign="left">
              {title}
            </Box>
          </Box>
        </CardContent>
        <CardActions display="flex">
          <Button variant="contained" size="small" startIcon={<DeleteIcon />}>
            Discard post
          </Button>
          <Box p={1} flexGrow={1} textAlign="right">
            {post.comments} comments
          </Box>
        </CardActions>
      </Card>
      <Divider />
    </>
  );
}
