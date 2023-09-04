import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImages } from "./js/api";
import { refs } from "./js/refs";
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { createMarkup } from "./js/render";
const lightbox = new SimpleLightbox('.all-items-gallery a', {
    showImageNumberLabel: true,
    overlay: false,
    captionDelay: 250,
    animationSlide: true,
    captionType: 'attr',
    captionsData: 'alt'
});
 refs.loadMoreBtn.classList.add('load-more-hidden');
refs.form.addEventListener('submit', onSubmitForm);
let page = 1;
let searchItem = ''; // Зберігаємо пошуковий запит
async function onSubmitForm(event) {
    event.preventDefault();
    refs.loadMoreBtn.classList.add('load-more-hidden');
    refs.gallery.innerHTML = '';
    searchItem = (event.currentTarget[0].value).trim(); // Оновлюємо значення пошукового запиту
    page = 1; // Скидаємо значення сторінки до 1
    console.log(searchItem)
     if (!searchItem) { // Перевіряємо на пустий інпут
           return Notiflix.Notify.failure('Please enter your text')
        }

    try {
        const resp = await getImages(searchItem, page)
               if (resp.hits.length === 0) {
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        }
        refs.gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
        Notiflix.Notify.success(`Hooray! We found total ${resp.totalHits} Hits images`)
       if (Math.ceil(resp.totalHits / 40) === page) {
            refs.loadMoreBtn.classList.add('load-more-hidden');
            Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
           
        }
        else refs.loadMoreBtn.classList.remove('load-more-hidden');
        lightbox.refresh();
    }
    catch (Error) { console.log(Error) }
}
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
async function onLoadMoreBtnClick() {
    console.log(searchItem)
    page += 1;
    try {
        const resp = await getImages(searchItem, page)
        refs.gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
        lightbox.refresh();
         if (Math.ceil(resp.totalHits / 40) === page) {
                refs.loadMoreBtn.classList.add('load-more-hidden');
               return Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
            }
    }
    catch (error) { console.log(error) }
}