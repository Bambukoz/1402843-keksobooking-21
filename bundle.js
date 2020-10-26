(()=>{"use strict";(()=>{const e=document.querySelector("#error").content.querySelector(".error"),t=document.querySelector("#success").content.querySelector(".success"),o=()=>{document.location.reload()};window.statusMessage={onError:t=>{const r=e.cloneNode(!0);t?(r.querySelector(".error__message").textContent=t,r.querySelector(".error__button").textContent="Перезагрузить страницу",r.querySelector(".error__button").addEventListener("click",o)):r.querySelector(".error__button").addEventListener("click",window.util.onCloseBtnClick),r.addEventListener("click",window.util.onMouseClick),document.addEventListener("keydown",window.util.onEscBtnClick),document.querySelector("main").prepend(r)},onLoad:()=>{const e=t.cloneNode(!0);e.addEventListener("click",window.util.onMouseClick),document.addEventListener("keydown",window.util.onEscBtnClick),document.querySelector("main").prepend(e),window.main.onClosePopup()}}})(),(()=>{const e="https://21.javascript.pages.academy/keksobooking/data",t="https://21.javascript.pages.academy/keksobooking",o="GET",r="POST",n=(t,r,n,c,s=null)=>{const i=new XMLHttpRequest;i.timeout=1e4,t===o&&(i.responseType="json"),i.addEventListener("load",(()=>((t,o,r)=>{switch(t.status){case 200:t.responseURL===e?o(t.response):o();break;case 404:r("При загрузке данных с сервера произошла ошибка!");break;case 500:case 400:r()}})(i,r,n))),i.addEventListener("error",(()=>n("Проблемы с соединением. Попробуйте перезагрузить страницу"))),i.addEventListener("timeout",(()=>n("Время ожидания ответа от сервера превысило 10 секунд. Попробуйте перезагрузить страницу"))),i.open(t,c),i.send(s)};window.backend={load:(t,r)=>{n(o,t,r,e)},save:(e,o,c)=>{n(r,o,c,t,e)}}})(),(()=>{let e=null;window.debounce={setDebounce:t=>{e&&window.clearTimeout(e),e=window.setTimeout(t,500)}}})(),(()=>{const e="low",t=1e4,o="middle",r="high",n=5e4,c=document.querySelector(".map__filters"),s=c.querySelector("#housing-type"),i=c.querySelector("#housing-price"),a=c.querySelector("#housing-rooms"),u=c.querySelector("#housing-guests"),d=c.querySelector(".map__features"),l=c=>{return w=c.offer.type,("any"===s.value||w===s.value)&&(c=>{switch(i.value){case e:return c<t;case o:return c>=t&&c<=n;case r:return c>n}return!0})(c.offer.price)&&(m=c.offer.rooms,"any"===a.value||m.toString()===a.value)&&(p=c.offer.guests,"any"===u.value||p.toString()===u.value)&&(l=c.offer.features,Array.from(d.querySelectorAll("input[type=checkbox]:checked")).map((e=>e.value)).every((e=>l.includes(e))));var l,p,m,w},p=()=>{window.card.removeCard();const e=window.pinsList.filter(l);window.pin.createPins(e.slice(0,5))},m=()=>{window.debounce.setDebounce(p)},w=e=>{Array.from(c.children).forEach((t=>{t.disabled=e})),e?c.removeEventListener("change",m):c.addEventListener("change",m)};w(!0),window.filter={filteredPins:p,inactivateFilter:w}})(),(()=>{const e=document.querySelector(".ad-form"),t=e.querySelectorAll("fieldset"),o={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]},r={bungalow:0,flat:1e3,house:5e3,palace:1e4},n=t=>{switch(t.target){case e.type:e.price.min=r[e.type.value],e.price.placeholder=r[e.type.value];break;case e.rooms:case e.capacity:(()=>{const t=o[e.rooms.value].includes(e.capacity.value)?"":"Несоответствие количества комнат количеству гостей";e.capacity.setCustomValidity(t),e.capacity.reportValidity()})();break;case e.timein:case e.timeout:(t=>{t.target===e.timein?e.timeout.value=t.target.value:e.timein.value=t.target.value})(t)}},c=t=>{t.preventDefault(),window.backend.save(new FormData(e),window.statusMessage.onLoad,window.statusMessage.onError)},s=()=>{e.reset()},i=o=>{Array.from(t).forEach((e=>{e.disabled=o})),o?(e.removeEventListener("change",n),e.removeEventListener("submit",c),e.removeEventListener("reset",s)):(e.addEventListener("change",n),e.addEventListener("submit",c),e.addEventListener("reset",s))};i(!0),window.form={onResetBtnClick:s,inactivateForm:i,onFormElementChange:n,onSubmitForm:c}})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector(".ad-form"),o=e.querySelector(".map__pin--main"),r="375px",n="570px",c=e=>{window.pinsList=e,window.filter.inactivateFilter(!1),window.filter.filteredPins()},s=()=>{e.classList.remove("map--faded"),window.backend.load(c,window.statusMessage.onError,!0),i(),o.removeEventListener("click",s)},i=()=>{t.classList.remove("ad-form--disabled"),window.form.inactivateForm(!1)},a=()=>{const t=e.querySelectorAll(".map__pin:not(.map__pin--main)");for(let e of t)e.remove()};o.addEventListener("click",s),window.main={resetMap:a,setMainAddress:()=>{t.address.value=`${parseInt(o.style.left,10)+window.pin.Pin.WIDTH/2}, ${parseInt(o.style.top,10)+window.pin.Pin.HEIGHT}`},onClosePopup:()=>{a(),window.card.removeCard(),e.classList.add("map--faded"),t.classList.add("ad-form--disabled"),o.style.left=n,o.style.top=r,window.form.inactivateForm(!0),window.filter.inactivateFilter(!0),t.reset(),o.addEventListener("click",s)}}})(),(()=>{const e=document.querySelector(".map"),t={wifi:"popup__feature--wifi",dishwasher:"popup__feature--dishwasher",parking:"popup__feature--parking",washer:"popup__feature--washer",elevator:"popup__feature--elevator",conditioner:"popup__feature--conditioner"},o={palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},r=document.querySelector("#card").content.querySelector(".popup"),n=document.querySelector("#photo").content,c=e=>{const o=document.createElement("li");return o.className="popup__feature "+t[e],o},s=e=>{const t=n.cloneNode(!0);return t.querySelector("img").src=e,t},i=()=>{const t=e.querySelector(".popup");e.contains(t)&&t.remove()};window.card={features:t,typesOfHousing:o,removeCard:i,createCard:t=>{i(),e.append((e=>{const t=r.cloneNode(!0),n=t.querySelector(".popup__features"),i=t.querySelector(".popup__photos");document.addEventListener("keydown",window.util.onEscBtnClick),t.querySelector(".popup__close").addEventListener("click",window.util.onCloseBtnClick),t.querySelector(".popup__avatar").src=e.author.avatar,t.querySelector(".popup__title").textContent=e.offer.title,t.querySelector(".popup__text--address").textContent=e.offer.address,t.querySelector(".popup__text--price").textContent=e.offer.price+" ₽/ночь",t.querySelector(".popup__type").textContent=o[e.offer.type],t.querySelector(".popup__text--capacity").textContent=`${e.offer.rooms} ${window.util.getWordsEndings(e.offer.rooms,["комната","комнаты","комнат"])} для ${e.offer.guests} ${window.util.getWordsEndings(e.offer.guests,["гостя","гостей","гостей"])}`,t.querySelector(".popup__text--time").textContent=`Заезд после ${e.offer.checkin}, выезд до ${e.offer.checkout}`;for(let t of e.offer.features)n.append(c(t));for(let t of e.offer.photos)i.append(s(t));return t.querySelector(".popup__description").textContent=e.offer.description,t})(t))}}})(),(()=>{const e={WIDTH:50,HEIGHT:70},t=document.querySelector(".map").querySelector(".map__pins"),o=document.querySelector("#pin").content.querySelector(".map__pin"),r=t=>{const r=o.cloneNode(!0);return r.style.left=t.location.x+e.WIDTH/2+"px",r.style.top=t.location.y+e.HEIGHT+"px",r.querySelector("img").src=t.author.avatar,r.querySelector("img").alt=t.offer.title,r};window.pin={Pin:e,createPins:e=>{const o=document.createDocumentFragment();for(let t of e){const e=r(t);o.append(e),e.addEventListener("click",(()=>{window.card.createCard(t)}))}window.main.resetMap(),t.append(o)}}})(),(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__pin--main"),o=e.offsetWidth-32.5;t.addEventListener("mousedown",(function(e){e.preventDefault(),window.main.setMainAddress();let r={x:e.clientX,y:e.clientY};const n=e=>{e.preventDefault();const n=r.x-e.clientX,c=r.y-e.clientY,s=t.offsetLeft-n,i=t.offsetTop-c;r={x:e.clientX,y:e.clientY},s>=-32.5&&s<=o&&(t.style.left=s+"px"),i>=130&&i<=630&&(t.style.top=i+"px"),window.main.setMainAddress()},c=e=>{e.preventDefault(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",c)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",c)}))})(),(()=>{const e={ENTER:"Enter",ESCAPE:"Escape"},t=o=>{const r=document.querySelector(".error"),n=document.querySelector(".success"),c=document.querySelector(".popup");o.key===e.ESCAPE&&(o.preventDefault(),r&&r.remove(),n&&n.remove(),c&&c.remove(),document.removeEventListener("keydown",t))},o=e=>{e.target.parentElement.remove(),e.target.removeEventListener("click",o)};window.util={KeyButtons:e,getWordsEndings:(e,t)=>t[e%100>4&&e%100<20?2:[2,0,1,1,1,2][e%10<5?e%10:5]],onEscBtnClick:t,onMouseClick:()=>{document.querySelector(".success")?document.querySelector(".success").remove():document.querySelector(".error").remove()},onCloseBtnClick:o}})()})();