import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import './Modal.scss';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  componentWillUmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleClickBackdrop}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
export default Modal;
