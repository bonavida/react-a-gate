import React from 'react';
import { BrowserRouter } from 'react-router-dom';
/** Utils */
import { registerIcons } from 'utils/fontAwesomeLibrary';
/** Components */
import { Routes } from 'routes/Routes';
/** Styles */
import './App.scss';

registerIcons();

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes />
    </BrowserRouter>
  );
};

export default App;
