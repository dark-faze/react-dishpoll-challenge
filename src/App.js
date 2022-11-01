import React, { useEffect } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import DishList from "./components/DishList";
import HomePage from "./components/HomePage";
import LeaderBoards from "./components/LeaderBoards";
import { Route, Routes } from "react-router-dom";

import { selectUser } from "./redux/userSlice";
import { populateUsers } from "./redux/userDataSlice";
import { useSelector , useDispatch } from "react-redux";

import "./App.css";

const App = () => {
  const userName = useSelector(selectUser);
  console.log(userName)
  const dispatch = useDispatch()
  
  const populateUsersData = async () => {
    const response = await fetch("https://raw.githubusercontent.com/syook/react-dishpoll/main/users.json") 
    const responseJson = await response.json();
    dispatch(populateUsers(responseJson));

    let usersChoices = [];
    responseJson.map((user) => {
        usersChoices.push({
          username : user.username,
          firstChoice : "",
          secondChoice : "",
          thirdChoice : ""
        })
    })

    localStorage.setItem('userChoices' , JSON.stringify(usersChoices))
    console.log(usersChoices);
  }
  useEffect(() => {
    populateUsersData();
  },[])

  return (
    <>
      {userName ? (
        <div className="app_div_wrapper">
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
