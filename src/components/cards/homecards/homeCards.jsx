import React, { Component } from 'react';
import Homecard from './homeCardsUI';
import classnames from 'classnames';

import computer1 from '../../assets/img/computer1.jpg';
import computer2 from '../../assets/img/computer2.jpg';


class Homecards extends Component {

    constructor(props) {
        super(props);

        this.state = {
            prevScrollpos: window.pageYOffset,
            visible: true
        };
    }

    // Adds an event listener when the component is mount. 
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll); 
    }

    // Remove the event listener when the component is unmount. 
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }


    // This will hide or show the meny
    handleScroll = () => {
        const { prevScrollpos } = this.state;

        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos > currentScrollPos;

        this.setState({
            prevScrollpos: currentScrollPos,
            visible
        });
    };

    render() {
        return (


            <div className="container-fluid d-flex justify-content-center">

        <nav className={classnames("navbar", {
                "navbar--hidden": !this.state.visible
            })}
            >
              

                  <div class="dropdown">
                <button class="product-btn">Product</button>
                <button class="dropbtn">MR</button>

                <div class="dropdown-content">
                    <a href="/cx">MR</a>
                    <a href="/ex">EX</a>
                    <a href="/cx">CX</a>
                </div>
                
                </div>

                <div class="dropdown">
                <button class="customer-btn">CUSTOMER</button>
                <button class="dropbtn">OLD</button>
                <div class="dropdown-content">
                    <a href="/ex">NEW</a>
                    <a href="/cx">OLD</a>
                </div> 
                </div>

                <div class="dropdown">
                <button class="currency-btn">CURRENCY</button>
                <button class="dropbtn">USD</button>
                <div class="dropdown-content">
                    <a href="/ex">USD</a>
                    <a href="/cx">NOK</a>
                    <a href="/cx">EURO</a>
                    <a href="/cx">GBP</a>
                </div> 
                </div>
                
        
                

            </nav>

              
                <div className="row">
                    <div className="col-md-3">
                        <Homecard imgsrc={computer1} title="Console" ahref="/mr" hrefTitle="Management" />
                    </div>
                    <div className="col-md-3">
                        <Homecard imgsrc={computer2} title="Test" ahref="/ex" hrefTitle="Employee"/>
                    </div>
                    <div className="col-md-3">
                        <Homecard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>
                    <div className="col-md-3">
                        <Homecard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>
                    <div className="col-md-3">
                        <Homecard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>
                    <div className="col-md-3">
                        <Homecard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>
                    
                
                </div>
            </div>
          
          
         
        );
    }
}

export default Homecards;
