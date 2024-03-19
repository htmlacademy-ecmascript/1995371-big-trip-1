import { createElement } from '../render.js';

const createPointItemEmptyTemplate = () => '<li class="trip-events__item"></li>';

export default class PointItemEmptyView {
  getTemplate() {
    return createPointItemEmptyTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
