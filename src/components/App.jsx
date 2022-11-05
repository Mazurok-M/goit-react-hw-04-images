import { useState, useEffect } from 'react';
import imagesApi from '../services/image-app';
import { Searchbar, ImageGallery, Button, Modal, Loader } from '../components';

export default function App() {
  const [images, setImages] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [alt, setAlt] = useState('');
  const [URL, setURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (images === '') {
      return;
    }

    const fetchArticles = () => {
      setLoading(true);

      imagesApi
        .fetchImages(images, page)
        .then(({ hits }) => setHits(prevHits => [...prevHits, ...hits]))
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));
    };

    fetchArticles();
  }, [images, page]);

  const handleFormSubmit = images => {
    setImages(images);
    setHits([]);
    setPage(1);
  };

  const LoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openleModal = e => {
    toggleModal();
    setURL(e.target.dataset.picture);
    setAlt(e.target.alt);
  };

  const toggleModal = e => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      <ImageGallery hits={hits} onClick={openleModal} />
      {loading && <Loader />}
      {error && <h2>{error.message}</h2>}
      {hits.length > 0 && !loading && (
        <Button text="load more" onClick={LoadMore} />
      )}
      {showModal && <Modal URL={URL} alt={alt} onClose={toggleModal} />}
    </div>
  );
}
