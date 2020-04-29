import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './components/pages/container';

const App = () => {
  return (
    <Router>
      <Container />
    </Router>
  );
}


export default App;
