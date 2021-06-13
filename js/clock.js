const clockContainer = document.querySelector(".clock"),
  clockDay = clockContainer.querySelector(".clock__day__letter"),
  clockHours = clockContainer.querySelector(".clock__hours__letter"),
  clockMinutes = clockContainer.querySelector(".clock__minutes__letter"),
  clockSeconds = clockContainer.querySelector(".clock__seconds__letter");

const week = new Array("SU", "MO", "TU", "WE", "TH", "FR", "SA");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  const day = date.getDay();
  
  clockDay.innerText = `${week[day]}`;
  clockHours.innerText = `${hours < 10 ? `0${hours}` : hours}`;
  clockMinutes.innerText = `${minutes < 10 ? `0${minutes}` : minutes}`;
  clockSeconds.innerText = `${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init(){
  getTime();
  setInterval(getTime, 1000);
}

init();
