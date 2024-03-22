import { createElement } from '../../render.js';

const createOffersListTemplate = () => '<ul class="event__selected-offers"></ul>';

export default class OffersListView {

  getTemplate() {
    return createOffersListTemplate();
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
