export const scoreCalculation = (currentUser) => {
  let userChoices = JSON.parse(localStorage.getItem("userChoices"));
  let dishRanks = JSON.parse(localStorage.getItem("dishRanks"));
  if (userChoices) {
    let userIndex = userChoices.findIndex(
      (index) => index.username === currentUser.userName
    );
    console.log(currentUser, userChoices[userIndex]);
    let fDishIndex = dishRanks.findIndex(
      (i) => i.dishName === userChoices[userIndex].firstChoice
    );
    if (fDishIndex !== -1) dishRanks[fDishIndex].score += 30;
    let sDishIndex = dishRanks.findIndex(
      (i) => i.dishName === userChoices[userIndex].secondChoice
    );
    if (sDishIndex !== -1) dishRanks[sDishIndex].score += 20;
    let tDishIndex = dishRanks.findIndex(
      (i) => i.dishName === userChoices[userIndex].thirdChoice
    );
    if (tDishIndex !== -1) dishRanks[tDishIndex].score += 10;
  }

  dishRanks.sort((a, b) =>
    a.score < b.score ? 1 : b.score < a.score ? -1 : 0
  );
  localStorage.setItem("dishRanks", JSON.stringify(dishRanks));
};
