const time = document.querySelector(".time");
const start = document.querySelector(".start");
const stop = document.querySelector(".stop");
const reset = document.querySelector(".reset");
let minutes = 0;
let seconds = 0;

time.innerText = `00:00`;
start.addEventListener("click", () => {
  start.disabled = true;
  let interval = setInterval(() => {
    seconds++;
    time.innerText = `${minutes < 10 ? `0` : ""}${minutes}:${
      seconds < 10 ? `0` : ""
    }${seconds}`;
    if (seconds === 59) {
      minutes++;
      seconds = -1;
    }
  }, 1000);

  stop.addEventListener("click", () => {
    start.disabled = false;
    clearInterval(interval);
  });
});

reset.addEventListener("click", () => {
  time.innerText = `00:00`;
  minutes = 0;
  seconds = 0;
});
