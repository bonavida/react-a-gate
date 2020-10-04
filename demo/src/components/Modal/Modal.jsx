import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** Styles */
import './Modal.scss';

const ModalHeader = ({ children, onClose }) => (
  <header className="modal__header">
    <h2>{children}</h2>
    <FontAwesomeIcon
      icon="times"
      className="modal__close"
      onClick={() => onClose()}
    />
  </header>
);

const ModalBody = ({ children }) => (
  <section className="modal__body">{children}</section>
);

const ModalFooter = ({ children }) => (
  <footer className="modal__footer">{children}</footer>
);

const Modal = ({ children }) => <>{children}</>;

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
