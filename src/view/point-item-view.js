import { createElement } from '../render.js';
import { getInteger, getStringWithUpperCaseFirst, formatFullDate, formatDate, formatTime, getDuration } from '../utils.js';

const createEventDateTemplate = (startDate) => (
  `<time class="event__date" datetime=${formatFullDate(startDate)}>${formatDate(startDate)}</time>`
);

const createEventTypeTemplate = (type) => (
  `<div class="event__type">
  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>`
);

const createEventScheduleTemplate = (startDate, endDate) => {
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

const createEventTitleTemplate = (type, name) => (
  `<h3 class="event__title">${getStringWithUpperCaseFirst(type)} ${name}</h3>`
);

const createEventPriceTemplate = (price) => (
  `<p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${price}</span>
  </p>`
);

const createPointItemTemplate = (point, destination) => {
  const {type, dateFrom, dateTo, basePrice} = point;
  const {name} = destination;

  return (`<li class="trip-events__item">
    <div class="event">
      ${createEventDateTemplate(dateFrom)}
      ${createEventTypeTemplate(type)}
      ${createEventTitleTemplate(type, name)}
      ${createEventScheduleTemplate(dateFrom, dateTo)}
      ${createEventPriceTemplate(basePrice)}
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">20</span>
        </li>
      </ul>
      <button class="event__favorite-btn event__favorite-btn--active" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
};

export default class PointItemView {
  constructor({point, destination}) {
    this.point = point;
    this.destination = destination;
  }

  getTemplate() {
    return createPointItemTemplate(this.point, this.destination);
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
