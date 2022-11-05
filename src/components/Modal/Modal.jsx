import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal({ onClose, URL, alt }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleBackDropClick}>
      <div className={css.Modal}>
        <img src={URL} alt={alt} />
      </div>
    </div>
  );
}

Modal.protoTypes = {
  onClose: PropTypes.func.isRequired,
  URL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
