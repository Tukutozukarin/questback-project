import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Ex from './Ex';
import Cx from './Cx';
import Mr from './Mr';


import logo from '../assets/img/questbacklogo.png';
import iconCalculator from '../assets/img/iconcalculator.png';
import 'bootstrap/dist/css/bootstrap.min.css';


const styles = {
    background: '#000',
    width: '2px',
    cursor: 'col-resize',
    margin: '0 5px',
    height: '100%',
  };

  function Container() {
      return( 
        <Router>
        
          
  
          <menu class="container-fluid"  style={{ background: '#6D9BB5', position: 'sticky', margin: '0rem', padding: '1rem', width: '280px'}}>
  
  
          <div class="container-fluid col-xs-12 col-md-8"><img src={logo}  
          position="absolute" alt="questbackLogo" width="130px" height="50px"/></div>
          <div class="container-fluid col-xs-12 col-md-8"><h3><p></p></h3></div>
  
  
        <div><text><img src={iconCalculator}  
          position="absolute" alt="iconCalculator" width="20px" height="20px" 
          style={{display : 'inline-block', color: '#000000', fontSize: '28px', fontWeight: 'bold'}} />
          <Link to="/"  style={{ color: '#000000', fontSize: '17px', fontWeight: 'bold' }}> ROI </Link>
          </text>
          </div>
          <div class="container-fluid col-xs-12 col-md-8"><Link to="/" style={{ color: '#000000', fontSize: '17px'}}>Dashboard <p></p></Link></div>
          <div class="container-fluid col-xs-12 col-md-8"><Link to="/" style={{ color: '#000000', fontSize: '17px'}}>Hidden <p></p></Link></div>
          <div class="container-fluid col-xs-12 col-md-8"><Link to="/" style={{ color: '#000000', fontSize: '17px'}}>Internal <p></p></Link></div>
      
          <div class="container-fluid col-xs-12 col-md-8"><Link to="/" style={{ color: '#000000', fontSize: '17px'}}>International int <p></p></Link></div>
  
  
          <div class="container-fluid col-xs-12 col-md-8"><h3><p></p></h3>
          </div>
  
  
            <div class="container-fluid col-xs-12 col-md-8"><Link to="/"  style={{ color: '#000000', fontSize: '28px', fontWeight: 'bold' }}>MR</Link>
                <div class="container-fluid col-xs-12 col-md-8"><h3><p></p></h3></div>
            </div>
  
            <div class="container-fluid col-xs-12 col-md-8"><Link to="/ex" style={{ color: '#000000', fontSize: '28px', fontWeight: 'bold'  }}>EX</Link>
                <div class="container-fluid col-xs-12 col-md-8"><h3><p></p></h3></div>
  
            </div>
            <div class="container-fluid col-xs-12 col-md-8"><Link to="/cx" style={{ color: '#000000', fontSize: '28px', fontWeight: 'bold'  }}>CX</Link>
                  <div class="container-fluid col-xs-12 col-md-8"><h3><p></p></h3></div>
            </div>
          </menu>
          <div>
   
            <Route exact path="/" component={Mr} />
            <Route path="/ex" component={Ex} />
            <Route path="/cx" component={Cx} />
          </div>
      </Router>
      )
    

     


      
  }

  export default Container; 