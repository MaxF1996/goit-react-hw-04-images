import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import ImgGallery from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ImgGallery>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          alt={tags}
          largeImageURL={largeImageURL}
          openModal={openModal}
        />
      ))}
    </ImgGallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  openModal: PropTypes.func,
};

export default ImageGallery;
