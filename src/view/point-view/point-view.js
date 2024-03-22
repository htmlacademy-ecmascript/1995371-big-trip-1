import { createElement } from '../../render.js';

const createPointItemTemplate = () => '<div class="event"></div>';

export default class PointView {
  getTemplate() {
    return createPointItemTemplate();
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
