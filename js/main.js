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
    window.backend.load(window.filter.successLoadHandler, window.statusMessage.onError, true);
    activateForm();
    mainPin.removeEventListener(`click`, onMainPinClick);
  };


  const activateForm = () => {
    form.classList.remove(`ad-form--disabled`);
    window.form.inactivateForm(false);
  };

  const resetMap = () => {
    const pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let pin of pins) {
      pin.remove();
    }
  };

  const resetPage = () => {
    resetMap();
    map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    mainPin.style.left = PinDefaultPosition.LEFT;
    mainPin.style.top = PinDefaultPosition.TOP;
    window.form.inactivateForm(true);
    window.filter.inactivateFilter(true);
    form.reset();
    mainPin.addEventListener(`click`, onMainPinClick);
  };

  const onClosePopup = () => {
    resetPage();
  };

  const getMainAddressX = () => parseInt(mainPin.style.left, 10) + window.pin.Pin.WIDTH / 2;
  const getMainAddressY = () => parseInt(mainPin.style.top, 10) + window.pin.Pin.HEIGHT;

  const setMainAddress = () => {
    form.address.value = `${getMainAddressX()}, ${getMainAddressY()}`;
  };

  mainPin.addEventListener(`click`, onMainPinClick);

  window.main = {
    resetMap,
    setMainAddress,
    onClosePopup
  };
})();
