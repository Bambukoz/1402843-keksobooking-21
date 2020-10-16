'use strict';

(function () {
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const onErrorButtonClick = () => {
    document.location.reload();
  };

  const onLoadError = (errorMessage) => {
    const errorPopup = errorTemplate.cloneNode(true);
    errorPopup.querySelector(`.error__message`).textContent = errorMessage;
    errorPopup.querySelector(`.error__button`).addEventListener(`click`, onErrorButtonClick);
    document.querySelector(`main`).prepend(errorPopup);
  };

  window.error = {
    onLoadError
  };

})();
