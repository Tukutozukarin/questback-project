//import React from 'react';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Ex from './components/pages/Ex';
import Cx from './components/pages/Cx';
import Mr from './components/pages/Mr';
import SplitPane from 'react-split-pane';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './img/questbacklogo.png';
import iconCalculator from './img/iconcalculator.png';

import './App.css'; 

/*test */ 

const sideNavStyles = {
  background: '#6D9BB5',
  width: '10%',
  cursor: 'col-resize',
  margin: '0 0.1px',
  height: '100%',
};

const sidePanelStyles = {
  background: '#6D9BB5',
  margin: '0',
};


const App = () => {
    return (
      <Router>
      <SplitPane
        split="vertical"
        minSize={100}
        defaultSize={100}
        pane1Style={sidePanelStyles}
        resizerStyle={sideNavStyles}
      >


        <menu class="container-fluid">


        <div class="container-fluid col-xs-12 col-md-8"><img src={logo}  
        position="absolute" alt="questbackLogo" width="115px" height="40px" /></div>
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
      </SplitPane>
    </Router>
    );
  }


export default App;
