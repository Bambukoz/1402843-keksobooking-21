'use strict';

(function () {

  const PINS_AMOUNT = 8;
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const form = document.querySelector(`.ad-form`);

  const onMainPinClick = (evt) => {
    if (evt.button === window.util.KeyButtons.MOUSE_LEFT || evt.key === window.util.KeyButtons.ENTER) {
      map.classList.remove(`map--faded`);
      window.pin.createPins(window.data.getCards(PINS_AMOUNT));
      activateForm();
      setMainAddress();
      mainPin.removeEventListener(`mousedown`, onMainPinClick);
      mainPin.removeEventListener(`keydown`, onMainPinClick);
    }
  };

  const getMainAddressX = () => parseInt(mainPin.style.left, 10) + window.pin.Pin.WIDTH / 2;
  const getMainAddressY = () => parseInt(mainPin.style.top, 10) + window.pin.Pin.HEIGHT;

  const setMainAddress = () => {
    form.address.value = `${getMainAddressX()}, ${getMainAddressY()}`;
  };

  const activateForm = () => {
    form.classList.remove(`ad-form--disabled`);
    window.form.inactivateForm(false);
    form.addEventListener(`change`, window.form.onFormElementChange);
  };

  mainPin.addEventListener(`mousedown`, onMainPinClick);
  mainPin.addEventListener(`keydown`, onMainPinClick);
})();
