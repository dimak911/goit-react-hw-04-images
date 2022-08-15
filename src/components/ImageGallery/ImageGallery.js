import { ImageGalleryWrapper } from './ImageGallery.styled';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ imagesList, searchValue, openModal }) => (
  <ImageGalleryWrapper>
    {imagesList.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        id={id}
        smallImage={webformatURL}
        bigImage={largeImageURL}
        searchValue={searchValue}
        openModal={openModal}
      />
    ))}
  </ImageGalleryWrapper>
);

ImageGallery.propTypes = {
  imagesList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  searchValue: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
