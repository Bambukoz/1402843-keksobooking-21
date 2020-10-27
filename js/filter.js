'use strict';

const DEFAULT_VALUE = `any`;
const PinsIndex = {
  MIN: 0,
  MAX: 5
};
const priceMap = {
  low: {
    name: `low`,
    value: 10000
  },
  middle: {
    name: `middle`
  },
  high: {
    name: `high`,
    value: 50000
  }
};
const mapFiltersForm = document.querySelector(`.map__filters`);
const housingType = mapFiltersForm.querySelector(`#housing-type`);
const housingPrice = mapFiltersForm.querySelector(`#housing-price`);
const housingRooms = mapFiltersForm.querySelector(`#housing-rooms`);
const housingGuests = mapFiltersForm.querySelector(`#housing-guests`);
const housingFeatures = mapFiltersForm.querySelector(`.map__features`);

const filterOnType = (type) => housingType.value === DEFAULT_VALUE || type === housingType.value;
const filterOnPrice = (price) => {
  switch (housingPrice.value) {
    case priceMap.low.name:
      return price < priceMap.low.value;
    case priceMap.middle.name:
      return price >= priceMap.low.value && price <= priceMap.high.value;
    case priceMap.high.name:
      return price > priceMap.high.value;
  }
  return true;
};
const filterOnRooms = (rooms) => housingRooms.value === DEFAULT_VALUE || rooms.toString() === housingRooms.value;
const filterOnGuests = (guests) => housingGuests.value === DEFAULT_VALUE || guests.toString() === housingGuests.value;
const filterOnFeatures = (features) => {
  return Array.from(housingFeatures.querySelectorAll(`input[type=checkbox]:checked`))
    .map((input) => input.value)
    .every((currentFeature) => features.includes(currentFeature));
};

const getFilteredPins = (pin) => filterOnType(pin.offer.type) && filterOnPrice(pin.offer.price) &&
    filterOnRooms(pin.offer.rooms) && filterOnGuests(pin.offer.guests) && filterOnFeatures(pin.offer.features);

const filteredPins = () => {
  window.card.removeCard();
  const newPins = window.pinsList.filter(getFilteredPins);
  window.pin.createPins(newPins.slice(PinsIndex.MIN, PinsIndex.MAX));
};

const onFilterElementChange = () => {
  window.debounce.setDebounce(filteredPins);
};

const inactivateFilter = (filterIsDisabled) => {
  Array.from(mapFiltersForm.children).forEach((element) => {
    element.disabled = filterIsDisabled;
  });
  if (!filterIsDisabled) {
    mapFiltersForm.addEventListener(`change`, onFilterElementChange);
  } else {
    mapFiltersForm.removeEventListener(`change`, onFilterElementChange);
    mapFiltersForm.reset();
  }
};

inactivateFilter(true);

window.filter = {
  filteredPins,
  inactivateFilter
};
