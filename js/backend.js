'use strict';

(function () {
  const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_POST = `https://21.javascript.pages.academy/keksobooking`;

  const TIMEOUT = 10000;
  const Code = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
  };

  const onRequestLoad = (request, onLoad, onError) => {
    switch (request.status) {
      case Code.SUCCESS:
        if (request.responseURL === URL_GET) {
          onLoad(request.response);
        } else {
          onLoad();
        }
        break;
      case Code.NOT_FOUND:
        onError(`При загрузке данных с сервера произошла ошибка!`);
        break;
      case Code.SERVER_ERROR:
      case Code.BAD_REQUEST:
        onError();
        break;
    }
  };

  const sendRequest = (methodType, onLoad, onError, url, data) => {
    const request = new XMLHttpRequest();
    request.timeout = TIMEOUT;

    if (methodType === `GET`) {
      request.responseType = `json`;
    }

    request.addEventListener(`load`, () => onRequestLoad(request, onLoad, onError));
    request.addEventListener(`error`, () => onError(`Проблемы с соединением. Попробуйте перезагрузить страницу`));
    request.addEventListener(`timeout`, () => onError(`Время ожидания ответа от сервера превысило ${TIMEOUT / 1000} секунд. Попробуйте перезагрузить страницу`));

    request.open(methodType, url);
    if (data) {
      request.send(data);
    } else {
      request.send();
    }
  };

  const load = (onLoad, onError) => {
    sendRequest(`GET`, onLoad, onError, URL_GET);
  };

  const save = (data, onLoad, onError) => {
    sendRequest(`POST`, onLoad, onError, URL_POST, data);
  };

  window.backend = {
    load,
    save
  };
})();
