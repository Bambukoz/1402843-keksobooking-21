'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  const TIMEOUT = 10000;
  const SUCCESS_CODE = 200;

  const onRequestLoad = (request, onLoad, onError) => {
    const currentStatusCode = request.status;
    switch (currentStatusCode) {
      case SUCCESS_CODE:
        onLoad(request.response);
        break;
      default:
        onError(`При загрузке данных с сервера произошла ошибка: ${request.status} - ${request.statusText}. Попробуйте перезагрузить страницу.`);
    }
  };

  const load = (onLoad, onError) => {
    const request = new XMLHttpRequest();
    request.responseType = `json`;

    request.addEventListener(`load`, () => onRequestLoad(request, onLoad, onError));
    request.addEventListener(`error`, () => onError(`Проблемы с соединением. Попробуйте перезагрузить страницу`));
    request.addEventListener(`timeout`, () => onError(`Время ожидания ответа от сервера превысило ${TIMEOUT / 1000} секунд. Попробуйте перезагрузить страницу`));

    request.open(`GET`, URL);
    request.timeout = TIMEOUT;
    request.send();
  };

  window.load = {
    load
  };
})();
