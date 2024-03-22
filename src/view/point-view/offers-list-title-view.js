import { createElement } from '../../render.js';

const createOffersListTemplate = () => '<h4 class="visually-hidden">Offers:</h4>';

export default class OffersListTitleView {

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
