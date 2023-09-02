
 import axios from 'axios';

   
const URL = 'https://pixabay.com/api/';
const perPage = 40;
const getImages = async (value, page) => {
  
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
  };


export { getImages };






