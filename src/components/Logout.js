import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/userSlice";
import "../styles/Logout.css";

const Logout = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUser);

  const logout = (e) => {
    dispatch(logout());
  };

  return (
    <form className="logout">
      <button className="logout__button" onClick={(e) => logout(e)}>
        Log out
      </button>
    </form>
  );
};

export default Logout;