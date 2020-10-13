'use strict';

(function () {

  const PINS_AMOUNT = 8;
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const form = document.querySelector(`.ad-form`);

  const onMainPinClick = () => {
    map.classList.remove(`map--faded`);
    window.pin.createPins(window.data.getCards(PINS_AMOUNT));
    activateForm();
    mainPin.removeEventListener(`click`, onMainPinClick);
  };

  const activateForm = () => {
    form.classList.remove(`ad-form--disabled`);
    window.form.inactivateForm(false);
    form.addEventListener(`change`, window.form.onFormElementChange);
  };

  const getMainAddressX = () => parseInt(mainPin.style.left, 10) + window.pin.Pin.WIDTH / 2;
  const getMainAddressY = () => parseInt(mainPin.style.top, 10) + window.pin.Pin.HEIGHT;

  const setMainAddress = () => {
    form.address.value = `${getMainAddressX()}, ${getMainAddressY()}`;
  };

  mainPin.addEventListener(`click`, onMainPinClick);

  window.main = {
    map,
    setMainAddress
  };
})();
