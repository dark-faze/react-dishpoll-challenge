import React from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import DishList from "./components/DishList";
import HomePage from "./components/HomePage";
import LeaderBoards from "./components/LeaderBoards";
import { Route, Routes } from "react-router-dom";

import { selectUser } from "./redux/userSlice";
import { useSelector } from "react-redux";

import "./App.css";

const App = () => {
  const userName = useSelector(selectUser);
  console.log(userName);

  return (
    <>
      {userName ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} exact/>
            <Route path="/dishlist" element={<DishList />} exact/>
            <Route path="/leaderboards" element={<LeaderBoards />} />
          </Routes>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
