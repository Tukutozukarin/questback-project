import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from './Home';
import Ex from './Ex';
import Cx from './Cx';
import Mr from './Mr';
import logo from '../assets/img/questbacklogo.png';


function Container() {
  return (
    <Router>
      <nav className="main-navbar">
        {/* Questback logo */}
        <NavLink to="/" className="logo">
          <img src={logo}
            id="logoimg" alt="questbackLogo" />
        </NavLink>
        <div className="navbar-menu">
          <ul>
            {/* These have been commented off since they have not been used, only EX has been worked on
            <li>
              <NavLink to="/mr"><span>Mr</span></NavLink>
            </li> 
            */}

            <li>
              <NavLink to="/ex">Ex</NavLink>
            </li>
            
          
            {/*
            <li>
              <NavLink to="/cx"><span>Cx</span></NavLink>
            </li>
            
            */}
         
          </ul>
        </div>

      </nav>
      {/* Router links for the pages */}
      <main className="main-content">
        <Route exact path="/" component={Ex} />
        <Route path="/mr" component={Mr} />
        <Route path="/ex" component={Ex} />
        <Route path="/cx" component={Cx} />
      </main>
    </Router>
  )

}

export default Container; 