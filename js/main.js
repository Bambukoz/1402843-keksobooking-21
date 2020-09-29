'use strict';

const TITLES = [`Пустой сруб`, `Кирпичный завод`, `Просторная улица`, `Крыша небоскреба`, `Подвал с бомжами`, `Кабинет министров`, `Буддийский храм`, `Социальное дно`];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS_LINK = `http://o0.github.io/assets/images/tokyo/`;
const PHOTOS = [`hotel1.jpg`, `hotel2.jpg`, `hotel3.jpg`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const ROOMS = [1, 2, 3, 100];
const MIN_GUESTS = 0;
const MAX_GUESTS = 3;
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
            type: getRandomIndex(TYPES),
            rooms: getRandomIndex(ROOMS),
            guests: getRandomRange(MIN_GUESTS, MAX_GUESTS),
            checkin: getRandomIndex(TIMES),
            checkout: getRandomIndex(TIMES),
            features: getRandomArr(FEATURES, getRandomNumber(FEATURES.length)),
            description: ` `,
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

createPins(getCards(PIN.AMOUNT));
