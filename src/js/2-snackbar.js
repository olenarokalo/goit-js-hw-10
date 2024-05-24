import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const submitBtn = document.querySelector('button[type="submit"]');
const delayType = document.querySelectorAll('input[name="state"]');
const delay = document.querySelector('input[name="delay"]');

submitBtn.addEventListener('click', e => {
  e.preventDefault();

  let selectedState;
  delayType.forEach(input => {
    if (input.checked) {
      selectedState = input.value;
    }
  });

  const makePromise = ({ delay, state }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve();
        } else {
          reject();
        }
      }, parseInt(delay, 10));
    });
  };

  const delayValue = delay.value;

  if (delayValue && selectedState) {
    makePromise({ delay: delayValue, state: selectedState })
      .then(() => {
        iziToast.success({
          title: 'Fulfilled',
          message: `✅ Fulfilled promise in ${delayValue}ms`,
          position: 'topRight',
        });
      })
      .catch(() => {
        iziToast.error({
          title: 'Rejected',
          message: `❌ Rejected promise in ${delayValue}ms`,
          position: 'topRight',
        });
      });
  }
});
