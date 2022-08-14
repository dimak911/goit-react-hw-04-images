import PropTypes from 'prop-types';
import { GalleryItem, ImageGalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, smallImage, bigImage, searchValue }) => (
  <GalleryItem>
    <ImageGalleryImage src={smallImage} alt={searchValue} data-img-id={id} />
  </GalleryItem>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImage: PropTypes.string.isRequired,
  bigImage: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
};
