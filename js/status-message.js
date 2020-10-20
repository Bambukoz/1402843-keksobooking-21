'use strict';

(function () {
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);

  const onReloadBtnClick = () => {
    document.location.reload();
  };

  const onError = (errorMessage) => {
    const errorPopup = errorTemplate.cloneNode(true);
    if (errorMessage) {
      errorPopup.querySelector(`.error__message`).textContent = errorMessage;
      errorPopup.querySelector(`.error__button`).textContent = `Перезагрузить страницу`;
      errorPopup.querySelector(`.error__button`).addEventListener(`click`, onReloadBtnClick);
    } else {
      errorPopup.querySelector(`.error__button`).addEventListener(`click`, window.util.onCloseBtnClick);
    }
    errorPopup.addEventListener(`click`, window.util.onMouseClick);
    document.addEventListener(`keydown`, window.util.onEscBtnClick);
    document.querySelector(`main`).prepend(errorPopup);
  };

  const onLoad = () => {
    const successPopup = successTemplate.cloneNode(true);
    successPopup.addEventListener(`click`, window.util.onMouseClick);
    document.addEventListener(`keydown`, window.util.onEscBtnClick);
    document.querySelector(`main`).prepend(successPopup);
    window.main.onClosePopup();
  };

  window.statusMessage = {
    onError,
    onLoad
  };
})();
