import React from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";

import moment from "moment";
import { actions } from "../app/postsSlice";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    padding: 2,
    cursor: "pointer",
  },
  title: {
    fontSize: 14,
  },
}));

export default function PostListItem({ post }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id, author, title, thumbnail, time, comments, unread } = post;

  return (
    <>
      <Card
        data-testid={`PostListItem-${id}`}
        className={classes.root}
        onClick={() => dispatch(actions.selectPost(id))}
      >
        <CardContent className={classes.root}>
          <Box display="flex">
            <Box p={1}>{unread ? <MailOutlinedIcon /> : <DraftsOutlinedIcon />}</Box>
            <Box p={1} flexGrow={1} textAlign="left">
              <b>{author}</b>
            </Box>
            <Box p={1}>{moment.unix(time).fromNow()}</Box>
          </Box>
          <Box display="flex">
            <Box>{thumbnail && <img src={thumbnail} alt="" />}</Box>
            <Box p={1} flexGrow={1} textAlign="left">
              {title}
            </Box>
          </Box>
        </CardContent>
        <CardActions display="flex">
          <Button
            variant="contained"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={(e) => dispatch(actions.dismissPost(id)) && e.stopPropagation()}
          >
            Dismiss post
          </Button>
          <Box p={1} flexGrow={1} textAlign="right">
            {comments} comments
          </Box>
        </CardActions>
      </Card>
      <Divider />
    </>
  );
}
