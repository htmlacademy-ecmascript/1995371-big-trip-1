import { createElement } from '../render.js';
import { getStringWithUpperCaseFirst, formatToScreamingSnakeCase, huminizeFullDate } from '../utils.js';

const createEmptyPoint = (typePack) => {
  const defaultType = Object.values(typePack)[0].type;

  return {
    type: defaultType,
    dateFrom: null,
    dateTo: null,
    destination: null,
    basePrice: '',
    offers: [],
    isFavourite: false,
  };
};

const createTypeItemTemplate = (pointType, currentType) => {
  const checkedAttribute = (currentType === pointType) ? ' checked' : '';

  return (
    `<div class="event__type-item">
    <input id="event-type-${currentType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}"${checkedAttribute}>
    <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-1">${getStringWithUpperCaseFirst(currentType)}</label>
  </div>`
  );
};

const createTypeListTemplate = (point, types) => {
  let itemsTemplate = '';
  types.forEach((element) => {
    itemsTemplate = itemsTemplate + createTypeItemTemplate(point.type, element);
  });

  return (
    `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
          ${itemsTemplate}
        </div>
      </fieldset>
    </div>`
  );
};

const createTypeTemplate = (point, types) => (
  `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    ${createTypeListTemplate(point, types)}
  </div>`
);

const createDestinationList = (destinations, currentDestination) => {
  const currentDestinationName = currentDestination ? currentDestination.name : '';
  let options = '';
  destinations.forEach((element) => {
    options = `${options}
    <option value="${element.name}"></option>`;
  });

  return (
    `<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestinationName}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${options}
    </datalist>`
  );
};

const createDestinationTemplate = (point, destinations, currentDestination) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${getStringWithUpperCaseFirst(point.type)}
    </label>
    ${createDestinationList(destinations, currentDestination)}
  </div>`
);

const createTimeTemplate = (point) => {
  const startDate = point.dateFrom ? huminizeFullDate(point.dateFrom) : '';
  const endDate = point.dateTo ? huminizeFullDate(point.dateTo) : '';

  return (
    `<div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
    </div>`
  );
};

const createPriceTemplate = ({basePrice}) => (
  `<div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
  </div>`
);

const createOfferTemplate = (offer, isChecked) => {
  const checkedAttribute = isChecked ? ' checked' : '';

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.shortTitle}-1" type="checkbox" name="event-offer-${offer.shortTitle}"${checkedAttribute}>
      <label class="event__offer-label" for="event-offer-${offer.shortTitle}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  );
};

const createOffersTemplate = (point, offers) => {
  if (!offers.length) {
    return '';
  }

  const checkedOffersIds = point.offers;
  let offersListTemplate = '';

  offers.forEach((offer) => {
    const isChecked = checkedOffersIds ? checkedOffersIds.some((checkedOfferId) => checkedOfferId === offer.id) : false;

    offersListTemplate = offersListTemplate + createOfferTemplate(offer, isChecked);
  });

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersListTemplate}
      </div>
    </section>`
  );
};

const createPhotoTemplate = ({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`;

const createPhotosContainerTemplate = (pictures) => {
  if(!pictures.length) {
    return '';
  }

  let picturesTemplate = '';

  pictures.forEach((picture) => {
    picturesTemplate = picturesTemplate + createPhotoTemplate(picture);
  });

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${picturesTemplate}
      </div>
    </div>`
  );
};

const createDestinationInfoTemplate = (currentDestination) => {
  if (!currentDestination) {
    return '';
  }

  const {description, pictures} = currentDestination;

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${createPhotosContainerTemplate(pictures)}
    </section>`
  );
};

const createPointEditTemplate = (typePack, destinations, offerPack, currentPoint) => {
  const editedPoint = currentPoint ? currentPoint : createEmptyPoint(typePack);
  const types = Object.values(typePack).map((element) => element.type);
  const keyType = formatToScreamingSnakeCase(editedPoint.type);
  const currentDestination = destinations.find((destination) => destination.id === editedPoint.destination);

  return (
    `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${createTypeTemplate(editedPoint, types)}
        ${createDestinationTemplate(editedPoint, destinations, currentDestination)}
        ${createTimeTemplate(editedPoint)}
        ${createPriceTemplate(editedPoint)}
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        ${createOffersTemplate(editedPoint, offerPack[keyType])}
        ${createDestinationInfoTemplate(currentDestination)}
      </section>
    </form>`
  );
};

export default class PointEditView {
  constructor(typePack, destinations, offerPack, currentPoint) {
    this.typePack = typePack;
    this.destinations = destinations;
    this.offerPack = offerPack;
    this.currentPoint = currentPoint ? currentPoint : '';
  }

  getTemplate() {
    return createPointEditTemplate(this.typePack, this.destinations, this.offerPack, this.currentPoint);
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
