import React, { useState } from "react";
import { login } from "../redux/userSlice";
import { useDispatch , useSelector } from "react-redux";
import { selectUserData } from "../redux/userDataSlice"
import toast , { Toaster } from "react-hot-toast";
import "../styles/Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const users = useSelector(selectUserData)
  console.log(users)

  const authenticateUser = () => {
    let obj = users.find(user => user.username === userName)
    if(obj && obj.password === password) return true;
    return false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(authenticateUser()){
      dispatch(
        login({
          userName: userName,
          password: password,
          loggedIn: true,
        })
      );
      setPassword("");
    }
    else {
      toast.error("Wrong Username or Password")
    }
  };

  return (
    <div className="login">
      <Toaster
      position="top-center"
      reverseOrder={false}
      />
      <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Login here 🔥</h1>
        <input
          type="username"
          placeholder="UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submit__btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;