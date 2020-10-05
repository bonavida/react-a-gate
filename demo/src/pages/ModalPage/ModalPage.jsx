import React, { useState } from 'react';
import { ModalGate } from 'react-a-gate';
/** Components */
import Modal from 'components/Modal';
import CodeBlock from 'components/CodeBlock';
/** Snippets */
import {
  modal_example_1,
  modal_example_2_1,
  modal_example_2_2,
} from 'snippets';
/** Styles */
import './ModalPage.scss';

const ModalPage = () => {
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);

  const openFirstModal = () => setIsFirstOpen(true);
  const closeFirstModal = () => setIsFirstOpen(false);
  const openSecondModal = () => setIsSecondOpen(true);
  const closeSecondModal = () => setIsSecondOpen(false);

  return (
    <div className="modalPage__container">
      <div className="modalPage__block">
        <CodeBlock value={modal_example_1}></CodeBlock>
        <div className="modalPage__trigger">
          <button type="button" className="App-button" onClick={openFirstModal}>
            Open modal
          </button>
          <ModalGate
            id="app_modal_1"
            isOpen={isFirstOpen}
            onClose={closeFirstModal}
          >
            <Modal>
              <Modal.Header onClose={closeFirstModal}>Modal</Modal.Header>
              <Modal.Body>
                <div className="modal__example">
                  <div>
                    Things you can do with <b>ModalGate</b>:
                  </div>
                  <ul>
                    <li>
                      You can render any kind of modal you want, just code and
                      customize your own!
                    </li>
                    <li>You can also render plain text.</li>
                    <li>Scroll on the background is disabled.</li>
                    <li>
                      What if you want to close it? Just press the ESC key or
                      click outside the modal. Or even put your own button and
                      close it from the inside!
                    </li>
                  </ul>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  className="modal__button"
                  onClick={closeFirstModal}
                >
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </ModalGate>
        </div>
      </div>
      <hr />
      <div className="modalPage__block">
        <div>
          <CodeBlock value={modal_example_2_1}></CodeBlock>
          <CodeBlock language="sass" value={modal_example_2_2}></CodeBlock>
        </div>
        <div className="modalPage__trigger custom-modal">
          <button
            type="button"
            className="App-button"
            onClick={openSecondModal}
          >
            Open modal
          </button>
          <ModalGate
            id="app_modal_2"
            className="custom-modal"
            isOpen={isSecondOpen}
            onClose={closeSecondModal}
          >
            <Modal>
              <Modal.Header onClose={closeSecondModal}>Modal</Modal.Header>
              <Modal.Body>
                <div className="modal__example">
                  <div>
                    Things you can do with <b>ModalGate</b>:
                  </div>
                  <ul>
                    <li>
                      You can render any kind of modal you want, just code and
                      customize your own!
                    </li>
                    <li>You can also render plain text.</li>
                    <li>Scroll on the background is disabled.</li>
                    <li>
                      What if you want to close it? Just press the ESC key or
                      click outside the modal. Or even put your own button and
                      close it from the inside!
                    </li>
                  </ul>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  className="modal__button"
                  onClick={closeSecondModal}
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
