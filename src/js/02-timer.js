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
    
    const selectedDate = new Date(dateInput.value).getTime(); 
    
   intervalId = setInterval(()=> {
    const currentDate = Date.now();
    let diffTime = selectedDate - currentDate;
    days.textContent = `${addLeadingZero(convertMs(diffTime).days)}`;
    hours.textContent = `${addLeadingZero(convertMs(diffTime).hours)}`;
    minutes.textContent = `${addLeadingZero(convertMs(diffTime).minutes)}`;
    seconds.textContent = `${addLeadingZero(convertMs(diffTime).seconds)}`;
    console.log(diffTime);
    if (diffTime<999){
      clearInterval(intervalId);
    }
  } , 1000)
  }

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
