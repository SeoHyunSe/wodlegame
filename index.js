const okay = "APPLE";

let attempts = 0;
let index = 0;
let timer

function appStart() {
  const displayGameOver = (over) => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료 됐습니다.";
    div.style = `
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      color: black;
      font-size: 35px;
      z-index: 1000;
    `;
    document.body.appendChild(div);
  };
  const nextLine = () => {
    if(attempts === 6) return gameover();
    attempts += 1;
    index = 0;
};

 const gameover = (over) => {
  window. removeEventListener ("keydown", handlekeydown);
  displayGameOver(over);
  clearInterval(timer);
 };
  const handleEnterKey = () => {
    let goldenbell = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const enter_text = block.innerText;
      const okay_text = okay[i];
      if (enter_text === okay_text) {
        goldenbell += 1; block.style.background = "#6AAA64";}
      else if (okay.includes(enter_text)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    if (goldenbell === 5) gameover ();
    else nextLine();
  };

  const handleBackspace = () => {
   if(index>0){
   const preBlock = document.querySelector(
    `.board-column[data-index="${attempts}${index-1}"]`
    );
    preBlock.innerText="";
  }
   if (index !== 0) index -=1;
  };

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
    `.board-column[data-index="${attempts}${index}"]`
    );
    if(event.key=== "Backspace") handleBackspace();
     else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  const startTimer = () => {
    const start_time = new Date();
    function setTime() {
      const current_time = new Date();
      elapsed_time = new Date(current_time - start_time);
      const minute = elapsed_time.getMinutes().toString().padStart(2, "0");
      const second = elapsed_time.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${minute}:${second}`;
    }
    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handlekeydown);
}

appStart();
