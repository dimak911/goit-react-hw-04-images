import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

export const Button = ({ loadMoreImages }) => (
  <LoadMoreButton type="button" onClick={loadMoreImages}>
    Load more
  </LoadMoreButton>
);

Button.propTypes = {
  loadMoreImages: PropTypes.func.isRequired,
};
