'use strict';

(function () {

  // const PINS_AMOUNT = 8;
  const map = document.querySelector(`.map`);
  const form = document.querySelector(`.ad-form`);
  const mainPin = map.querySelector(`.map__pin--main`);

  const onMainPinClick = () => {
    map.classList.remove(`map--faded`);
    window.backend.load(window.pin.createPins, window.statusMessage.onError, true);
    activateForm();
    mainPin.removeEventListener(`click`, onMainPinClick);
  };

  const activateForm = () => {
    form.classList.remove(`ad-form--disabled`);
    window.form.inactivateForm(false);
    form.addEventListener(`change`, window.form.onFormElementChange);
    form.addEventListener(`submit`, window.form.onSubmitForm);
    form.addEventListener(`reset`, window.form.onResetBtnClick);
  };

  const onClosePopup = () => {
    form.classList.add(`ad-form--disabled`);
    window.form.inactivateForm(true);
    form.removeEventListener(`change`, window.form.onFormElementChange);
    form.removeEventListener(`submit`, window.form.onSubmitForm);
    form.removeEventListener(`reset`, window.form.onResetBtnClick);
    form.reset();
  };

  const getMainAddressX = () => parseInt(mainPin.style.left, 10) + window.pin.Pin.WIDTH / 2;
  const getMainAddressY = () => parseInt(mainPin.style.top, 10) + window.pin.Pin.HEIGHT;

  const setMainAddress = () => {
    form.address.value = `${getMainAddressX()}, ${getMainAddressY()}`;
  };

  mainPin.addEventListener(`click`, onMainPinClick);

  window.main = {
    setMainAddress,
    onClosePopup
  };
})();
