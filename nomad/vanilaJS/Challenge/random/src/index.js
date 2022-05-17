const $ = (selector) => document.querySelector(selector);

const scope = $("#scope");
const guess = $("#guess");

const play_btn = $("#play");

function playGame(e) {
  e.preventDefault();

  if (scope.value === "" || guess.value === "") {
    alert("Please fill in the blanks.");
    return;
  }
  const scope_value = parseInt(scope.value, 10);
  const guess_value = parseInt(guess.value, 10);

  if (scope_value < guess_value) {
    alert("Please enter a number within the range.");
    return;
  }

  const machine = Math.round(Math.random() * scope.value);

  $("#user").innerText = guess_value;
  $("#machine").innerText = machine;

  if (guess_value === machine) $("#result").innerText = "You Win 😉!!!";
  else $("#result").innerText = "You Lose 😥...";

  $(".game-result").classList.add("open");
}

function keyDownInput(e, input) {
  if (e.key === "Enter" || e.key === "Tab") {
    e.preventDefault();
    if (input.value === "") {
      alert("Please fill in the blanks.");
    } else if (input.value < 0) {
      alert("Please enter a value greater than or equal to 0.");
      input.value = "";
      return;
    } else {
      if (input === scope) guess.focus();
      else play_btn.click();
    }
  }
}

function Game() {
  scope.addEventListener("keydown", (e) => {
    keyDownInput(e, e.target);
  });
  guess.addEventListener("keydown", (e) => {
    keyDownInput(e, e.target);
  });

  play_btn.addEventListener("click", playGame);
  play_btn.addEventListener("submit", playGame);
}

Game();
