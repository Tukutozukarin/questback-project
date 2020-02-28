import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Ex from './Ex';
import Cx from './Cx';
import Mr from './Mr';
import Sidebar from '../sidenav/sidebar';
import SplitPane from "react-split-pane";

import logo from '../assets/img/questbacklogo.png';
import iconCalculator from '../assets/img/iconcalculator.png';
import 'bootstrap/dist/css/bootstrap.min.css';


const items = [
    { name: 'Logo', label: 'Logo' },
    {
      name: 'roiCalculator',
      label: 'ROI Calculator',
      items: [
        { name: 'dashboard', label: 'Dashboard'},
        { name: 'hiddenTransaction', label: 'Hidden Transaction Fees' },
        { name: 'internalProductivity', label: 'Internal Productivity and Labor Savings' },
        { name: 'internationalRevenue', label: 'International Revenue'},
        { name: 'summary', label: 'Summary'},
      ],
    },
    { name: '', label: '' },
    { name: '', label: '' },
    { name: 'mr', label: 'MR' },
    { name: 'ex', label: 'EX', path:'/ex' , exact: true},
    { name: 'cx', label: 'CX' },
    {
    },
  ]

  const routes = [
    {
      path: '/',
      exact: true,
      sidebar: () => <div>home!</div>,
      main: () => <h2>Home</h2>
    },
    {
      path: '/bubblegum',
      sidebar: () => <div>bubblegum!</div>,
      main: () => <h2>Bubblegum</h2>
    },
    {
      path: '/shoelaces',
      sidebar: () => <div>shoelaces!</div>,
      main: () => <h2>Shoelaces</h2>
    }
  ]

  /* 
      <Router>


      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            width: "40%",
            background: "#f0f0f0"
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/bubblegum">Bubblegum</Link>
            </li>
            <li>
              <Link to="/shoelaces">Shoelaces</Link>
            </li>
          </ul>
        
      
       
        <Switch>
          <Route path="/mr" component={Mr} />
          <Route path="/ex" component={Ex}/>
          <Route path="/cx" component={Cx} />
        </Switch>
  
  */ 
//   <Sidebar items={items}/>

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
      )
    

     


      
  }

  export default Container; 