import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter basename={window.location.pathname || ''}>
      <Routes>
      <Route exact path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
);