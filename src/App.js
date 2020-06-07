import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppLayout from "./components/AppLayout";

import "./App.css";

function App() {
  const loading = useSelector((state) => state.posts.loading);
  return !loading ? (
    <Backdrop open>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <AppLayout />
  );
}

export default App;
