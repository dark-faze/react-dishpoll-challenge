import React from "react";
import Login from "./components/Login";
import { selectUser } from "./redux/userSlice";
import { useSelector } from "react-redux";
import Logout from "./components/Logout";
import "./App.css";

const App = () => {
  const userName = useSelector(selectUser);
  console.log(userName);

  return <div>{userName ? <Logout /> : <Login />}</div>;
};

export default App;