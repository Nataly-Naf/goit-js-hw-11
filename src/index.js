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
let searchItem = null;
let page;
async function onSubmitForm(event) {
    event.preventDefault();
    refs.gallery.innerHTML = '';
page = 1; 
    
    
    try {
         
        searchItem = event.currentTarget[0].value.trim() 
        console.log(searchItem)
        const resp = await getImages(searchItem, page)
        
         if (!resp.status==='200') {throw new Error(resp.statusText)         
        }
        
        if (!searchItem) { // Перевіряємо на пустий інпут
            throw new Error(Notiflix.Notify.failure('Please enter your text'))
        }
        
        if (resp.hits.length === 0) {
        throw new Error(Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'))
   
    }  
          
        refs.gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
        
        
        Notiflix.Notify.success(`Hooray! We found total ${resp.totalHits} Hits images`)
        if ((resp.hits.length)< resp.totalHits) {
      refs.loadMoreBtn.classList.remove('load-more-hidden');
         }
    else {
    //   refs.loadMoreBtn.classList.add('load-more-hidden');
      Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
        }
        lightbox.refresh();
        
                  
    }  
           
    catch (Error) { console.log(Error) }
    
    
    refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
    
    
    async function onLoadMoreBtnClick() {
  
        page += 1;  
      
        try {
                  
        console.log(searchItem)  
     const newResp = await getImages(searchItem, page)           
                                           
                refs.gallery.insertAdjacentHTML('beforeend', createMarkup(newResp.hits));
            lightbox.refresh();
            refs.loadMoreBtn.classList.add('load-more-hidden');
            if (page< newResp.totalHits/40) {
                    refs.loadMoreBtn.classList.remove('load-more-hidden');
                    Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
                   
         } 
                      
       }
       catch(error) {console.log (error)
       }
    }
  }
    
    





