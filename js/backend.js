'use strict';

const Url = {
  GET: `https://21.javascript.pages.academy/keksobooking/data`,
  POST: `https://21.javascript.pages.academy/keksobooking`,
};
const MethodType = {
  GET: `GET`,
  POST: `POST`
};
const TIMEOUT = 10000;
const StatusCode = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
};

const onRequestLoad = (request, onLoad, onError) => {
  switch (request.status) {
    case StatusCode.SUCCESS:
      if (request.responseURL === Url.GET) {
        onLoad(request.response);
      } else {
        onLoad();
      }
      break;
    case StatusCode.NOT_FOUND:
      onError(`При загрузке данных с сервера произошла ошибка!`);
      break;
    case StatusCode.SERVER_ERROR:
    case StatusCode.BAD_REQUEST:
      onError();
      break;
  }
};

const sendRequest = (methodType, onLoad, onError, url, data = null) => {
  const request = new XMLHttpRequest();
  request.timeout = TIMEOUT;

  if (methodType === MethodType.GET) {
    request.responseType = `json`;
  }

  request.addEventListener(`load`, () => onRequestLoad(request, onLoad, onError));
  request.addEventListener(`error`, () => onError(`Проблемы с соединением. Попробуйте перезагрузить страницу`));
  request.addEventListener(`timeout`, () => onError(`Время ожидания ответа от сервера превысило ${TIMEOUT / 1000} секунд. Попробуйте перезагрузить страницу`));

  request.open(methodType, url);
  request.send(data);
};

const load = (onLoad, onError) => {
  sendRequest(MethodType.GET, onLoad, onError, Url.GET);
};

const save = (data, onLoad, onError) => {
  sendRequest(MethodType.POST, onLoad, onError, Url.POST, data);
};

window.backend = {
  load,
  save
};
