
import { createMarkup } from "./js/api";
import { refs } from "./js/refs";

import { debounce } from "lodash";




  

refs.form.addEventListener('submit', debounce(onSubmitBtnClick, 1000))

function onSubmitBtnClick(event) {
    event.preventDefault();
    console.log('jkhkjhk')
    const searchItem = event.currentTarget[0].value;
    console.log(searchItem)
   
    function getAllpictures() {
 const baseURL = 'https://pixabay.com/api/'
      
    const searchParams = new URLSearchParams({
      key: "5826986-30cf6df7309c66ae8af35763a",
      q: event.currentTarget[0].value,
    orientation: 'horizontal',
    image_type: 'photo',
      safesearch: true,
    
    });
        refs.gallery.innerHTML = "";
  return fetch(`${baseURL}?${searchParams}`)
  .then((response) => response.json())
    }
    getAllpictures().then((resp) => refs.gallery.innerHTML = createMarkup(resp.hits))
   
}

// function getAllpictures() {
//  const baseURL = 'https://pixabay.com/api/'
      
//     const searchParams = new URLSearchParams({
//       key: "5826986-30cf6df7309c66ae8af35763a",
//       q: event.currentTarget[0].value,
//     orientation: 'horizontal',
//     image_type: 'photo',
//       safesearch: true,
    
// });
//   return fetch(`${baseURL}?${searchParams}`)
//   .then((response) => response.json())
//   }  



