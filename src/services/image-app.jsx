const KEY = 'key=30362375-b667f06e2aa263e68d53d2cf4&q';
const PER_PAGE = 'per_page=12';

function fetchImages(images, page) {
  return fetch(
    ` https://pixabay.com/api/?${KEY}=${images}&${PER_PAGE}&page=${page}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Image ${images} was not found`));
  });
}

const api = { fetchImages };
export default api;
