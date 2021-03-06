'use strict';

const map = document.querySelector(`.map`);
const form = document.querySelector(`.ad-form`);
const mainPin = map.querySelector(`.map__pin--main`);
const PinDefaultPosition = {
  TOP: `375px`,
  LEFT: `570px`
};

const successLoadHandler = (pins) => {
  window.pinsList = pins;
  window.filter.inactivateFilter(false);
  window.filter.filteredPins();
};

const onMainPinClick = () => {
  map.classList.remove(`map--faded`);
  window.backend.load(successLoadHandler, window.statusMessage.onError, true);
  activateForm();
};

const activateForm = () => {
  form.classList.remove(`ad-form--disabled`);
  window.form.inactivateForm(false);
  mainPin.removeEventListener(`click`, onMainPinClick);
};

const resetMap = () => {
  const pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  for (let pin of pins) {
    pin.remove();
  }
  window.card.removeCard();
};

const getMainAddressX = () => parseInt(mainPin.style.left, 10) + window.dragAndDrop.PinSize.WIDTH / 2;
const getMainAddressY = () => parseInt(mainPin.style.top, 10) + window.dragAndDrop.PinSize.HEIGHT;

const setMainAddress = () => {
  form.address.value = `${getMainAddressX()}, ${getMainAddressY()}`;
};

const resetPage = () => {
  resetMap();
  window.form.resetForm();
  window.form.inactivateForm(true);
  window.filter.inactivateFilter(true);
  map.classList.add(`map--faded`);
  form.classList.add(`ad-form--disabled`);
  mainPin.style.left = PinDefaultPosition.LEFT;
  mainPin.style.top = PinDefaultPosition.TOP;
  mainPin.addEventListener(`click`, onMainPinClick);
  setMainAddress();
};

setMainAddress();
mainPin.addEventListener(`click`, onMainPinClick);

window.main = {
  setMainAddress,
  resetMap,
  resetPage
};
