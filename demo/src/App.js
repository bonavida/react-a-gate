import React, { useState } from 'react';
/** Components */
import { ModalGate, TooltipGate, PopoverGate } from 'react-a-gate';
/** Styles */
import './App.scss';

const Text = () => <div>This is a text</div>;

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="App">
      <header className="App-header">
        <PopoverGate content={<Text />} place="top">
          <button type="button" className="App-button">
            Trigger Popover
          </button>
        </PopoverGate>
        <br />
        <TooltipGate content={<Text />} place="bottom">
          <button type="button" className="App-button">
            Trigger
          </button>
        </TooltipGate>
        <br />
        <TooltipGate content={<Text />} place="left" className="red">
          <button type="button" className="App-button">
            Trigger
          </button>
        </TooltipGate>
        <br />
        <TooltipGate content={<Text />} place="right" theme="light">
          <button type="button" className="App-button">
            Trigger
          </button>
        </TooltipGate>
        <br />
        <button type="button" className="App-button" onClick={openModal}>
          Open modal
        </button>
        <ModalGate id="app_modal" isOpen={isOpen} onClose={closeModal}>
          <>
            <div>This is a modal</div>
            <button type="button" className="App-button" onClick={closeModal}>
              Close
            </button>
          </>
        </ModalGate>
      </header>
    </div>
  );
};

export default App;
