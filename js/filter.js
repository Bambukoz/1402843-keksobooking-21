'use strict';

(function () {
  const PinsIndex = {
    MIN: 0,
    MAX: 5
  };
  const price = {
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

  const filterOnType = (pin) => housingType.value === `any` || pin.offer.type === housingType.value;
  const filterOnPrice = (pin) => {
    if (housingPrice.value === price.low.name) {
      return pin.offer.price < price.low.value;
    } else if (housingPrice.value === price.middle.name) {
      return pin.offer.price >= price.low.value && pin.offer.price <= price.high.value;
    } else if (housingPrice.value === price.high.name) {
      return pin.offer.price > price.high.value;
    } else {
      return true;
    }
  };
  const filterOnRooms = (pin) => housingRooms.value === `any` || pin.offer.rooms.toString() === housingRooms.value;
  const filterOnGuests = (pin) => housingGuests.value === `any` || pin.offer.guests.toString() === housingGuests.value;
  const filterOnFeatures = (pin) => {
    const checkedElements = housingFeatures.querySelectorAll(`input[type=checkbox]:checked`);
    const features = [].map.call(checkedElements, (input) => input.value);

    return features.every((currentFeature) => pin.offer.features.includes(currentFeature));
  };

  const onFilterElementChange = (pin) => {
    const pinsType = filterOnType(pin);
    const pinsPrice = filterOnPrice(pin);
    const pinsRooms = filterOnRooms(pin);
    const pinsGuests = filterOnGuests(pin);
    const pinsFeatures = filterOnFeatures(pin);
    return pinsType && pinsPrice && pinsRooms && pinsGuests && pinsFeatures;
  };

  const showFilteredPins = () => {
    window.card.removeCard();
    const newPins = window.pinsList.filter(onFilterElementChange);
    const createPins = window.pin.createPins(newPins.slice(PinsIndex.MIN, PinsIndex.MAX));
    window.debounce.setDebounce(createPins);
  };

  const inactivateFilter = (filterIsDisabled) => {
    Array.from(mapFiltersForm.children).forEach((element) => {
      element.disabled = filterIsDisabled;
    });
    if (!filterIsDisabled) {
      mapFiltersForm.addEventListener(`change`, showFilteredPins);
    } else {
      mapFiltersForm.removeEventListener(`change`, showFilteredPins);
    }
  };

  inactivateFilter(true);

  window.filter = {
    showFilteredPins,
    inactivateFilter,
  };
})();
