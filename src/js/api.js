
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
 import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { refs } from './refs';

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
            if (response.data.hits.length===0) {
     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }  
    if ((page*perPage)< response.data.totalHits) {
      refs.loadMoreBtn.classList.remove('load-more-hidden')
    }
    else {
      refs.loadMoreBtn.classList.add('load-more-hidden');
      Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
    }
    return response.data;
  } catch (error) {

    Notiflix.Notify.failure('An error occurred while fetching images.');
    throw error;
  }
};


export { getImages };

export function createMarkup(arr) {
    console.log(arr)
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

const lightbox = new SimpleLightbox('.gallery__link', { 
            showImageNumberLabel: false,
            overlay: false,
            captionDelay: 250,
            animationSlide: true,
            captionType: 'attr',
            captionsData: 'alt'
        });
