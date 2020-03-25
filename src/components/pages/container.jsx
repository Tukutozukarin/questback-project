import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import Ex from './Ex';
import Cx from './Cx';
import Mr from './Mr';

import logo from '../assets/img/questbacklogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';


  function Container() {
      return( 
        <Router>
        
          <menu class="container-fluid" 
          style={{ background: '#6D9BB5', position: 'fixed', margin: '0rem', padding: '1rem', width: '18%', left: '0%', height: '100%', display: 'block' }}>
  
  
          <div class="container-fluid col-xs-12 col-md-12 text-center"><img src={logo} 
          id="logoimg" alt="questbackLogo" width="160px"/></div>
          <div class="container-fluid col-xs-12 col-md-8"><h3><p></p></h3></div>
  
        
          </menu>
          <div>
   
            <Route exact path="/" component={Home} />
            <Route path="/mr" component={Mr} />
            <Route path="/ex" component={Ex} />
            <Route path="/cx" component={Cx} />
          </div>
      </Router>
      )
    

     


      
  }

  export default Container; 