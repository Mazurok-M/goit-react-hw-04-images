import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    images: '',
  };

  handleImageChange = e => {
    this.setState({ images: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.images.trim() === '') {
      Notiflix.Notify.warning('Enter the name of the picture');

      return;
    }

    this.props.onSubmit(this.state.images);
    this.setState({ images: '' });
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
            value={this.state.images}
            onChange={this.handleImageChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
