const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  clock.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
getClock(); // 웹 사이트가 새로고침 될 때마다 새로운 Date 객체를 생성(새로운 시간)
setInterval(getClock, 1000);