//import React from 'react';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from './components/pages/container';

import logo from './components/assets/img/questbacklogo.png';
import iconCalculator from './components/assets/img/iconcalculator.png';


import './App.css'; 



const App = () => {
    return (
      <Router>
        <div class="container-fluid d-flex justify-content-center">
          
        {/* Container is the one that 
            stores all the pages on the site */}
        <Container />

      
        </div>

    </Router>
    );
  }


export default App;
