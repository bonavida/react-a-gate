export const modal_example_1 = `
import React, { useState } from 'react';
import { ModalGate } from 'react-a-gate';

import Modal from 'components/Modal';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button type="button" className="App-button" onClick={openModal}>
        Open modal
      </button>
      <ModalGate id="app_modal_1" isOpen={isOpen} onClose={closeModal}>
        <Modal>
          <Modal.Header onClose={closeModal}>Modal</Modal.Header>
          <Modal.Body>This is a modal</Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="modal__button"
              onClick={closeModal}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </ModalGate>
    </>
  );
};
`;
