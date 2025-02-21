import React from 'react';
import ReactDOM from 'react-dom';
import App from './src'; // Import the main App component
import './styles/App.css'; // Import global styles

// Render the App component into the root DOM element
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);