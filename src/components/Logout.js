import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import "../styles/Logout.css";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signout = (e) => {
    console.log("efm");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="logout">
      <button onClick={(e) => signout(e)}>Log out</button>
    </div>
  );
};

export default Logout;
