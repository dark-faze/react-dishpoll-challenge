import React from "react";
import "../styles/LeaderBoard.css";

const LeaderBoard = () => {
  let scores = JSON.parse(localStorage.getItem("dishRanks"));
  console.log(scores);
  return (
    <div className="main_wrapper">
      <span>✨ LeaderBoard ✨</span>
      {scores.map((dish) => {
        return (
          <div className="score_card">{`${dish.dishName}  Score:${dish.score}`}</div>
        );
      })}
    </div>
  );
};

export default LeaderBoard;
