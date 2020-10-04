import React, { useState } from 'react';
import { ModalGate } from 'react-a-gate';
/** Components */
import Modal from 'components/Modal';
import CodeBlock from 'components/CodeBlock';
/** Snippets */
import { modal_example_1 } from 'snippets';
/** Styles */
import './ModalPage.scss';

const ModalPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="modalPage__container">
      <div className="modalPage__block">
        <CodeBlock value={modal_example_1}></CodeBlock>
        <div className="modalPage__trigger">
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
        </div>
      </div>
    </div>
  );
};

export default ModalPage;
