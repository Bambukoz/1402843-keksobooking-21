'use strict';

const TITLES = [`Пустой сруб`, `Кирпичный завод`, `Просторная улица`, `Крыша небоскреба`, `Подвал с бомжами`, `Кабинет министров`, `Буддийский храм`, `Социальное дно`];
const DESCRIPTIONS = [`Прекрасный вид из единственного окна на самого себя`, `Сдам срочно! Дешево! Без посредников!`, `Я мимо проходил`, `Го ко мне, я создал`];
const PHOTOS_LINK = `http://o0.github.io/assets/images/tokyo/`;
const PHOTOS = [`hotel1.jpg`, `hotel2.jpg`, `hotel3.jpg`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const ROOMS = [1, 2, 3, 100];
const FEATURES_CLASS = `popup__feature`;
const Pin = {
  AMOUNT: 8,
  WIDTH: 50,
  HEIGHT: 70
};
const Prices = {
  MIN: 1000,
  MAX: 10000
};
const Locations = {
  X_MIN: 0,
  X_MAX: 980,
  Y_MIN: 130,
  Y_MAX: 630,
};
const Guests = {
  MIN: 1,
  MAX: 3
};
const features = {
  wifi: FEATURES_CLASS + `--wifi`,
  dishwasher: FEATURES_CLASS + `--dishwasher`,
  parking: FEATURES_CLASS + `--parking`,
  washer: FEATURES_CLASS + `--washer`,
  elevator: FEATURES_CLASS + `--elevator`,
  conditioner: FEATURES_CLASS + `--conditioner`
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
    cards.push(
        {
          author: {
            avatar: `img/avatars/user0${i + 1}.png`,
          },
          offer: {
            title: TITLES[i],
            address: `${getRandomRange(Locations.X_MIN, Locations.X_MAX)}, ${getRandomRange(Locations.Y_MIN, Locations.Y_MAX)}`,
            price: getRandomRange(Prices.MIN, Prices.MAX),
            type: getRandomElement(Object.keys(typesOfHousing)),
            rooms: getRandomElement(ROOMS),
            guests: getRandomRange(Guests.MIN, Guests.MAX),
            checkin: getRandomElement(TIMES),
            checkout: getRandomElement(TIMES),
            features: getRandomArr(Object.keys(features), getRandomNumber(Object.keys(features).length)),
            description: getRandomElement(DESCRIPTIONS),
            photos: getRandomArr(PHOTOS, getRandomNumber(PHOTOS.length), PHOTOS_LINK)
          },
          location: {
            x: getRandomRange(Locations.X_MIN, Locations.X_MAX),
            y: getRandomRange(Locations.Y_MIN, Locations.Y_MAX)
          }
        }
    );
  }
  return cards;
};

const renderPin = (obj) => {
  const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`).cloneNode(true);
  pin.style.left = `${obj.location.x + Pin.WIDTH / 2}px`;
  pin.style.top = `${obj.location.y + Pin.HEIGHT}px`;
  pin.querySelector(`img`).src = obj.author.avatar;
  pin.querySelector(`img`).alt = obj.offer.title;
  return pin;
};

const createPins = (pins) => {
  const fragment = document.createDocumentFragment();
  for (let pin of pins) {
    fragment.appendChild(renderPin(pin));
  }
  map.querySelector(`.map__pins`).appendChild(fragment);
};

const getWordsEndings = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

const renderCard = (dataObject) => {
  const card = document.querySelector(`#card`).content.querySelector(`.popup`).cloneNode(true);
  const featuresList = card.querySelector(`.popup__features`);
  const photo = card.querySelector(`.popup__photo`);

  card.querySelector(`.popup__avatar`).src = dataObject.author.avatar;
  card.querySelector(`.popup__title`).textContent = dataObject.offer.title;
  card.querySelector(`.popup__text--address`).textContent = dataObject.offer.address;
  card.querySelector(`.popup__text--price`).textContent = `${dataObject.offer.price} ₽/ночь`;
  card.querySelector(`.popup__type`).textContent = typesOfHousing[dataObject.offer.type];
  card.querySelector(`.popup__text--capacity`).textContent = `${dataObject.offer.rooms} ${getWordsEndings(dataObject.offer.rooms, [`комната`, `комнаты`, `комнат`])} для ${dataObject.offer.guests} ${getWordsEndings(dataObject.offer.guests, [`гостя`, `гостей`])}`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ${dataObject.offer.checkin}, выезд до ${dataObject.offer.checkout}`;

  for (let i = 0; i < dataObject.offer.features.length; i++) {
    featuresList.appendChild(document.createElement(`li`)).className = `${FEATURES_CLASS} ${features[dataObject.offer.features[i]]}`;
  }

  photo.src = dataObject.offer.photos[0];
  if (dataObject.offer.photos.length > 1) {
    const fragment = document.createDocumentFragment();
    for (let i = 1; i < dataObject.offer.photos.length; i++) {
      fragment.appendChild(photo.cloneNode(true)).src = dataObject.offer.photos[i];
    }
    photo.parentElement.appendChild(fragment);
  } else {
    card.querySelector(`.popup__photos`).remove();
  }

  card.querySelector(`.popup__description`).textContent = dataObject.offer.description;
  return card;
};

const createCards = (card) => {
  map.appendChild(document.createDocumentFragment().appendChild(renderCard(card)));
};

const createBlocks = (arr) => {
  createPins(arr);
  createCards(arr[0]);
};

createBlocks(getCards(Pin.AMOUNT));
