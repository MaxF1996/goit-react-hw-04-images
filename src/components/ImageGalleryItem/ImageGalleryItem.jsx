import { GalleryItem, GalleryPicture } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, largeImageURL, openModal }) => {
  return (
    <GalleryItem onClick={() => openModal(largeImageURL)}>
      <GalleryPicture src={src} alt={alt} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  largeImageURL: PropTypes.string,
  openModal: PropTypes.func,
};

export default ImageGalleryItem;
