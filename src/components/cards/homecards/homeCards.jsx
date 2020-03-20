import React, { Component } from 'react';

import iconCalculator from '../../assets/img/iconcalculator.png';


class Homecards extends Component {
    render() {
        return (
            <div className="container-fluid d-flex justify-content-center">
                
                  {/* Sidebar start */}
                  <div className="container-fluid nav-sidebar">
                    <p className="title-sidebar">
                        <img className="icon-sidebar" src={iconCalculator} alt="icon calculator" /> ROI Calculator > </p>
                    <ul className="list-sidebar">
                        <li className="div-link-text-sidebar" onClick={() => { this.handleScrollTo(this.refROIDashboard) }}>ROI Dashboard</li>
                        <p></p>
                        <li className="div-link-text-sidebar" onClick={() => { this.handleScrollTo(this.refWhatIf) }}>About your company</li>
                        <ul className="list-sidebar-moretext">
                            <li className="div-link-text-sidebar" onClick={() => { this.handleScrollTo(this.refWhatIf) }}>The Impact</li>
                        </ul>
                        <p></p>
                        <li className="div-link-text-sidebar" onClick={() => { this.handleScrollTo(this.refWhatIf) }}>What If</li>
                        <p></p>
                        <li className="div-link-text-sidebar" onClick={() => { this.handleScrollTo(this.refWhatIf) }}>Total Business Impact</li>
                    </ul>

                    <div className="container-fluid links-sidebar">
                        <ul className="list-links-sidebar">
                            <li><a className="href-link-text-sidebar" href="/mr">MR</a></li>
                            <p></p>
                            <li><a className="href-link-text-sidebar" href="/ex">EX</a></li>
                            <p></p>
                            <li><a className="href-link-text-sidebar" href="/cx">CX</a></li>
                        </ul>
                    </div>


                </div>

                {/* Sidebar end */}
               
            </div>
         
        );
    
        }
    }

export default Homecards;
