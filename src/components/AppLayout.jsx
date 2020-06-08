import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import PropTypes from "prop-types";

import { Button } from "@material-ui/core";

import { actions, selectors } from "../app/postsSlice";

import PostList from "./PostList";
import PostPanelItem from "./PostPanelItem";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  bottomBar: {
    position: "sticky",
    bottom: 0,
    height: 35,
    width: "100%",
  },
  drawerPaper: {
    width: drawerWidth,
    cursor: "pointer",
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function AppLayout() {
  const classes = useStyles();
  const theme = useTheme();
  const loading = useSelector((state) => state.posts.loading);
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  const postsCount = useSelector(selectors.selectTotal);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(true);

  if (!loading && postsCount === 0) {
    dispatch(actions.fetchTop50());
  }

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawer = (
    <Box display="flex" flexDirection="column">
      <PostList flexGrow={1} />
      <Box className={classes.bottomBar} textAlign="center" bgcolor="grey.200">
        <Button variant="text" startIcon={<DeleteIcon />} onClick={() => dispatch(actions.dismissAllPosts())}>
          Dismiss All
        </Button>
      </Box>
    </Box>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Reddit Top Posts
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Post list">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="persistent"
          open={open}
        >
          {drawer}
        </Drawer>
      </nav>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.toolbar} />
        {selectedPost ? (
          <PostPanelItem post={selectedPost} />
        ) : (
          <>
            <Typography paragraph>Hello! This is an application that fetches the top 50 posts from Reddit</Typography>
            <Typography paragraph>
              {loading
                ? "The posts are loading, please wait..."
                : "Select a post from the left panel to expand the contents"}
            </Typography>
          </>
        )}
      </main>
    </div>
  );
}
