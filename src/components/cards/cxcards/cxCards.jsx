import React, { Component } from 'react';
import Cxcard from './cxCardsUI';

import computer1 from '../../assets/img/computer1.jpg';
import computer2 from '../../assets/img/computer2.jpg';


class Cxcards extends Component {
    render() {
        return (
            <div className="container-fluid d-flex justify-content-center">

               {/* Start of the dropdown product menu */}
               <div id="product" className="row"> 
            <div className="col-md-2">
                <div class="dropdown">
                <button class="dropbtn">Product</button>
                <div class="dropdown-content">
                    <a href="/ex">EX</a>
                    <a href="/cx">CX</a>
                </div>
                
                </div>
                </div>
             {/* End of the dropdown product menu */}


            {/* Start of the dropdown customer menu */}
            <div id="customer" className="col-md-2">
                <div class="dropdown">
                <button class="dropbtn">CUSTOMER</button>
                <div class="dropdown-content">
                    <a href="#">NEW</a>
                    <a href="#">OLD</a>
                </div>
                </div>
                </div>
             {/* End of the dropdown customer menu */}


            {/* Start of the dropdown currency menu */}
         
            <div id="currency" className="col-md-2">
                <div class="dropdown">
                <button class="btn-currency dropbtn" >CURRENCY</button>
                <div class="dropdown-content">
                    <a href="#">USD</a>
                    <a href="#">POUND</a>
                    <a href="#">EURO</a>
                    <a href="#">NOK</a>
                </div>
                </div>
                </div>

                {/* End of the dropdown currency menu */}

              
                <div className="row">
                    <div className="col-md-3">
                        <Cxcard imgsrc={computer1} title="Console" ahref="/mr" hrefTitle="Management" />
                    </div>
                    <div className="col-md-3">
                        <Cxcard imgsrc={computer2} title="Test" ahref="/ex" hrefTitle="Employee"/>
                    </div>
                    <div className="col-md-3">
                        <Cxcard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>
                    <div className="col-md-3">
                        <Cxcard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>
                    <div className="col-md-3">
                        <Cxcard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>
                    
                
                </div>
            </div>
          </div>
          
         
        );
    }
}

export default Cxcards;
