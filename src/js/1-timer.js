import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

var options = new flatpickr(`#datetime-picker`, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
});
