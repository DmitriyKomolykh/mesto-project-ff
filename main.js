(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e&&(e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n))}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function r(e){e.target===e.currentTarget&&t(e.target)}function o(e){t(e.target.closest(".popup"))}var c=document.querySelector("#card-template").content;function u(e,t,n,r){var o=c.querySelector(".card").cloneNode(!0),u=o.querySelector(".card__image"),p=o.querySelector(".card__title"),d=o.querySelector(".card__like-button"),a=o.querySelector(".card__delete-button");return u.src=e.link,u.alt=e.name,p.textContent=e.name,u.addEventListener("click",(function(){return r(e)})),a.addEventListener("click",(function(){return t(o)})),d.addEventListener("click",(function(){return n(d)})),o}function p(e){e.remove()}function d(e){e.classList.toggle("card__like-button_is-active")}var a=document.querySelector(".places__list"),i=document.forms["edit-profile"],l=document.forms["new-place"],s=document.querySelector(".profile__edit-button"),m=document.querySelector(".profile__add-button"),_=document.querySelector(".popup_type_edit"),y=Array.from(document.querySelectorAll(".popup")),v=document.querySelector(".popup_type_new-card"),f=document.querySelector(".popup_type_image"),k=document.querySelector(".places__list"),q=document.querySelector(".popup__input_type_name"),S=document.querySelector(".popup__input_type_description"),g=document.querySelector(".profile__title"),E=document.querySelector(".profile__description");function L(t){var n=f.querySelector(".popup__image"),r=f.querySelector(".popup__caption");n.src=t.link,n.alt=t.name,r.textContent=t.name,e(f)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){a.append(u(e,p,d,L))})),s.addEventListener("click",(function(t){q.value=g.textContent,S.value=E.textContent,e(_)})),y.forEach((function(e){e.addEventListener("click",r),e.querySelector(".popup__close").addEventListener("click",o)})),i.addEventListener("submit",(function(e){e.preventDefault();var n=q.value,r=S.value;g.textContent=n,E.textContent=r,t(_)})),m.addEventListener("click",(function(){e(v)})),l.addEventListener("submit",(function(e){e.preventDefault();var n=l.elements["place-name"],r=l.elements.link,o=u({name:n.value,link:r.value},p,d);k.prepend(o),this.reset(),t(v)}))})();