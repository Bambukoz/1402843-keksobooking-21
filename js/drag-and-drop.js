'use strict';

const map = document.querySelector(`.map`);
const mainPin = map.querySelector(`.map__pin--main`);
const PinSize = {
  WIDTH: 62,
  HEIGHT: 84
};
const Coordinate = {
  X_MIN: 0 - PinSize.WIDTH / 2,
  X_MAX: map.offsetWidth - PinSize.WIDTH / 2,
  Y_MIN: 130,
  Y_MAX: 630,
};

const onMouseDown = (evt) => {
  evt.preventDefault();

  let StartCoords = {
    X: evt.clientX,
    Y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const Shift = {
      X: StartCoords.X - moveEvt.clientX,
      Y: StartCoords.Y - moveEvt.clientY
    };

    const CoordinateMainPin = {
      X: mainPin.offsetLeft - Shift.X,
      Y: mainPin.offsetTop - Shift.Y
    };

    StartCoords = {
      X: moveEvt.clientX,
      Y: moveEvt.clientY
    };

    if (CoordinateMainPin.X >= Coordinate.X_MIN && CoordinateMainPin.X <= Coordinate.X_MAX) {
      mainPin.style.left = `${CoordinateMainPin.X}px`;
    }

    if (CoordinateMainPin.Y >= Coordinate.Y_MIN && CoordinateMainPin.Y <= Coordinate.Y_MAX) {
      mainPin.style.top = `${CoordinateMainPin.Y}px`;
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

window.dragAndDrop = {
  PinSize
};
