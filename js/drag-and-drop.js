'use strict';

(function () {
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

      if (CoordinateMainPin.x >= window.data.Coordinate.X_MIN && CoordinateMainPin.x <= window.data.Coordinate.X_MAX) {
        window.main.mainPin.style.left = `${CoordinateMainPin.x}px`;
      }

      if (CoordinateMainPin.y >= window.data.Coordinate.Y_MIN && CoordinateMainPin.y <= window.data.Coordinate.Y_MAX) {
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
