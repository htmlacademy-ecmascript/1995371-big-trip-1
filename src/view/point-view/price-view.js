import { createElement } from '../../render.js';

const createPriceTemplate = (price) => (
  `<p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${price}</span>
  </p>`
);

export default class PriceView {
  constructor({basePrice}) {
    this.price = basePrice;
  }

  getTemplate() {
    return createPriceTemplate(this.price);
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
