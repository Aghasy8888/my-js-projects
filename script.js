(function () {
  const screen = document.querySelector(".screen");
  const buttons = document.querySelectorAll(".btn");
  const actions = document.querySelectorAll(".btn-yellow");
  const clear = document.querySelector(".btn-clear");
  const deleteSingle = document.querySelector(".btn-deleteSingle");
  const equal = document.querySelector(".btn-equal");
  const point = document.querySelector(".point");
  const squareRoot = document.querySelector(".square-root");
  const allButtons = document.querySelectorAll(".all");
  screen.value = "0";
  let willBeEmptyStr = "."; //after pressing an action
  let sqrtClickedFirstTime = true;
  let executeSqrt = false;
  const actionsString = "+-*/√%";
  const numbersString = "0123456789";

  function squareRootTheStr(str) {
    let result = Math.sqrt(
      parseFloat(str.slice(str.search("√") + 1, str.length))
    );
    return str.replace(
      "√" + str.slice(str.search("√") + 1, str.length),
      result
    );
  }

  squareRoot.addEventListener("click", (e) => {
    equal.disabled = false;
    clickedFirstTime = true;
    if (sqrtClickedFirstTime) {
      let value = e.target.dataset.num;
      if (screen.value === "0") {
        screen.value = value;
      } else if (
        numbersString.includes(screen.value[screen.value.length - 1])
      ) {
         screen.value += '*' + value;
      } else {
        screen.value += value;
      }
    }

    if (executeSqrt) {
      screen.value = squareRootTheStr(screen.value) + "*√";
      executeSqrt = true;
    }
    sqrtClickedFirstTime = false;
    willBeEmptyStr = ".";
  });

  actions.forEach((action) => {
    action.addEventListener("click", (e) => {
      equal.disabled = false;
      clickedFirstTime = true;
      sqrtClickedFirstTime = true;
      executeSqrt = false;
      let value = e.target.dataset.num;
      screen.value += value;

      // if (actionsString.includes(screen.value[screen.value.length - 1])) {
      //   screen.value = screen.value.substring(0, screen.value.length - 1);
      // }
      if (screen.value.includes("√")) {
        screen.value = squareRootTheStr(screen.value) + value;
      }

      willBeEmptyStr = ".";
    });
  });

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let value = e.target.dataset.num;
      if (screen.value.includes("√")) executeSqrt = true;
      sqrtClickedFirstTime = true;
      if (screen.value !== "0") {
        screen.value += value;
      } else {
        if (!actionsString.includes(e.target.innerHTML.trim(" "))) {
          screen.value += value;
          screen.value = screen.value.substring(1);
        }
      }
    });
  });

  let clickedFirstTime = true;

  point.addEventListener("click", (e) => {
    let value = e.target.dataset.num;
    if (actionsString.includes(screen.value[screen.value.length - 1])) {
      screen.value += "0" + value;
      willBeEmptyStr = ".";
    } else if (clickedFirstTime) {
      screen.value += value;
    }

    clickedFirstTime = false;
  });

  equal.addEventListener("click", (e) => {
    screen.value = squareRootTheStr(screen.value);
    if (screen.value === "") {
      screen.value = "Please Enter";
    } else {
      if (actionsString.includes(screen.value[screen.value.length - 1])) {
        let screenValue = screen.value.substring(0, screen.value.length - 1);
        let answer = eval(screenValue); // eval function should not be used if you need security !!!!!
        screen.value = answer;
      } else {
        let answer = eval(screen.value); // eval function should not be used if you need security!!!!!
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
    willBeEmptyStr = ".";
  });

  clear.addEventListener("click", (e) => {
    screen.value = "0";
    clickedFirstTime = true;
    sqrtClickedFirstTime = true;
    executeSqrt = false;
  });

  deleteSingle.addEventListener("click", (e) => {
    if (screen.value[screen.value.length - 1] === ".") {
      clickedFirstTime = true;
    } else if (actionsString.includes(screen.value[screen.value.length - 1])) {
      willBeEmptyStr = ".";
    }
    if (screen.value[screen.value.length - 1] === "√") {
      sqrtClickedFirstTime = true;
      executeSqrt = false;
    }
    //   else if (actionsString.includes(screen.value[screen.value.length - 1])) {
    //    willBeEmptyStr = ".";
    //  }
    screen.value = screen.value.slice(0, screen.value.length - 1);
    if (!screen.value) {
      screen.value = "0";
    }
  });
})();

//   if (e.target.innerHTML === "√") {
//     screen.value = value.concat(screen.value);
//   } else {
//     screen.value += value;
//   }

//  if (e.target.innerHTML === "√") {
//    screen.value = value.concat(screen.value);
//    screen.value = screen.value.slice(0, screen.value.length - 1);
//  } else {
//    screen.value += value;
//    screen.value = screen.value.substring(1);
//  }
