import React, { useState, useEffect } from "react";
import Dishes from "./Dishes"

const DishList = () => {
  const [dishData, setDishData] = useState([]);
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json")
      .then((res) => res.json())
      .then((json) => {
        setDishData(json);
        console.log(dishData);
      });
  }, []);

  return (
    <div>
      {dishData.map((item) => {
        console.log(item)
        return <Dishes key={item.id} item={item}/>
      })}
    </div>
  );
};

export default DishList;
