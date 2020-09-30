'use strict';

const TITLES = [`Пустой сруб`, `Кирпичный завод`, `Просторная улица`, `Крыша небоскреба`, `Подвал с бомжами`, `Кабинет министров`, `Буддийский храм`, `Социальное дно`];
const DESCRIPTIONS = [`Прекрасный вид из единственного окна на самого себя`, `Сдам срочно! Дешево! Без посредников!`, `Я мимо проходил`, `Го ко мне, я создал`];
const PHOTOS_LINK = `http://o0.github.io/assets/images/tokyo/`;
const PHOTOS = [`hotel1.jpg`, `hotel2.jpg`, `hotel3.jpg`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const ROOMS = [1, 2, 3, 100];
const MIN_GUESTS = 1;
const MAX_GUESTS = 3;
const FEATURES_CLASS = `popup__feature--`;
const FEATURES = {
  wifi: FEATURES_CLASS + `wifi`,
  dishwasher: FEATURES_CLASS + `dishwasher`,
  parking: FEATURES_CLASS + `parking`,
  washer: FEATURES_CLASS + `washer`,
  elevator: FEATURES_CLASS + `elevator`,
  conditioner: FEATURES_CLASS + `conditioner`
};
const TYPES = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
const PIN = {
  AMOUNT: 8,
  WIDTH: 50,
  HEIGHT: 70
};
const PRICES = {
  MIN: 1000,
  MAX: 10000
};
const LOCATIONS = {
  X_MIN: 0,
  X_MAX: 980,
  Y_MIN: 130,
  Y_MAX: 630,
};

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const getRandomNumber = (number) => Math.floor(Math.random() * number);
const getRandomIndex = (arr) => arr[Math.floor(Math.random() * arr.length)];
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
            address: `${getRandomRange(LOCATIONS.X_MIN, LOCATIONS.X_MAX)}, ${getRandomRange(LOCATIONS.Y_MIN, LOCATIONS.Y_MAX)}`,
            price: getRandomRange(PRICES.MIN, PRICES.MAX),
            type: getRandomIndex(Object.keys(TYPES)),
            rooms: getRandomIndex(ROOMS),
            guests: getRandomRange(MIN_GUESTS, MAX_GUESTS),
            checkin: getRandomIndex(TIMES),
            checkout: getRandomIndex(TIMES),
            features: getRandomArr(Object.keys(FEATURES), getRandomNumber(Object.keys(FEATURES).length)),
            description: getRandomIndex(DESCRIPTIONS),
            photos: getRandomArr(PHOTOS, getRandomNumber(PHOTOS.length), PHOTOS_LINK)
          },
          location: {
            x: getRandomRange(LOCATIONS.X_MIN, LOCATIONS.X_MAX),
            y: getRandomRange(LOCATIONS.Y_MIN, LOCATIONS.Y_MAX)
          }
        }
    );
  }
  return cards;
};

const renderPin = (obj) => {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pin = pinTemplate.cloneNode(true);
  pin.style.left = `${obj.location.x + PIN.WIDTH / 2}px`;
  pin.style.top = `${obj.location.y + PIN.HEIGHT}px`;
  pin.querySelector(`img`).src = obj.author.avatar;
  pin.querySelector(`img`).alt = obj.offer.title;
  return pin;
};

const createPins = (pins) => {
  const fragment = document.createDocumentFragment();
  const mapPins = map.querySelector(`.map__pins`);
  for (let pin of pins) {
    fragment.appendChild(renderPin(pin));
  }
  mapPins.appendChild(fragment);
};

const declOfNum = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

const renderCard = (obj) => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
  const card = cardTemplate.cloneNode(true);
  const features = card.querySelectorAll(`.popup__feature`);
  const photo = card.querySelector(`.popup__photo`);

  card.querySelector(`.popup__avatar`).src = obj.author.avatar;
  card.querySelector(`.popup__title`).textContent = obj.offer.title;
  card.querySelector(`.popup__text--address`).textContent = obj.offer.address;
  card.querySelector(`.popup__text--price`).textContent = `${obj.offer.price} ₽/ночь`;
  card.querySelector(`.popup__type`).textContent = TYPES[obj.offer.type];
  card.querySelector(`.popup__text--capacity`).textContent = `${obj.offer.rooms} ${declOfNum(obj.offer.rooms, [`комната`, `комнаты`, `комнат`])} для ${obj.offer.guests} ${declOfNum(obj.offer.guests, [`гостя`, `гостей`])}`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;

  // Тут я конечно считерил, но другое решение пока что не придумал
  for (let i = 0; i < features.length; i++) {
    for (let j = 0; j < obj.offer.features.length; j++) {
      if (features[i].classList.contains(FEATURES[obj.offer.features[j]])) {
        features[i].classList.remove(`hidden`);
      }
    }
  }
  // Возможно это стоит вынести в отдельные функции?
  photo.src = obj.offer.photos[0];
  if (obj.offer.photos.length > 1) {
    const fragment = document.createDocumentFragment();
    for (let i = 1; i < obj.offer.photos.length; i++) {
      fragment.appendChild(photo.cloneNode(true)).src = obj.offer.photos[i];
    }
    photo.parentElement.appendChild(fragment);
  } else {
    card.querySelector(`.popup__photos`).remove();
  }

  card.querySelector(`.popup__description`).textContent = obj.offer.description;
  return card;
};

const createCards = (card) => {
  const fragment = document.createDocumentFragment();
  // for (let card of cards) {
  fragment.appendChild(renderCard(card));
  // }
  map.appendChild(fragment);
};

const createAd = (arr) => {
  const dataArr = arr;
  createPins(dataArr);
  createCards(dataArr[0]);
};

createAd(getCards(PIN.AMOUNT));
