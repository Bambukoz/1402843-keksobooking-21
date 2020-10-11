'use strict';

(function () {
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

  const getCards = (quantity) => {
    const cards = [];
    for (let i = 0; i < quantity; i++) {
      const locationX = window.random.getRandomRange(Coordinate.X_MIN, Coordinate.X_MAX);
      const locationY = window.random.getRandomRange(Coordinate.Y_MIN, Coordinate.Y_MAX);
      cards.push(
          {
            author: {
              avatar: `img/avatars/user0${i + 1}.png`,
            },
            offer: {
              title: TITLES[i],
              address: `${locationX}, ${locationY}`,
              price: window.random.getRandomRange(Price.MIN, Price.MAX),
              type: window.random.getRandomElement(Object.keys(window.card.typesOfHousing)),
              rooms: window.random.getRandomElement(ROOMS),
              guests: window.random.getRandomRange(Guest.MIN, Guest.MAX),
              checkin: window.random.getRandomElement(TIMES),
              checkout: window.random.getRandomElement(TIMES),
              features: window.random.getRandomArr(Object.keys(window.card.features), window.random.getRandomNumber(Object.keys(window.card.features).length)),
              description: window.random.getRandomElement(DESCRIPTIONS),
              photos: window.random.getRandomArr(PHOTOS, window.random.getRandomNumber(PHOTOS.length), PHOTOS_LINK)
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

  window.data = {
    getCards
  };
})();
