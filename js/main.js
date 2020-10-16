'use strict';

(function () {

  // const PINS_AMOUNT = 8;
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);

  const onMainPinClick = () => {
    map.classList.remove(`map--faded`);
    window.load.load(window.pin.createPins, window.error.onLoadError);
    activateForm();
    mainPin.removeEventListener(`click`, onMainPinClick);
  };

  const activateForm = () => {
    window.form.form.classList.remove(`ad-form--disabled`);
    window.form.inactivateForm(false);
    window.form.form.addEventListener(`change`, window.form.onFormElementChange);
  };

  const getMainAddressX = () => parseInt(mainPin.style.left, 10) + window.pin.Pin.WIDTH / 2;
  const getMainAddressY = () => parseInt(mainPin.style.top, 10) + window.pin.Pin.HEIGHT;

  const setMainAddress = () => {
    window.form.form.address.value = `${getMainAddressX()}, ${getMainAddressY()}`;
  };

  mainPin.addEventListener(`click`, onMainPinClick);

  window.main = {
    map,
    mainPin,
    setMainAddress
  };
})();
