'use strict';

const map = document.querySelector(`.map`);
const mainPin = map.querySelector(`.map__pin--main`);
const PinSize = {
  WIDTH: 65,
  HEIGHT: 65
};
const Coordinate = {
  X_MIN: 0 - PinSize.WIDTH / 2,
  X_MAX: map.offsetWidth - PinSize.WIDTH / 2,
  Y_MIN: 130,
  Y_MAX: 630,
};

const onMouseDown = (evt) => {
  evt.preventDefault();
  window.main.setMainAddress();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    const CoordinateMainPin = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (CoordinateMainPin.x >= Coordinate.X_MIN && CoordinateMainPin.x <= Coordinate.X_MAX) {
      mainPin.style.left = `${CoordinateMainPin.x}px`;
    }

    if (CoordinateMainPin.y >= Coordinate.Y_MIN && CoordinateMainPin.y <= Coordinate.Y_MAX) {
      mainPin.style.top = `${CoordinateMainPin.y}px`;
    }

    window.main.setMainAddress();
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

mainPin.addEventListener(`mousedown`, onMouseDown);
