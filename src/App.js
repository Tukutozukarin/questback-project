//import React from 'react';
import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from './components/pages/container';
import './App.css'; 



const App = () => {
    return (
      <Router>
        <div class="d-flex justify-content-center" >
          
        {/* Container is the one that 
            stores all the pages on the site */}
        <Container />

        

        </div>
    </Router>
    );
  }


export default App;
