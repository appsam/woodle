const 정답 = "APPLE";
let attempts = 0;
let index = 0;

function appStart() {
  const displayGameover = (A) => {
    const div = document.createElement("div");
    if (A === 0) {
      div.innerText = "GAMEOVER";
    } else div.innerText = "WiN!!";
    div.style =
      "display: flex; justify-content: center; align-items: center; position: absolute; top: 33vw; left: 33vw; background-color: black; width:200px; height:100px; color: white; font-weight: bold;";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 5) return gameover(0);
    attempts += 1;
    index = 0;
  };

  const gameover = (A) => {
    window.removeEventListener("keydown", handlekeydown);
    window.removeEventListener("click", handleKeyClick); //키보드 클릭 삭제
    displayGameover(A);
  };

  const handleBackkey = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleEnterkey = () => {
    let answer = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index="${attempts}${i}"]`
      );
      const 입력한글자 = block.innerText;
      const 정답글자 = 정답[i];
      const keyBoard = document.querySelector(
        `.keybord-column[data-key="${정답글자}"]`
      );
      if (keyBoard) {
        if (입력한글자 === 정답글자) {
          answer += 1;
          block.style.background = "#6AAA64";
          keyBoard.style.background = "#6AAA64";
        } else if (정답.includes(입력한글자)) {
          const computedStyle = getComputedStyle(keyBoard);
          if (computedStyle.backgroundColor !== "rgb(106, 170, 100)") {
            // 초록색이 아닐때만 노란색이 아닐 때로 변경
            keyBoard.style.background = "#C9B458";
          }
          block.style.background = "#C9B458";
        } else {
          block.style.background = "#787C7E";
        }

        block.style.color = "white";
      } else {
        console.error(`KeyBoard not found for character: ${정답글자}`);
      }
    }

    if (answer === 5) gameover(1);
    else nextLine();
  };

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackkey();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterkey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const handleKeyClick = (event) => {
    const clickedKey = event.target.dataset.key;
    if (clickedKey) {
      const thisBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index}']`
      );
      if (clickedKey === "Backspace") handleBackkey();
      else if (index === 5) {
        if (clickedKey === "Enter") handleEnterkey();
        else return;
      } else if (65 <= clickedKey && clickedKey <= 90) {
        thisBlock.innerText = clickedKey.toUpperCase();
        index += 1;
      }
    }
  };

  const keyColumns = document.querySelectorAll(
    ".keybord-column, .keybord-column1"
  );
  keyColumns.forEach((key) => {
    key.addEventListener("click", handleKeyClick);
  });

  window.addEventListener("keydown", handlekeydown);
}

appStart();
