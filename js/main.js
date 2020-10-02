'use strict';

const TITLES = [
  `Пустой сруб`,
  `Кирпичный завод`,
  `Просторная улица`,
  `Крыша небоскреба`,
  `Подвал с бомжами`,
  `Кабинет министров`,
  `Буддийский храм`,
  `Социальное дно`
];
const DESCRIPTIONS = [
  `Прекрасный вид из единственного окна на самого себя`,
  `Сдам срочно! Дешево! Без посредников!`,
  `Я мимо проходил`,
  `Го ко мне, я создал`
];
const PHOTOS_LINK = `http://o0.github.io/assets/images/tokyo/`;
const PHOTOS = [
  `hotel1.jpg`,
  `hotel2.jpg`,
  `hotel3.jpg`
];
const TIMES = [
  `12:00`,
  `13:00`,
  `14:00`
];
const ROOMS = [
  1,
  2,
  3,
  100
];
const Pin = {
  AMOUNT: 8,
  WIDTH: 50,
  HEIGHT: 70
};
const Price = {
  MIN: 1000,
  MAX: 10000
};
const Coordinate = {
  X_MIN: 0,
  X_MAX: 980,
  Y_MIN: 130,
  Y_MAX: 630,
};
const Guest = {
  MIN: 1,
  MAX: 3
};
const FEATURE_CLASS = `popup__feature`;
const features = {
  wifi: FEATURE_CLASS + `--wifi`,
  dishwasher: FEATURE_CLASS + `--dishwasher`,
  parking: FEATURE_CLASS + `--parking`,
  washer: FEATURE_CLASS + `--washer`,
  elevator: FEATURE_CLASS + `--elevator`,
  conditioner: FEATURE_CLASS + `--conditioner`
};
const typesOfHousing = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const getRandomNumber = (number) => Math.floor(Math.random() * number);
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArr = (arr, number, string) => {
  const randomArr = [];
  for (let i = 0; i < number; i++) {
    if (string === undefined) {
      randomArr.push(arr[getRandomNumber(arr.length)]);
    } else {
      randomArr.push(string + arr[getRandomNumber(arr.length)]);
    }
  }
  return Array.from(new Set(randomArr));
};

const getCards = (quantity) => {
  const cards = [];
  for (let i = 0; i < quantity; i++) {
    const locationX = getRandomRange(Coordinate.X_MIN, Coordinate.X_MAX);
    const locationY = getRandomRange(Coordinate.Y_MIN, Coordinate.Y_MAX);
    cards.push(
        {
          author: {
            avatar: `img/avatars/user0${i + 1}.png`,
          },
          offer: {
            title: TITLES[i],
            address: `${locationX}, ${locationY}`,
            price: getRandomRange(Price.MIN, Price.MAX),
            type: getRandomElement(Object.keys(typesOfHousing)),
            rooms: getRandomElement(ROOMS),
            guests: getRandomRange(Guest.MIN, Guest.MAX),
            checkin: getRandomElement(TIMES),
            checkout: getRandomElement(TIMES),
            features: getRandomArr(Object.keys(features), getRandomNumber(Object.keys(features).length)),
            description: getRandomElement(DESCRIPTIONS),
            photos: getRandomArr(PHOTOS, getRandomNumber(PHOTOS.length), PHOTOS_LINK)
          },
          location: {
            x: locationX,
            y: locationY
          }
        }
    );
  }
  return cards;
};

const getRenderPin = (pin) => {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`).cloneNode(true);
  pinTemplate.style.left = `${pin.location.x + Pin.WIDTH / 2}px`;
  pinTemplate.style.top = `${pin.location.y + Pin.HEIGHT}px`;
  pinTemplate.querySelector(`img`).src = pin.author.avatar;
  pinTemplate.querySelector(`img`).alt = pin.offer.title;
  return pinTemplate;
};

const createPins = (pins) => {
  const fragment = document.createDocumentFragment();
  for (let pin of pins) {
    fragment.append(getRenderPin(pin));
  }
  map.querySelector(`.map__pins`).append(fragment);
};

const getWordsEndings = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

const getRenderFeature = (featureData) => {
  const newFeature = document.createElement(`li`);
  newFeature.className = `${FEATURE_CLASS} ${features[featureData]}`;
  return newFeature;
};

const getRenderPhoto = (photoData) => {
  const photoTemplate = document.querySelector(`#photo`).content.cloneNode(true);
  photoTemplate.querySelector(`img`).src = photoData;
  return photoTemplate;
};

const getRenderCard = (cardData) => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`).cloneNode(true);
  const featuresList = cardTemplate.querySelector(`.popup__features`);
  const photosList = cardTemplate.querySelector(`.popup__photos`);

  cardTemplate.querySelector(`.popup__avatar`).src = cardData.author.avatar;
  cardTemplate.querySelector(`.popup__title`).textContent = cardData.offer.title;
  cardTemplate.querySelector(`.popup__text--address`).textContent = cardData.offer.address;
  cardTemplate.querySelector(`.popup__text--price`).textContent = `${cardData.offer.price} ₽/ночь`;
  cardTemplate.querySelector(`.popup__type`).textContent = typesOfHousing[cardData.offer.type];
  cardTemplate.querySelector(`.popup__text--capacity`).textContent = `${cardData.offer.rooms} ${getWordsEndings(cardData.offer.rooms, [`комната`, `комнаты`, `комнат`])} для ${cardData.offer.guests} ${getWordsEndings(cardData.offer.guests, [`гостя`, `гостей`])}`;
  cardTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;

  for (let i = 0; i < cardData.offer.features.length; i++) {
    featuresList.append(getRenderFeature(cardData.offer.features[i]));
  }

  for (let i = 0; i < cardData.offer.photos.length; i++) {
    photosList.append(getRenderPhoto(cardData.offer.photos[i]));
  }

  cardTemplate.querySelector(`.popup__description`).textContent = cardData.offer.description;
  return cardTemplate;
};

const createCard = (card) => {
  map.append(getRenderCard(card));
};

const createBlocks = (cards) => {
  createPins(cards);
  createCard(cards[0]);
};

createBlocks(getCards(Pin.AMOUNT));
