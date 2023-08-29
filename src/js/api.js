 
    

export function createMarkup(arr) {
    console.log(arr)
    return arr.map(({userImageURL,likes, views, comments, downloads})=>`<div class="photo-card">
  <img src="${userImageURL}" class="img" alt="" loading="lazy" />
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


