import { createElement } from '../../render.js';
import { formatFullDate, formatDate } from '../../utils.js';

const createDateTemplate = (startDate) => `<time class="event__date" datetime=${formatFullDate(startDate)}>${formatDate(startDate)}</time>`;

export default class DateView {
  constructor({dateFrom}) {
    this.startDate = dateFrom;
  }

  getTemplate() {
    return createDateTemplate(this.startDate);
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
