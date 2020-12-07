import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from './provider/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// <React.StrictMode>
// <App />
// </React.StrictMode>,
// document.getElementById('root')
