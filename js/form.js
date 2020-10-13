'use strict';

(function () {
  const form = document.querySelector(`.ad-form`);
  const formFieldset = form.querySelectorAll(`fieldset`);
  const RoomsForGuests = {
    1: [`1`],
    2: [`1`, `2`],
    3: [`1`, `2`, `3`],
    100: [`0`]
  };
  const MinPrices = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  const inactivateForm = (formIsActive) => {
    formFieldset.forEach((element) => {
      element.disabled = formIsActive;
    });
  };

  inactivateForm(true);

  const onTypeChange = () => {
    form.price.min = MinPrices[form.type.value];
    form.price.placeholder = MinPrices[form.type.value];
  };

  const onCapacityChange = () => {
    const validationMessage = !RoomsForGuests[form.rooms.value].includes(form.capacity.value) ?
      `Несоответствие количества комнат количеству гостей` :
      ``;
    form.capacity.setCustomValidity(validationMessage);
    form.capacity.reportValidity();
  };

  const onTimeChange = (evt) => {
    if (evt.target === form.timein) {
      form.timeout.value = evt.target.value;
    } else {
      form.timein.value = evt.target.value;
    }
  };

  const onFormElementChange = (evt) => {
    switch (evt.target) {
      case form.type:
        onTypeChange();
        break;
      case form.rooms:
      case form.capacity:
        onCapacityChange();
        break;
      case form.timein:
      case form.timeout:
        onTimeChange(evt);
        break;
    }
  };

  window.form = {
    inactivateForm,
    onFormElementChange
  };
})();
