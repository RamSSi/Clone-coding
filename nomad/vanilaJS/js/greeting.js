const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");


const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "userName";

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  loginInput.classList.add(HIDDEN_CLASSNAME);
  const userName = loginInput.value;
  localStorage.setItem(USERNAME_KEY, userName);
  sayHello(userName);
}

function sayHello(userName) {
  greeting.innerText = `Hello ${userName}!`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
  loginForm.classList = "";
  loginInput.classList = "";
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  sayHello(savedUserName);
  loginForm.classList.add(HIDDEN_CLASSNAME);
}

