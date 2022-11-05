const KEY = 'key=30362375-b667f06e2aa263e68d53d2cf4&q';

function fetchImages(images = '', page = 1) {
  const params = new URLSearchParams({
    page: page,
    per_page: 12,
    images: images,
  });

  return fetch(` https://pixabay.com/api/?${KEY}=${images}&${params}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Image ${images} was not found`));
    }
  );
}

const api = { fetchImages };
export default api;
