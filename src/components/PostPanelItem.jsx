import React from "react";
import { useDispatch } from "react-redux";
import saveAs from "file-saver";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import moment from "moment";
import { actions } from "../app/postsSlice";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    padding: 2,
  },
  title: {
    fontSize: 14,
  },
  image: {
    maxWidth: 400,
  },
}));

export default function PostListItem({ post }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id, author, title, time, comments, thumbnail, image } = post;

  const handleDownloadImage = async () => {
    // Use external proxy to avoid CORS security restriction
    return saveAs(
      `https://cors-anywhere.herokuapp.com/${image}`,
      `${id}.${image.split(/[#?]/)[0].split(".").pop().trim()}`
    );
  };

  return (
    <Card className={classes.root} onClick={() => dispatch(actions.selectPost(id))}>
      <CardContent className={classes.root}>
        <Box display="flex">
          <Box p={1} flexGrow={1} textAlign="left">
            <b>{author}</b>
          </Box>
          <Box p={1}>{moment.unix(time).fromNow()}</Box>
        </Box>

        <Box>{(image || thumbnail) && <img className={classes.image} src={image || thumbnail} alt={title} />}</Box>
        <Box p={1} textAlign="left">
          {title}
        </Box>
      </CardContent>
      <CardActions display="flex">
        {image && (
          <Button variant="contained" size="small" flex="none" startIcon={<SaveIcon />} onClick={handleDownloadImage}>
            Download full resolution image
          </Button>
        )}
        <Box p={1} flexGrow={1} textAlign="right">
          {comments} comments
        </Box>
      </CardActions>
    </Card>
  );
}
