'use strict';

(function () {

  const getRandomNumber = (number) => Math.floor(Math.random() * number);
  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const getRandomArr = (arr, number, string) => {
    const randomArr = [];
    for (let i = 0; i < number; i++) {
      if (string === undefined) {
        randomArr.push(arr[getRandomNumber(arr.length)]);
      } else {
        randomArr.push(string + arr[getRandomNumber(arr.length)]);
      }
    }
    return Array.from(new Set(randomArr));
  };

  window.random = {
    getRandomNumber,
    getRandomElement,
    getRandomRange,
    getRandomArr
  };
})();
