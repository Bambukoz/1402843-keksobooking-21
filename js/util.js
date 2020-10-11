'use strict';

(function () {
  const KeyButtons = {
    MOUSE_LEFT: 0,
    ENTER: `Enter`,
    ESCAPE: `Escape`
  };
  const map = document.querySelector(`.map`);

  const onEscBtnClick = (evt) => {
    if (evt.key === KeyButtons.ESCAPE) {
      evt.preventDefault();
      map.querySelector(`.popup`).remove();
      document.removeEventListener(`keydown`, onEscBtnClick);
    }
  };

  const onCloseBtnClick = (evt) => {
    evt.target.parentElement.remove();
    evt.target.removeEventListener(`click`, onCloseBtnClick);
  };

  window.util = {
    KeyButtons,
    onEscBtnClick,
    onCloseBtnClick
  };
})();
