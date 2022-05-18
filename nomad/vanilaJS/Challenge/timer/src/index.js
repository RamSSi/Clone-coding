const clockTitle = document.querySelector(".js-clock");
const today_div = document.getElementById("today");
const christmas_div = document.getElementById("christmas");

const CAL_MINUTE = 60;
const CAL_HOUR = CAL_MINUTE * 60;
const CAL_DAY = CAL_HOUR * 24;

function getTimer() {
  // 현재와 가장 가까운 크리스마스 선택
  const today = new Date();
  let currentYear = today.getFullYear()
  let christmas = new Date(`${currentYear.toString()}-12-25 00:00`);

  if (today > christmas) christmas.setFullYear(currentYear + 1);

  // 크리스마스까지 남은 시간을 일, 시, 분, 초로 나타냄
  let gap = parseInt((christmas.getTime() - today.getTime()) / 1000 + 1);
  const day = parseInt(gap / CAL_DAY);
  gap %= day*CAL_DAY;
  
  const hour = parseInt(gap / CAL_HOUR);
  gap %= hour*CAL_HOUR;
  
  const minute = parseInt(gap / CAL_MINUTE);
  const second = gap % (minute*CAL_MINUTE);

  function doubleDigits(num) {
    return num.toString().padStart(2, '0');
  }

  christmas_div.innerText = `Christmas : Desember 25, ${christmas.getFullYear()}`;
  today_div.innerText = `Today is ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()} ${doubleDigits(today.getHours())}:${doubleDigits(today.getMinutes())}:${doubleDigits(today.getSeconds())}`;
  clockTitle.innerText = `Time Until Christmas Eve ${day}d ${hour}h ${minute}m ${second}s`;
}

setInterval(getTimer, 1000);