const back = document.getElementById("back");

function changeBackColor() {
  if (window.innerWidth < 600) 
    back.classList = "blue";
  else if (window.innerWidth < 1000) 
    back.classList = "purple";
  else 
    back.classList = "yellow";
}

window.addEventListener("resize", changeBackColor);
