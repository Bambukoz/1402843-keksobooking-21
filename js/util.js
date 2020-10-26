'use strict';

const KeyButtons = {
  ENTER: `Enter`,
  ESCAPE: `Escape`
};

const getWordsEndings = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ?
  2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

const onEscBtnClick = (evt) => {
  const error = document.querySelector(`.error`);
  const success = document.querySelector(`.success`);
  const popup = document.querySelector(`.popup`);
  if (evt.key === KeyButtons.ESCAPE) {
    evt.preventDefault();
    if (error) {
      error.remove();
    }
    if (success) {
      success.remove();
    }
    if (popup) {
      popup.remove();
    }
    document.removeEventListener(`keydown`, onEscBtnClick);
  }
};

const onMouseClick = () => {
  if (document.querySelector(`.success`)) {
    document.querySelector(`.success`).remove();
  } else {
    document.querySelector(`.error`).remove();
  }
};

const onCloseBtnClick = (evt) => {
  evt.target.parentElement.remove();
  evt.target.removeEventListener(`click`, onCloseBtnClick);
};

window.util = {
  KeyButtons,
  getWordsEndings,
  onEscBtnClick,
  onMouseClick,
  onCloseBtnClick
};
