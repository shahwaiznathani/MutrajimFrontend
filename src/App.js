import React from 'react';
import "./App.css";
import { BrowserRouter } from 'react-router-dom';

import Abc from './router';


function App() {
  return (
    <BrowserRouter>
      <Abc/>
    </BrowserRouter>
  );
}

export default App;