'use strict';

const map = document.querySelector(`.map`);
const pinList = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const getRenderPin = (pin) => {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = `${pin.location.x}px`;
  pinElement.style.top = `${pin.location.y}px`;
  pinElement.querySelector(`img`).src = pin.author.avatar;
  pinElement.querySelector(`img`).alt = pin.offer.title;
  return pinElement;
};

const createPins = (pins) => {
  const fragment = document.createDocumentFragment();
  for (let pin of pins) {
    const renderPin = getRenderPin(pin);
    fragment.append(renderPin);
    renderPin.addEventListener(`click`, () => {
      window.card.createCard(pin);
    });
  }
  window.main.resetMap();
  pinList.append(fragment);
};

window.pin = {
  createPins
};
