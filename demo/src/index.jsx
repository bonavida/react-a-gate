import React from 'react';
import { render } from 'react-dom';
/** Containers */
import App from 'containers/App';
/** Styles */
import 'styles/main.scss';

const mountNode = document.getElementById('root');
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  mountNode
);
