import { createElement } from '../../render.js';
import { getInteger, formatFullDate, formatTime, getDuration } from '../../utils.js';

const createScheduleTemplate = (startDate, endDate) => {
  const difference = getDuration(startDate, endDate);
  const days = difference.format('DD');
  const hours = difference.format('HH');
  const minutes = difference.format('mm');

  const createDaysTemplate = () => (getInteger(days) ? `${days}D` : '');
  const createHoursTemplate = () => (!(getInteger(days) || getInteger(hours)) ? '' : `${hours}H`);

  return (
    `<div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${formatFullDate(startDate)}>${formatTime(startDate)}</time>
        &mdash;
        <time class="event__end-time" datetime=${formatFullDate(endDate)}>${formatTime(endDate)}</time>
      </p>
      <p class="event__duration">
        ${createDaysTemplate()} ${createHoursTemplate()} ${minutes}M
      </p>
    </div>`
  );
};

export default class ScheduleView {
  constructor({dateFrom, dateTo}) {
    this.startDate = dateFrom;
    this.endDate = dateTo;
  }

  getTemplate() {
    return createScheduleTemplate(this.startDate, this.endDate);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
