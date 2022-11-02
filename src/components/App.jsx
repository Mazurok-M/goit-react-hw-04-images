import React, { Component } from 'react';
import imagesApi from '../services/image-app';
import { Searchbar, ImageGallery, Button, Modal, Loader } from '../components';

export class App extends Component {
  state = {
    images: '',
    hits: [],
    page: 1,
    showModal: false,
    alt: '',
    URL: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ loading: true });
      imagesApi
        .fetchImages(this.state.images, this.state.page)
        .then(({ hits }) => {
          this.setState(prevState => ({
            hits: [...prevState.hits, ...hits],
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
    if (prevState.images !== this.state.images) {
      this.setState({ loading: true, page: 1, hits: [] });
      imagesApi
        .fetchImages(this.state.images, this.state.page)
        .then(({ hits }) => {
          this.setState({ hits });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = images => {
    this.setState({ images });
  };

  LoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openleModal = e => {
    this.toggleModal();
    this.setState({ URL: e.target.dataset.picture });
    this.setState({ alt: e.target.alt });
  };

  toggleModal = e => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { hits, error, loading, showModal, URL, alt } = this.state;
    const { handleFormSubmit, openleModal, LoadMore, toggleModal } = this;
    return (
      <div>
        <Searchbar onSubmit={handleFormSubmit}></Searchbar>
        <ImageGallery onClick={openleModal} hits={hits} />
        {loading && <Loader />}
        {error && <h2>{error.message}</h2>}
        {hits.length > 0 && !loading && (
          <Button text="load more" onClick={LoadMore} />
        )}
        {showModal && <Modal URL={URL} alt={alt} onToggleModal={toggleModal} />}
      </div>
    );
  }
}

export default App;
