import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnEl = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

startBtnEl.setAttribute('disabled', 'disabled');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime()<Date.now()){
       return Notify.failure('Please choose a date in the future');
      }
      startBtnEl.removeAttribute('disabled');
    },
  };
  flatpickr(dateInput, options)
  startBtnEl.addEventListener('click', onStartBtnClick)
  let intervalId = null;

  function onStartBtnClick (){
    startBtnEl.setAttribute('disabled', 'disabled');
    dateInput.setAttribute('disabled', 'disabled');

    const currentDate = Date.now();
    const selectedDate = new Date(dateInput.value).getTime(); 
    let diffTime = selectedDate - currentDate;
   intervalId = setInterval(()=> {
    days.textContent = `${addLeadingZero(convertMs(diffTime).days)}`;
    hours.textContent = `${addLeadingZero(convertMs(diffTime).hours)}`;
    minutes.textContent = `${addLeadingZero(convertMs(diffTime).minutes)}`;
    seconds.textContent = `${addLeadingZero(convertMs(diffTime).seconds)}`;
    diffTime -= 1000;
    if (diffTime<0){
      clearInterval(intervalId);
    }
  } , 1000)
  }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Библиотека уведомлений
// ВНИМАНИЕ
// Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

// Для отображения уведомлений пользователю вместо window.alert() используй библиотеку notiflix.