(()=>{"use strict";var e={url:"https://nomoreparties.co/v1/pwff-cohort-1",headers:{authorization:"6c050bf3-926c-4b67-a11d-b9a035b013a1","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))},n=function(n){return fetch("".concat(e.url,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))},r=function(n){return fetch("".concat(e.url,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))},o=document.querySelector("#card-template").content;function c(e,t,n,r,c){var u=o.querySelector(".card").cloneNode(!0),a=u.querySelector(".card__image"),i=u.querySelector(".card__title"),l=u.querySelector(".card__delete-button"),s=u.querySelector(".card__like-button"),d=u.querySelector(".card__like-count");return a.src=e.link,a.alt=e.name,i.textContent=e.name,d.textContent=e.likes.length,e.likes.forEach((function(e){e._id.includes(c)&&s.classList.toggle("card__like-button_is-active")})),c!==e.owner._id&&l.classList.add("card__delete-button-hide"),l.addEventListener("click",(function(){t(u,e._id)})),s.addEventListener("click",(function(){n(s,e._id,d)})),a.addEventListener("click",(function(){r(a)})),u}function u(n,r){var o;(o=r,fetch("".concat(e.url,"/cards/").concat(o),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(){n.remove()})).catch((function(e){console.log(e)}))}function a(e,t,o){(e.classList.contains("card__like-button_is-active")?r:n)(t).then((function(t){e.classList.toggle("card__like-button_is-active"),o.textContent=t.likes.length})).catch((function(e){return console.log(e)}))}function i(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",s),e.addEventListener("click",d)}function l(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s),e.removeEventListener("click",d)}function s(e){"Escape"===e.key&&l(document.querySelector(".popup_is-opened"))}function d(e){e.target===e.currentTarget&&l(e.target)}var p=function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""};function f(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))}var _,y=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));f(n,e.querySelector(t.submitButtonSelector),t.inactiveButtonClass),n.forEach((function(n){p(e,n,t.inputErrorClass,t.errorClass),n.setCustomValidity("")}))};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var v=document.querySelector(".places__list"),h={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},S=function(e,t){t.textContent=e?"Сохранение...":"Сохранить"},b=document.querySelector(".popup_type_edit"),q=document.querySelector(".profile__edit-button"),g=b.querySelector(".popup__close"),E=b.querySelector(".popup__form"),L=E.querySelector(".popup__input_type_name"),C=E.querySelector(".popup__input_type_description"),k=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),x=E.querySelector(".popup__button");function T(e,t){e.addEventListener("click",(function(){l(t)}))}q.addEventListener("click",(function(){i(b),L.value=k.textContent,C.value=A.textContent,y(E,h)})),T(g,b),E.addEventListener("submit",(function(n){var r,o;n.preventDefault(),S(!0,x),(r=L.value,o=C.value,fetch("".concat(e.url,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then((function(e){return t(e)}))).then((function(e){k.textContent=e.name,A.textContent=e.about,l(b)})).catch((function(e){console.log(e)})).finally((function(){S(!1,x)}))}));var w=document.querySelector(".popup_type_new-card"),j=document.querySelector(".profile__add-button"),O=w.querySelector(".popup__close"),B=w.querySelector(".popup__form"),D=B.querySelector(".popup__input_type_card-name"),P=B.querySelector(".popup__input_type_url"),I=B.querySelector(".popup__button");j.addEventListener("click",(function(){i(w),B.reset(),y(B,h)})),T(O,w),B.addEventListener("submit",(function(n){n.preventDefault();var r=D.value,o=P.value;S(!0,I),function(n,r){return fetch("".concat(e.url,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return t(e)}))}(r,o).then((function(e){v.prepend(c(e,u,a,G,_)),B.reset(),l(w)})).catch((function(e){console.log(e)})).finally((function(){S(!1,I)}))}));var M=document.querySelector(".popup_type_image"),N=M.querySelector(".popup__close"),J=M.querySelector(".popup__image"),V=M.querySelector(".popup__caption");function G(e){i(M),J.setAttribute("src",e.src),V.setAttribute("alt",e.alt),V.textContent=e.alt}T(N,M);var H,U=document.querySelector(".profile__image"),z=document.querySelector(".profile__image-edit"),$=document.querySelector(".popup_type_edit-avatar"),F=$.querySelector(".popup__close"),K=$.querySelector(".popup__form"),Q=K.querySelector(".popup__input_type_url"),R=K.querySelector(".popup__button");z.addEventListener("click",(function(){i($),K.reset(),y(K,h)})),T(F,$),K.addEventListener("submit",(function(n){n.preventDefault();var r=Q.value;S(!0,R),function(n){return fetch("".concat(e.url,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then((function(e){return t(e)}))}(r).then((function(e){U.style.backgroundImage="url(".concat(e.avatar,")"),K.reset(),l($)})).catch((function(e){console.log(e)})).finally((function(){S(!1,R)}))})),Promise.all([fetch("".concat(e.url,"/users/me"),{method:"GET",headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.url,"/cards"),{method:"GET",headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];k.textContent=o.name,A.textContent=o.about,U.style.backgroundImage="url(".concat(o.avatar,")"),_=o._id,i.forEach((function(e){var t=c(e,u,a,G,_);v.append(t)}))})).catch((function(e){console.log(e)})),H=h,Array.from(document.querySelectorAll(H.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t,n,r,o,c){var u=Array.from(e.querySelectorAll(t)),a=e.querySelector(n);f(u,a,r),u.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMsg):t.setCustomValidity(""),t.validity.valid?p(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r),c.textContent=n,c.classList.add(o)}(e,t,t.validationMessage,n,r)}(e,t,o,c),f(u,a,r)}))}))}(e,H.inputSelector,H.submitButtonSelector,H.inactiveButtonClass,H.inputErrorClass,H.errorClass)}))})();