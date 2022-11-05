import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [images, setImages] = useState('');

  const handleImageChange = e => {
    setImages(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (images.trim() === '') {
      Notiflix.Notify.warning('Enter the name of the picture');
      return;
    }

    onSubmit(images);
    setImages('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <ImSearch style={{ width: 30, height: 25 }} />
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={images}
          onChange={handleImageChange}
        />
      </form>
    </header>
  );
}

Searchbar.protoTypes = {
  onSubmit: PropTypes.func.isRequired,
};
