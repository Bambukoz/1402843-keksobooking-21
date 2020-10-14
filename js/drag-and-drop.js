'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);

  mainPin.addEventListener(`mousedown`, function (evt) {
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
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (CoordinateMainPin.x >= window.data.Coordinate.X_MIN && CoordinateMainPin.x <= window.data.Coordinate.X_MAX) {
        mainPin.style.left = `${CoordinateMainPin.x}px`;
      }

      if (CoordinateMainPin.y >= window.data.Coordinate.Y_MIN && CoordinateMainPin.y <= window.data.Coordinate.Y_MAX) {
        mainPin.style.top = `${CoordinateMainPin.y}px`;
      }
    };
    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      window.main.setMainAddress();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
