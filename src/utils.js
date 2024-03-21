const getRandomIntegerWitinRange = (min, max) => {
  const minValue = Math.ceil(Math.min(min, max));
  const maxValue = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomIntegerWitinRange(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getRandomArrayElement = (array) => array[getRandomIntegerWitinRange(0, array.length - 1)];

const getSomeRandomArrayElements = (array, elementsQuantity = 0) => {
  const shuffledArray = array.slice();

  shuffleArray(shuffledArray);

  return shuffledArray.slice(0, elementsQuantity + 1);
};

export { getRandomIntegerWitinRange, shuffleArray, getRandomArrayElement, getSomeRandomArrayElements };
