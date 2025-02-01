import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import CardEditor from './CardEditor';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor" element={<CardEditor />} />
    </Routes>
  </Router>
);

export default App;
