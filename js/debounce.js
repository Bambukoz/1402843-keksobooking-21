'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;
  let lastTimeout = null;

  const setDebounce = (callback) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  };

  window.debounce = {
    setDebounce
  };
})();
