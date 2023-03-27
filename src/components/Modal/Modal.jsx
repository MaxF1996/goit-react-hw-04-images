import { useEffect } from 'react';
import { Overlay, ModalBlock, ModalImage } from './Modal.styled';
import PropTypes from 'prop-types';

const Modal = props => {
  const handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      props.onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        props.onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props]);

  return (
    <Overlay onClick={handleBackDropClick}>
      <ModalBlock>
        <ModalImage src={props.largeImageURL} alt="" />
      </ModalBlock>
    </Overlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageUrl: PropTypes.string,
};

export default Modal;
