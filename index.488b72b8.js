!function(){var n={form:document.querySelector("#search-form"),submitBtn:document.querySelector(".submit-btn"),gallery:document.querySelector(".gallery")};n.form.addEventListener("click",(function(e){e.preventDefault();var t=e.currentTarget[0].value;console.log(t),(a=new URLSearchParams({key:"5826986-30cf6df7309c66ae8af35763a",q:e.currentTarget[0].value,orientation:"horizontal",image_type:"photo",safesearch:!0}),fetch("".concat("https://pixabay.com/api/","?").concat(a)).then((function(n){return n.json()}))).then((function(e){return n.gallery.innerHTML=(t=e.hits,console.log(t),t.map((function(n){var e=n.userImageURL,t=n.likes,a=n.views,o=n.comments,c=n.downloads;return'<div class="photo-card">\n  <img src="'.concat(e,'" class="img" alt="" loading="lazy" />\n  <div class="info">\n    <p class="info-item">\n      Likes<b>').concat(t,'</b>\n    </p>\n    <p class="info-item">\n      Views<b>').concat(a,'</b>\n    </p>\n    <p class="info-item">\n      Comments<b>').concat(o,'</b>\n    </p>\n    <p class="info-item">\n      Downloads<b>').concat(c,"</b>\n    </p>\n  </div>\n</div>")})).join(""));var t}));var a}))}();
//# sourceMappingURL=index.488b72b8.js.map