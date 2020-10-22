'use strict';

const PinsIndex = {
  MIN: 0,
  MAX: 5
};
const mapFiltersForm = document.querySelector(`.map__filters`);
const housingType = document.querySelector(`#housing-type`);

const successLoadHandler = (pins) => {
  window.pinsArray = pins;
  inactivateFilter(false);
  onHousingTypeChange();
};

const fliterPins = (pin) => {
  return pin.offer.type === housingType.value;
};

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const onHousingTypeChange = () => {
  let newPinsArray = shuffleArray(window.pinsArray);
  window.card.removeCard();
  if (housingType.value !== `any`) {
    newPinsArray = window.pinsArray.filter(fliterPins);
  }
  window.pin.createPins(newPinsArray.slice(PinsIndex.MIN, PinsIndex.MAX));
};

const inactivateFilter = (filterIsDisabled) => {
  const filterElements = mapFiltersForm.childNodes;
  filterElements.forEach((element) => {
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
  inactivateFilter,
  successLoadHandler,
};

