import React, { useState, useEffect } from "react";
import Dishes from "./Dishes";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import toast , { Toaster } from "react-hot-toast";
import "../styles/Dishlist.css";

const DishList = () => {
  const currentUser = useSelector(selectUser);

  let userChoices = JSON.parse(localStorage.getItem("userChoices"))
  let currentUserChoice = userChoices.find(user => user.username === currentUser.userName)

  const [dishData, setDishData] = useState([]);
  const [currentRank, setCurrentRank] = useState();
  const [currFirstChoice , setCurrFirstChoice] = useState(currentUserChoice.firstChoice)
  const [currSecondChoice , setCurrSecondChoice] = useState(currentUserChoice.secondChoice)
  const [currThirdChoice , setCurrThirdChoice] = useState(currentUserChoice.thirdChoice)


  const handleSubmit = () => {
     const userIndex = userChoices.findIndex((i => i.username === currentUser.userName))

     userChoices[userIndex].firstChoice = currFirstChoice;
     userChoices[userIndex].secondChoice = currSecondChoice;
     userChoices[userIndex].thirdChoice = currThirdChoice;

     localStorage.setItem("userChoices", JSON.stringify(userChoices))
     toast("Added the choices to the poll")

  }

  const setDishRank = (item) => {
    if (!currentRank) toast.error("Select a rank below first")
    console.log(item)
    switch(currentRank){
      case 1:
        if (currSecondChoice !== item && currThirdChoice !== item) setCurrFirstChoice(item);
        else toast.error("Same dish in different ranks")
        break;

      case 2:
        if (currFirstChoice !== item && currThirdChoice !== item) setCurrSecondChoice(item);
        else toast.error("Same dish in different ranks")
        break;

      case 3:
        if (currSecondChoice !== item && currFirstChoice !== item) setCurrThirdChoice(item);
        else toast.error("Same dish in different ranks")
        break;

      default:
        break;  
    }
    console.log(userChoices)
  }
  
  const populateDishesData = async () => {
    const response = await fetch("https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json") 
    const responseJson = await response.json();
    setDishData(responseJson)
  }

  useEffect(() => {
    populateDishesData();
  }, []);

  return (
    <>
    < Toaster/>
      <div>
        {dishData.map((item) => {
          return (
            <div 
              key = {item.id}
              onClick={() => {
                setDishRank(item.dishName)
              }}
            >
              <Dishes key={item.id} item={item}/>
            </div>
          );
        })}
        <div className="bottom_nav">
          <div className="rank_box gold" style={(currentRank === 1) ? { border : "2px solid black" } : {}}
           onClick={()=>{setCurrentRank(1)}}
          >
            <span>{`1st (${currFirstChoice})`}</span>
          </div>
          <div className="rank_box silver" style={(currentRank === 2) ? { border : "2px solid black" } : {}}
           onClick={()=>{setCurrentRank(2)}}
           >
            <span>{`2nd (${currSecondChoice})`}</span>
          </div>
          <div className="rank_box bronze" style={(currentRank === 3) ? { border : "2px solid black" } : {}}
           onClick={()=>{setCurrentRank(3)}}
           >
            <span>{`3rd (${currThirdChoice})`}</span>
          </div>
          <div className="rank_box" style={{ background: "#C7D36F" }}
           onClick={()=>{handleSubmit()}}
          
          >
            Submit
          </div>
        </div>
      </div>
    </>
  );
};

export default DishList;
