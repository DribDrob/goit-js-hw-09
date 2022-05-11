import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit)

function onFormSubmit (event) {
  event.preventDefault();

  const formElements = event.currentTarget.elements;
  const step = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);
  let delay = Number(formElements.delay.value);
 
  for (let i = 1; i <= amount; i += 1){
    createPromise(i, delay).then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {useIcon: false});
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {useIcon: false});
        });
        delay+=step;  
  }
 }

function createPromise(position, delay) {
  return new Promise((resolve, reject)=>{
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
    resolve({position: position, delay: delay});
  } 
    else {reject({position: position, delay: delay});}
  }, delay);
})}


