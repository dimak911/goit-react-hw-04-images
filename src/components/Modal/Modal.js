import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

let modalOverlay = null;
export class Modal extends Component {
  static propTypes = {
    modalImage: PropTypes.string.isRequired,
    searchValue: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    modalOverlay = document.querySelector('#overlay');
    modalOverlay.addEventListener('click', this.props.closeModal);
    window.addEventListener('keydown', this.props.closeModal);
  }

  componentWillUnmount() {
    modalOverlay.removeEventListener('click', this.props.closeModal);
    window.removeEventListener('keydown', this.props.closeModal);
  }

  render() {
    const { modalImage, searchValue } = this.props;

    return (
      <Overlay id="overlay">
        <ModalWindow>
          <img src={modalImage} alt={searchValue} />
        </ModalWindow>
      </Overlay>
    );
  }
}
