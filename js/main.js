'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const form = document.querySelector(`.ad-form`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const PinDefaultPosition = {
    TOP: `375px`,
    LEFT: `570px`
  };

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

  const resetPage = () => {
    const pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    for (let pin of pins) {
      pin.remove();
    }
    mainPin.style.left = PinDefaultPosition.LEFT;
    mainPin.style.top = PinDefaultPosition.TOP;
    window.form.inactivateForm(true);
    form.reset();
    mainPin.addEventListener(`click`, onMainPinClick);
  };

  const onClosePopup = () => {
    resetPage();
    form.removeEventListener(`change`, window.form.onFormElementChange);
    form.removeEventListener(`submit`, window.form.onSubmitForm);
    form.removeEventListener(`reset`, window.form.onResetBtnClick);
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
