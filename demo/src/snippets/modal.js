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
      <!-- Element that triggers the opening of the modal -->
      <button type="button" className="App-button" onClick={openModal}>
        Open modal
      </button>
      <!-- ModalGate wrapper -->
      <ModalGate id="app_modal_1" isOpen={isOpen} onClose={closeModal}>
        <!-- Modal here is a component I created only for the purpose of this demo.
          It can be any React component that you want or any text or container. --> 
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

export const modal_example_2_1 = `
// To override the default modal styles, you can pass
// a custom CSS class through the className prop.
// ...
<ModalGate
  id="app_modal_2"
  className="custom-modal"
  isOpen={isSecondOpen}
  onClose={closeSecondModal}
>
  <Modal>
    ...
  </Modal>
</ModalGate>
// ...
`;

export const modal_example_2_2 = `
// And then you can just define your own custom styles.
// The two main CSS classes are:
// modal__backdrop (custom-modal will override the css properties from this class)
// modal__content

.custom-modal {
  // Override default styles
  .modal__content {
    opacity: 0.9;
    max-width: 20%;
    border: none;
  }

  // Custom modal styles
  .modal__header,
  .modal__body,
  .modal__footer {
    color: white;
    background-color: #333;
  }

  .modal__button {
    background-color: #333;
    border: 1px solid white;
  }
}
`;
