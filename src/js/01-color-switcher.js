const refs = {
    startBtnEl: document.querySelector('[data-start]'),
    stopBtnEl: document.querySelector('[data-stop]'),
    bodyEl: document.querySelector('body'),
}
let intervalId = null;

refs.stopBtnEl.setAttribute('disabled', 'disabled');
refs.startBtnEl.addEventListener('click', onStartBtnClick);
refs.stopBtnEl.addEventListener('click', onStopBtnClick);

function onStartBtnClick (){
    intervalId = setInterval(()=>refs.bodyEl.style.backgroundColor = getRandomHexColor(), 1000)
    refs.startBtnEl.setAttribute('disabled', 'disabled');
    refs.stopBtnEl.removeAttribute('disabled');
}
function onStopBtnClick (){
    clearInterval( intervalId)
    refs.startBtnEl.removeAttribute('disabled');
    refs.stopBtnEl.setAttribute('disabled', 'disabled');
}
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }