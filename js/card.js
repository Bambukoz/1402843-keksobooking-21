'use strict';

(function () {
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
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
  const photoTemplate = document.querySelector(`#photo`).content;

  const getWordsEndings = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

  const getRenderFeature = (featureData) => {
    const newFeature = document.createElement(`li`);
    newFeature.className = `${FEATURE_CLASS} ${features[featureData]}`;
    return newFeature;
  };

  const getRenderPhoto = (photoData) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector(`img`).src = photoData;
    return photoElement;
  };

  const getRenderCard = (cardData) => {
    const cardElement = cardTemplate.cloneNode(true);
    const featuresList = cardElement.querySelector(`.popup__features`);
    const photosList = cardElement.querySelector(`.popup__photos`);
    document.addEventListener(`keydown`, window.util.onEscBtnClick);
    cardElement.querySelector(`.popup__close`).addEventListener(`click`, window.util.onCloseBtnClick);
    cardElement.querySelector(`.popup__avatar`).src = cardData.author.avatar;
    cardElement.querySelector(`.popup__title`).textContent = cardData.offer.title;
    cardElement.querySelector(`.popup__text--address`).textContent = cardData.offer.address;
    cardElement.querySelector(`.popup__text--price`).textContent = `${cardData.offer.price} ₽/ночь`;
    cardElement.querySelector(`.popup__type`).textContent = typesOfHousing[cardData.offer.type];
    cardElement.querySelector(`.popup__text--capacity`).textContent = `${cardData.offer.rooms} ${getWordsEndings(cardData.offer.rooms, [`комната`, `комнаты`, `комнат`])} для ${cardData.offer.guests} ${getWordsEndings(cardData.offer.guests, [`гостя`, `гостей`])}`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;

    for (let i = 0; i < cardData.offer.features.length; i++) {
      featuresList.append(getRenderFeature(cardData.offer.features[i]));
    }

    for (let i = 0; i < cardData.offer.photos.length; i++) {
      photosList.append(getRenderPhoto(cardData.offer.photos[i]));
    }

    cardElement.querySelector(`.popup__description`).textContent = cardData.offer.description;
    return cardElement;
  };

  const createCard = (card) => {
    const popup = map.querySelector(`.popup`);
    if (map.contains(popup)) {
      popup.remove();
    }
    map.append(getRenderCard(card));
  };

  window.card = {
    features,
    typesOfHousing,
    createCard
  };
})();
