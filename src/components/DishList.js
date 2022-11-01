import React, { useState, useEffect } from "react";
import Dishes from "./Dishes";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { scoreCalculation } from "../util/dishScoreCalculation";
import { deductScore } from "../util/deductScore";
import "../styles/Dishlist.css";

const DishList = () => {
  const currentUser = useSelector(selectUser);

  let userChoices = JSON.parse(localStorage.getItem("userChoices"));
  let currentUserChoice = userChoices.find(
    (user) => user.username === currentUser.userName
  );

  const [dishData, setDishData] = useState([]);
  const [currentRank, setCurrentRank] = useState();
  const [currFirstChoice, setCurrFirstChoice] = useState(
    currentUserChoice.firstChoice
  );
  const [currSecondChoice, setCurrSecondChoice] = useState(
    currentUserChoice.secondChoice
  );
  const [currThirdChoice, setCurrThirdChoice] = useState(
    currentUserChoice.thirdChoice
  );

  const handleSubmit = () => {
    const userIndex = userChoices.findIndex(
      (i) => i.username === currentUser.userName
    );

    if (userChoices[userIndex].firstChoice)
      deductScore(userChoices[userIndex].firstChoice, 1);
    if (userChoices[userIndex].secondChoice)
      deductScore(userChoices[userIndex].secondChoice, 2);
    if (userChoices[userIndex].thirdChoice)
      deductScore(userChoices[userIndex].thirdChoice, 3);

    userChoices[userIndex].firstChoice = currFirstChoice;
    userChoices[userIndex].secondChoice = currSecondChoice;
    userChoices[userIndex].thirdChoice = currThirdChoice;

    localStorage.setItem("userChoices", JSON.stringify(userChoices));
    localStorage.setItem("dishdata", JSON.stringify(dishData));
    scoreCalculation(currentUser);
    toast("Added the choices to the poll");
  };

  const setDishRank = (item) => {
    if (!currentRank) toast.error("Select a rank below first");
    console.log(item);
    switch (currentRank) {
      case 1:
        if (currSecondChoice !== item && currThirdChoice !== item) {
          if (currFirstChoice !== item) setCurrFirstChoice(item);
        } else toast.error("Same dish in different ranks");
        break;

      case 2:
        if (currFirstChoice !== item && currThirdChoice !== item) {
          if (item !== currSecondChoice) setCurrSecondChoice(item);
        } else toast.error("Same dish in different ranks");
        break;

      case 3:
        if (currSecondChoice !== item && currFirstChoice !== item) {
          if (item !== currThirdChoice) setCurrThirdChoice(item);
        } else toast.error("Same dish in different ranks");
        break;

      default:
        break;
    }
    console.log(userChoices);
  };

  const populateDishesData = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json"
    );
    const responseJson = await response.json();
    setDishData(responseJson);
    let dishRanks = [];
    console.log(responseJson);
    if (responseJson) {
      responseJson.map((item) => {
        dishRanks.push({
          dishName: item.dishName,
          score: 0,
        });
      });
      if (!localStorage.getItem("dishRanks"))
        localStorage.setItem("dishRanks", JSON.stringify(dishRanks));
    }
  };

  useEffect(() => {
    populateDishesData();
  }, []);

  return (
    <>
      <Toaster />
      <div>
        {dishData.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => {
                setDishRank(item.dishName);
              }}
            >
              <Dishes key={item.id} item={item} />
            </div>
          );
        })}
        <div className="bottom_nav">
          <div
            className="rank_box gold"
            style={currentRank === 1 ? { border: "2px solid black" } : {}}
            onClick={() => {
              setCurrentRank(1);
            }}
          >
            <span>{`1st (${currFirstChoice})`}</span>
          </div>
          <div
            className="rank_box silver"
            style={currentRank === 2 ? { border: "2px solid black" } : {}}
            onClick={() => {
              setCurrentRank(2);
            }}
          >
            <span>{`2nd (${currSecondChoice})`}</span>
          </div>
          <div
            className="rank_box bronze"
            style={currentRank === 3 ? { border: "2px solid black" } : {}}
            onClick={() => {
              setCurrentRank(3);
            }}
          >
            <span>{`3rd (${currThirdChoice})`}</span>
          </div>
          <div
            className="rank_box"
            style={{ background: "#C7D36F" }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </div>
        </div>
      </div>
    </>
  );
};

export default DishList;
