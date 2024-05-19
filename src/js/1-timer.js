import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// ====================== SETTING =========================

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const time = {
  days: document.querySelector(`[data-days]`),
  hours: document.querySelector(`[data-hours]`),
  minutes: document.querySelector(`[data-minutes]`),
  seconds: document.querySelector(`[data-seconds]`),
};

const { days, hours, minutes, seconds } = time;

const daysValue = days.textContent;
const hoursValue = hours.textContent;
const minutesValue = minutes.textContent;
const secondsValue = seconds.textContent;

// =================== DEFAULT ========================

let userSelectedDate = null;
datePicker.disabled = false;
datePicker.value = ``;
startBtn.disabled = true;

// ===================== CODE ===================

const options = {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(datePicker, options);

startBtn.addEventListener('click', () => {
  datePicker.disabled = true;
  startBtn.disabled = true;

  const countdownInterval = setInterval(() => {
    const timeDifference = userSelectedDate - new Date();
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: 'Success',
        message: 'The countdown is complete!',
      });
      updateTimeOnDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      datePicker.disabled = false;
      return;
    }
    const timeObject = convertMs(timeDifference);
    updateTimeOnDisplay(timeObject);
  }, 1000);
});

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

function updateTimeOnDisplay({ days, hours, minutes, seconds }) {
  time.days.textContent = days.toString().padStart(2, '0');
  time.hours.textContent = hours.toString().padStart(2, '0');
  time.minutes.textContent = minutes.toString().padStart(2, '0');
  time.seconds.textContent = seconds.toString().padStart(2, '0');
}
