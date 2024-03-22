import { createElement } from '../../render.js';

const createTypeTemplate = (type) => (
  `<div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>`
);

export default class TypeView {
  constructor({type}) {
    this.type = type;
  }

  getTemplate() {
    return createTypeTemplate(this.type);
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
