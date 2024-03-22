import dayjs from 'dayjs';
import { getRandomIntegerWitinRange, createUniqueNumberGenerator, getRandomArrayElement, sortArrayToIncrease } from '../utils.js';
import { DESTINATIONS } from './destination.js';
import { Offer } from './offer.js';
// const test = {
//   type: '',
//   dateFrom: '',
//   dateTo: '',
//   destination: {
//     name: '',
//     description: '',
//     pictures: [
//       {
//         src: '',
//         description: '',
//       }
//     ],
//   },
//   basePrice: '',
//   offers: [{
//     title: '',
//     price: 0,
//   }],
//   isFavourite: false,
// };
const MONTHS_QIANTITY = 12;
const DAYS_QUANTITY = 31;
const HOURS_QUANTITY = 23;
const MINUTES_QUANTITY = 59;
const MINUTES_IN_DAY = 1440;

const Type = {
  TAXI: {
    type: 'taxi',
    price: 20,
  },
  BUS: {
    type: 'bus',
    price: 10,
  },
  TRAIN: {
    type: 'train',
    price: 10,
  },
  SHIP: {
    type: 'ship',
    price: 10,
  },
  DRIVE: {
    type: 'drive',
    price: 20,
  },
  FLIGHT: {
    type: 'flight',
    price: 160,
  },
  CHECK_IN: {
    type: 'check-in',
    price: 600,
  },
  SIGHTSEEING: {
    type: 'sightseeing',
    price: 180,
  },
  RESTAURANT: {
    type: 'restaurant',
    price: 10,
  },
};

const createRandomDate = () => new Date(2024, getRandomIntegerWitinRange(1, MONTHS_QIANTITY), getRandomIntegerWitinRange(1, DAYS_QUANTITY), getRandomIntegerWitinRange(0, HOURS_QUANTITY), getRandomIntegerWitinRange(0, MINUTES_QUANTITY));

const increaseDate = (initDate) => dayjs(initDate).add(getRandomIntegerWitinRange(0, MINUTES_IN_DAY), 'm').toDate();

const createOffersIndexes = (offers) => {
  const indexes = [];

  if (offers.length >= 1) {
    const getUniqueId = createUniqueNumberGenerator(0, offers.length - 1);
    for (let i = 0; i <= getRandomIntegerWitinRange(0, offers.length - 1); i++) {
      const newIndex = getUniqueId();
      indexes.push(newIndex);
    }
  }

  sortArrayToIncrease(indexes);

  return indexes;
};

const createRandomPoint = () => {
  const type = Type[getRandomArrayElement(Object.keys(Type))].type;
  const keeType = type.replace('-', '_').toUpperCase();
  const startDate = createRandomDate();
  return ({
    type: type,
    dateFrom: startDate,
    dateTo: increaseDate(startDate),
    destination: getRandomIntegerWitinRange(0, DESTINATIONS.length - 1),
    basePrice: Type[keeType].price,
    offers: createOffersIndexes(Offer[keeType]),
    isFavorite: Boolean(getRandomIntegerWitinRange(0, 1)),
  });
};

export { createRandomPoint };
