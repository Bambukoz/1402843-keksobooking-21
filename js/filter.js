'use strict';

(function () {
  const PinsIndex = {
    MIN: 0,
    MAX: 5
  };
  const mapFiltersForm = document.querySelector(`.map__filters`);
  const housingType = document.querySelector(`#housing-type`);

  const filterPins = (pin) => pin.offer.type === housingType.value;

  const onHousingTypeChange = () => {
    window.card.removeCard();
    const newPins = housingType.value !== `any` ? window.pinsList.filter(filterPins) : window.pinsList;
    window.pin.createPins(newPins.slice(PinsIndex.MIN, PinsIndex.MAX));
  };

  const inactivateFilter = (filterIsDisabled) => {
    Array.from(mapFiltersForm.children).forEach((element) => {
      element.disabled = filterIsDisabled;
    });
    if (!filterIsDisabled) {
      mapFiltersForm.addEventListener(`change`, onHousingTypeChange);
    } else {
      mapFiltersForm.removeEventListener(`change`, onHousingTypeChange);
    }
  };

  inactivateFilter(true);

  window.filter = {
    onHousingTypeChange,
    inactivateFilter,
  };
})();
