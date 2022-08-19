import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  };

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleClick}>
        <ModalWindow>{this.props.children}</ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
