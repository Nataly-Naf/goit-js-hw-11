import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createMarkup, getImages } from "./js/api";
import { refs } from "./js/refs";

     const lightbox = new SimpleLightbox('.all-items-gallery a', { 
            showImageNumberLabel: true,
            overlay: false,
            captionDelay: 250,
            animationSlide: true,
            captionType: 'attr',
            captionsData: 'alt'
        });
refs.form.addEventListener('submit', onSubmitBtnClick)

function onSubmitBtnClick(event) {
    event.preventDefault();
    refs.gallery.innerHTML = '';
    const searchItem = event.currentTarget[0].value;
    let page = 1;
    getImages(searchItem, page)
        .then((resp) => {
            refs.gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
            lightbox.refresh(); // Виклик refresh після додавання зображень
        });
    refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
    function onLoadMoreBtnClick() {
        page += 1;
        getImages(searchItem, page)
            .then((resp) => {
                refs.gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
                lightbox.refresh(); // Виклик refresh після додавання зображень
            });
    }
}




