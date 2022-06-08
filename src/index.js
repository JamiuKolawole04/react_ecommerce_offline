import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';

render(
  <React.StrictMode>

    <Router>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </Router>

    {/* <App /> */}


  </React.StrictMode>,
  document.getElementById('root')
);

