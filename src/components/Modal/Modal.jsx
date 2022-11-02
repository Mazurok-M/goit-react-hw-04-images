import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onToggleModal();
    }

    console.log(e.target, 'target');
    console.log(e.currentTarget, 'currentTarget');
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onToggleModal();
    }
  };

  static propTypes = {
    onToggleModal: PropTypes.func.isRequired,
    URL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  render() {
    const { URL, alt } = this.props;

    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackDropClick}>
        <div className={css.Modal}>
          <img src={URL} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
