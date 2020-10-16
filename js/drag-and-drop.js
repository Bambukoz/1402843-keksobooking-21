'use strict';

(function () {
  const MainPin = {
    WIDTH: 65,
    HEIGHT: 65
  };
  const Coordinate = {
    X_MIN: 0 - MainPin.WIDTH / 2,
    X_MAX: window.main.map.offsetWidth - MainPin.WIDTH / 2,
    Y_MIN: 130,
    Y_MAX: 630,
  };

  window.main.mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

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
        x: window.main.mainPin.offsetLeft - shift.x,
        y: window.main.mainPin.offsetTop - shift.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (CoordinateMainPin.x >= Coordinate.X_MIN && CoordinateMainPin.x <= Coordinate.X_MAX) {
        window.main.mainPin.style.left = `${CoordinateMainPin.x}px`;
      }

      if (CoordinateMainPin.y >= Coordinate.Y_MIN && CoordinateMainPin.y <= Coordinate.Y_MAX) {
        window.main.mainPin.style.top = `${CoordinateMainPin.y}px`;
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
  });
})();
