import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, onClick }) => (
  <li className={css.ImageGalleryItem} onClick={onClick}>
    <img
      className={css.ImageGalleryItem_image}
      src={webformatURL}
      alt={tags}
      data-picture={largeImageURL}
    />
  </li>
);

export default ImageGalleryItem;

ImageGalleryItem.protoTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
