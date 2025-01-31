import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './frontend/App.jsx';
import { ThemeProvider } from './frontend/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
