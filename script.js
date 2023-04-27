const screen = document.querySelector(".screen");
screen.value = "0";
const buttons = document.querySelectorAll(".btn");
const actions = document.querySelectorAll(".btn-yellow");
const clear = document.querySelector(".btn-clear");
const deleteSingle = document.querySelector(".btn-deleteSingle");
const equal = document.querySelector(".btn-equal");
const point = document.querySelector(".point");
const squareRoot = document.querySelector(".square-root");

let sqrtClickedFirstTime = true;
let executeSqrt = false;
let actionClickedFirstTime = true;
const actionsString = "+-*/√%";
const numbersString = "0123456789";

function squareRootTheStr(str) {
  let result = Math.sqrt(
    parseFloat(str.slice(str.search("√") + 1, str.length))
  );
  return str.replace("√" + str.slice(str.search("√") + 1, str.length), result);
}

squareRoot.addEventListener("click", (e) => {
  equal.disabled = false;
  clickedFirstTime = true;
  const lastItem = screen.value[screen.value.length - 1];

  if (sqrtClickedFirstTime) {
    let value = e.target.dataset.num;
    if (screen.value === "0") {
      screen.value = value;
    } else if (numbersString.includes(lastItem)) {
      screen.value += "*" + value;
    } else if (lastItem !== "√") {
      screen.value += value;
    }
  }

  if (executeSqrt) {
    screen.value = squareRootTheStr(screen.value) + "*√";
    executeSqrt = true;
  }
  sqrtClickedFirstTime = false;
});

actions.forEach((action) => {
  action.addEventListener("click", (e) => {
    let value = e.target.dataset.num;
    const lastItem = screen.value[screen.value.length - 1];
    equal.disabled = false;
    clickedFirstTime = true;
    sqrtClickedFirstTime = true;
    executeSqrt = false;

    if (actionClickedFirstTime && lastItem !== "√") {
      screen.value += value;
      actionClickedFirstTime = false;
    } else if (lastItem === "√") {
      screen.value += "";
    } else {
      screen.value = screen.value.substring(0, screen.value.length - 1) + value;
    }

    if (screen.value.includes("√") && lastItem !== "√") {
      screen.value = squareRootTheStr(screen.value) + value;
    }
  });
});

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let value = e.target.dataset.num;
    actionClickedFirstTime = true;

    if (screen.value.includes("√")) executeSqrt = true;
    sqrtClickedFirstTime = true;
    if (screen.value !== "0") {
      screen.value += value;
    } else if (!actionsString.includes(e.target.innerHTML.trim(" "))) {
      screen.value += value;
      screen.value = screen.value.substring(1);
    }
  });
});

let clickedFirstTime = true; //  up
point.addEventListener("click", (e) => {
  let value = e.target.dataset.num;
  if (actionsString.includes(screen.value[screen.value.length - 1])) {
    screen.value += "0" + value;
  } else if (clickedFirstTime) {
    screen.value += value;
  }
  actionClickedFirstTime = true;
  clickedFirstTime = false;
});

equal.addEventListener("click", (e) => {
  const lastItem = screen.value[screen.value.length - 1];
  if (lastItem !== "√") {
    screen.value = squareRootTheStr(screen.value);
  } else return;

  if (screen.value === "") {
    screen.value = "Please Enter";
  } else {
    let answer;
    if (actionsString.includes(lastItem)) {
      let screenValue = screen.value.substring(0, screen.value.length - 1); // screen value without last action sign
      answer = eval(screenValue); // eval function should not be used if you need security !!!!!
      screen.value = answer;
    } else {
      answer = eval(screen.value); // eval function should not be used if you need security!!!!!
      screen.value = answer;
    }
  }

  if (!screen.value.includes(".")) {
    clickedFirstTime = true;
  } else {
    clickedFirstTime = false;
  }
  executeSqrt = false;
  sqrtClickedFirstTime = true;
  actionClickedFirstTime = true;
});

clear.addEventListener("click", (e) => {
  screen.value = "0";
  clickedFirstTime = true; //point
  sqrtClickedFirstTime = true;
  executeSqrt = false;
  actionClickedFirstTime = true;
});

deleteSingle.addEventListener("click", (e) => {
  const lastItem = screen.value[screen.value.length - 1];
  if (lastItem === ".") {
    clickedFirstTime = true;
  } else if (actionsString.includes(lastItem)) {
    actionClickedFirstTime = true;
  }
  if (lastItem === "√") {
    sqrtClickedFirstTime = true;
    executeSqrt = false;
  }

  screen.value = screen.value.slice(0, screen.value.length - 1);
  if (!screen.value) {
    screen.value = "0";
  }
});
