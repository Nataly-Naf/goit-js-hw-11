export function createMarkup(arr) {

    return arr.map(({webformatURL,likes, views, comments, downloads, largeImageURL})=>`<div class="photo-card">
  <div class="gallery"> <a class="gallery__link" href="${largeImageURL}"> <img src="${webformatURL}" class="img" alt="" loading="lazy" /> </a> </div>
  <div class="info">
    <p class="info-item">
      Likes<b>${likes}</b>
    </p>
    <p class="info-item">
      Views<b>${views}</b>
    </p>
    <p class="info-item">
      Comments<b>${comments}</b>
    </p>
    <p class="info-item">
      Downloads<b>${downloads}</b>
    </p>
  </div>
</div>` ).join('')
}