import { getRandomIntegerWitinRange, getRandomArrayElement, getSomeRandomArrayElements } from '../utils.js';

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

const PICTURE_RANDOM_PLACEHOLDER_BASE_SRC = 'https://loremflickr.com/248/152?random=';
const MAX_RANDOM_PICTURE_SRC_NUMBER = 10000;

const DESTINATIONS = [
  'Geneva',
  'Amsterdam',
  'Chamonix',
  'Annecy',
];

const MOCK_TEXTS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const DestinationDescriptionCloseLimit = {
  MIN: 1,
  MAX: 5,
};

const DestinationPicturesQuantity = {
  MIN: 0,
  MAX: 5,
};

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
    type: 'check_in',
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

const Offer = {
  TAXI: [
    {
      title: 'Order Uber',
      price: 20,
    },
    {
      title: 'Upgrade to a business class',
      price: 120,
    },
  ],
  FLIGHT: [
    {
      title: 'Add luggage',
      price: 30,
    },
    {
      title: 'Switch to comfort class',
      price: 100,
    },
    {
      title: 'Add meal',
      price: 15,
    },
    {
      title: 'Choose seats',
      price: 5,
    },
    {
      title: 'Travel by train',
      price: 40,
    },
  ],
  DRIVE: [
    {
      title: 'Rent a car',
      price: 200,
    },
  ],
  CHECK_IN: [
    {
      title: 'Add breakfast',
      price: 50,
    },
  ],
  SIGHTSEEING: [
    {
      title: 'Book tickets',
      price: 40,
    },
    {
      title: 'Lunch in city',
      price: 30,
    },
  ],
};

const createRandomDate = () => new Date(2024, getRandomIntegerWitinRange(1, 12), getRandomIntegerWitinRange(1, 31), getRandomIntegerWitinRange(0, 23), getRandomIntegerWitinRange(0, 59));

const increaseDate = (initDate) => {
  const newDate = new Date(initDate);

  const minutes = newDate.getMinutes();
  newDate.setMinutes(minutes + getRandomIntegerWitinRange(0, 59));

  const hours = newDate.getHours();
  newDate.setHours(hours + getRandomIntegerWitinRange(0, 23));

  return newDate;
};

const createPicturesArray = (destinationPoint) => {
  const pictures = [];
  let picturesQuantity = getRandomIntegerWitinRange(DestinationPicturesQuantity.MIN, DestinationPicturesQuantity.MAX);

  while (picturesQuantity > 0) {
    const newPicture = {
      src: `${PICTURE_RANDOM_PLACEHOLDER_BASE_SRC}${getRandomIntegerWitinRange(0, MAX_RANDOM_PICTURE_SRC_NUMBER)}`,
      description: `${destinationPoint} is a beatiful place for the ${picturesQuantity} time`,
    };
    pictures.push(newPicture);

    picturesQuantity--;
  }

  return pictures;
};

const createDestination = () => {
  const destinationPoint = getRandomArrayElement(DESTINATIONS);

  return ({
    name: destinationPoint,
    description: getSomeRandomArrayElements(MOCK_TEXTS, getRandomIntegerWitinRange(DestinationDescriptionCloseLimit.MIN, DestinationDescriptionCloseLimit.MAX)).join(' '),
    pictures: createPicturesArray(destinationPoint),
  });
};

const createRandomPoint = () => {
  const type = Type[getRandomArrayElement(Object.keys(Type))].type;
  const startDate = createRandomDate();
  return ({
    type: type,
    dateFrom: startDate,
    dateTo: increaseDate(startDate),
    destination: createDestination(),
    basePrice: Type[type.toUpperCase()].price,
    offers: getSomeRandomArrayElements(Offer[type.toUpperCase()], getRandomIntegerWitinRange(0, Offer[type.toUpperCase()].length)),
    isFavourite: Boolean(getRandomIntegerWitinRange(0, 1)),
  });
};

// const createRandomPoints = () => Array.from({length: POINTS_QUANTITY}, createRandomPoint);

export { createRandomPoint };
