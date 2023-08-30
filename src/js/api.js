 
 import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const URL = 'https://pixabay.com/api/';
const perPage = 40;
const getImages = async (value, page) => {
  try {
    const response = await axios.get(`${URL}`, {
      params: {
        key: '5826986-30cf6df7309c66ae8af35763a',
        q: `${value}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure('An error occurred while fetching images.');
    throw error;
  }
};
export { getImages };

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


