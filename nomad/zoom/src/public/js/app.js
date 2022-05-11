const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("input");
  socket.emit("new_message", input.value);
}

function showRoom(msg) {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = roomName;
  const form = room.querySelector("form");
  form.addEventListener("submit", handleMessageSubmit);
}

let roomName;

function addMessage(msg) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = msg;
  ul.appendChild(li);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom)
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
  addMessage("Someone Join!");
});

socket.on("bye", () => {
  addMessage("Someone left!");
});

