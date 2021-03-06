'use strict';

const form = document.querySelector(`.ad-form`);
const formAvatar = form.querySelector(`.ad-form-header__preview img`);
const formPhoto = form.querySelector(`.ad-form__photo`);
const formResetBtn = form.querySelector(`.ad-form__reset`);
const formFieldset = form.querySelectorAll(`fieldset`);
const RoomsForGuests = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};
const minPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
const DefaultAvatar = {
  SRC: `img/muffin-grey.svg`,
  WIDTH: 40,
  HEIGHT: 44
};

const onTypeChange = () => {
  form.price.min = minPrices[form.type.value];
  form.price.placeholder = minPrices[form.type.value];
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
    form.timeout.value = form.timein.value;
  } else {
    form.timein.value = form.timeout.value;
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
    case form.avatar:
    case form.images:
      window.photos.setImage(evt);
      break;
  }
};

const onSubmitForm = (evt) => {
  evt.preventDefault();
  window.backend.save(new FormData(form), window.statusMessage.onLoad, window.statusMessage.onError);
};

const resetForm = () => {
  formAvatar.style = ``;
  formAvatar.src = DefaultAvatar.SRC;
  formAvatar.width = DefaultAvatar.WIDTH;
  formAvatar.height = DefaultAvatar.HEIGHT;
  formPhoto.textContent = ``;
  form.price.min = minPrices.flat;
  form.price.placeholder = minPrices.flat;
  form.reset();
};

const onResetBtnClick = (evt) => {
  if (evt.target === formResetBtn) {
    window.main.resetPage();
  }
};


const inactivateForm = (formIsDisabled) => {
  Array.from(formFieldset).forEach((element) => {
    element.disabled = formIsDisabled;
  });
  if (!formIsDisabled) {
    form.addEventListener(`change`, onFormElementChange);
    form.addEventListener(`submit`, onSubmitForm);
    form.addEventListener(`click`, onResetBtnClick);
  } else {
    form.removeEventListener(`change`, onFormElementChange);
    form.removeEventListener(`submit`, onSubmitForm);
    form.removeEventListener(`click`, onResetBtnClick);
  }
};

inactivateForm(true);

window.form = {
  resetForm,
  inactivateForm,
};
