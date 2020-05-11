import React, { Component } from 'react';

import iconCalculator from '../../assets/img/iconcalculator.png';


class Homecards extends Component {
    render() {
        return (
            <div className="container-fluid">
                
                  {/* Sidebar start */}
               {/*}   <div className="container-fluid nav-sidebar">
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

                

                </div>

                {/* Sidebar end */}
               
            </div>
         
        );
    
        }
    }

export default Homecards;
