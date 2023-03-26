import { Component } from 'react';
// import { createPortal } from 'react-dom';
import { Overlay, ModalBlock, ModalImage } from './Modal.styled';
import PropTypes from 'prop-types';

// const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleBackDropClick}>
        <ModalBlock>
          <ModalImage src={this.props.largeImageURL} alt="" />
        </ModalBlock>
      </Overlay>
    );
    //   modalRoot
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageUrl: PropTypes.string,
};

export default Modal;
