import { createElement } from '../../render.js';
import { getStringWithUpperCaseFirst } from '../../utils.js';

const createTitleTemplate = (type, name) => `<h3 class="event__title">${getStringWithUpperCaseFirst(type)} ${name}</h3>`;

export default class TitleView {
  constructor(point, destination) {
    this.type = point.type;
    this.name = destination.name;
  }

  getTemplate() {
    return createTitleTemplate(this.type, this.name);
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
