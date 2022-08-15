import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ bigImage, searchValue }) => (
  <Overlay>
    <ModalWindow>
      <img src={bigImage} alt={searchValue} />
    </ModalWindow>
  </Overlay>
);

Modal.propTypes = {
  bigImage: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
};
