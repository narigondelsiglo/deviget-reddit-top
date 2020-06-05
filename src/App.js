import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import AppLayout from "./components/AppLayout";

import PostList from "./components/PostList";
import "./App.css";

function App() {
  const loading = false;
  return loading ? (
    <Backdrop open>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <div className="App">
      <AppLayout />
    </div>
  );
}

export default App;
