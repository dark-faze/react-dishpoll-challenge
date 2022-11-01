export const deductScore = (item, i) => {
  let dishRanks = JSON.parse(localStorage.getItem("dishRanks"));

  let dishIndex = dishRanks.findIndex((index) => index.dishName === item);
  console.log(item, dishIndex, i);
  if (dishIndex !== -1) {
    if (i === 1) dishRanks[dishIndex].score -= 30;
    else if (i === 2) dishRanks[dishIndex].score -= 20;
    else dishRanks[dishIndex].score -= 10;
  }

  localStorage.setItem("dishRanks", JSON.stringify(dishRanks));
};
