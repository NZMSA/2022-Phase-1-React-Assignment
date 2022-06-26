import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from './Pages/Main';
import NotFound from './Pages/NotFound';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
