import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './components/pages/container';

const App = () => {
  return (
    <Router>
      {/* All the coding has been only been done on employee experience  
          The other pages are only stock with no added content
      */}
      <Container />
    </Router>
  );
}


export default App;
