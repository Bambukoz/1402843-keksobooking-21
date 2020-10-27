'use strict';

const form = document.querySelector(`.ad-form`);
const userAvatar = form.querySelector(`.ad-form-header__preview img`);
const formPhoto = form.querySelector(`.ad-form__photo`);
const FileTypes = {
  PNG: `image/png`,
  JPG: `image/jpg`,
  JPEG: `image/jpeg`
};
const PhotoStyles = {
  WIDTH: `70px`,
  HEIGHT: `70px`,
  BORDER_RADIUS: `5px`,
  OBJECT_FIT: `cover`,
  MARGIN_LEFT: `-15px`
};

const addStyles = (element, addMargin = false) => {
  element.style.width = PhotoStyles.WIDTH;
  element.style.height = PhotoStyles.HEIGHT;
  element.style.borderRadius = PhotoStyles.BORDER_RADIUS;
  element.style.objectFit = PhotoStyles.OBJECT_FIT;
  if (addMargin) {
    element.style.marginLeft = PhotoStyles.MARGIN_LEFT;
  }
};

const onImageLoad = (evt) => {
  formPhoto.textContent = ``;
  const newImage = document.createElement(`img`);
  newImage.src = evt.target.result;
  addStyles(newImage);
  formPhoto.append(newImage);
  evt.target.removeEventListener(`load`, onImageLoad);
};

const onAvatarLoad = (evt) => {
  userAvatar.src = evt.target.result;
  addStyles(userAvatar, true);
  evt.target.removeEventListener(`load`, onAvatarLoad);
};

const loadImage = (evt, file) => {
  const reader = new FileReader();
  if (evt.target === form.avatar) {
    reader.addEventListener(`load`, onAvatarLoad);
  } else {
    reader.addEventListener(`load`, onImageLoad);
  }
  reader.readAsDataURL(file);
};

const setImage = (evt) => {
  const file = evt.target.files[0];
  switch (file.type) {
    case FileTypes.PNG:
    case FileTypes.JPG:
    case FileTypes.JPEG:
      loadImage(evt, file);
  }
};

window.photos = {
  setImage
};
