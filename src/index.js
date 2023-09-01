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
        
refs.form.addEventListener('submit', onSubmitForm)

async function onSubmitForm(event) {
    event.preventDefault();
    refs.gallery.innerHTML = '';
    const searchItem = (event.currentTarget[0].value).trim()
    let page = 1;
    console.log(searchItem)
    if (!searchItem) { // Перевіряємо на пустий інпут
        throw new Error(Notiflix.Notify.failure('Please enter your text'))
    }
    
    try {
        const resp = await getImages(searchItem, page)   
    
            if (resp.hits.length===0) {
    return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }  
    if ((resp.hits.length)< resp.totalHits) {
      refs.loadMoreBtn.classList.remove('load-more-hidden');
         }
    else {
      refs.loadMoreBtn.classList.add('load-more-hidden');
      Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
        }
      
        refs.gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
          Notiflix.Notify.success(`Hooray! We found total ${resp.totalHits} Hits images`)
        lightbox.refresh();
         refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
             // Виклик refresh після додавання зображень
    }
     catch(error) {
           console.log (error)
       }
    
   async function onLoadMoreBtnClick() {
        page += 1;
       try {
        const resp= await getImages(searchItem, page)           
                console.log((resp.totalHits / 40));
                if (page>= resp.totalHits/40) {
                    refs.loadMoreBtn.classList.add('load-more-hidden');
                    Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
         }
            
                refs.gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
                lightbox.refresh(); // Виклик refresh після додавання зображень
            
       }
       catch(error) {
           console.log (error)
       }
    }
  }
    
    





