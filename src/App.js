//import React from 'react';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Ex from './components/pages/Ex';
import Cx from './components/pages/Cx';
import Mr from './components/pages/Mr';
import SplitPane from 'react-split-pane';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/sidenav/sidebar';

import logo from './components/assets/img/questbacklogo.png';
import iconCalculator from './components/assets/img/iconcalculator.png';


import './App.css'; 


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
  { name: 'ex', label: 'EX' },
  { name: 'cx', label: 'CX' },
  {
  },
]


const App = () => {
    return (
      <Router>
        <div>
      
        <Link to="/ex" ></Link>
      <Sidebar items={items}/>

        <Switch>
          <Route exact path="/" component={Mr} />
          <Route path="/ex" component={Ex} />
          <Route path="/cx" component={Cx} />
        </Switch>
       
        </div>
    </Router>
    );
  }


export default App;
