const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}
getClock(); // 웹 사이트가 새로고침 될 때마다 새로운 Date 객체를 생성(새로고침을 누른 시간)
setInterval(getClock, 70);
var a = "1";