import React, { Component } from 'react';
import Mrcard from './mrCardsUI';
import classnames from 'classnames';


import computer1 from '../../assets/img/computer1.jpg';
import computer2 from '../../assets/img/computer2.jpg';


class Mrcards extends Component {
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

            <div class="container-fluid div-topnav"></div>

            <div class="container-fluid div-belowtopnav"></div>

            <div class="container-fluid div-result"
            >ROI Dashboard | Total Business:
            <p class="sum"> 30030300</p>
            </div>

            <div class="container-fluid div-textbelowdashboard">
                <h3>Select a section below to review your ROI{"\n"}</h3>
                <p>To calculate your return of investment, begin with the first section below. 
                    The information entered automatically populate corresponding fields in the other sections.
                    You will be able to move from section to section to add/or adjust value to reflect your organization and process.
                    To return to this screen, click on the ROI Dashboard button to the left. 
                </p>
                </div>

                <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
         />

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

                    <div className="col-md-4">
                        <Mrcard imgsrc={computer1} title="Console" ahref="/mr" hrefTitle="Management" />
                    </div>
                    <div className="col-md-4">
                        <Mrcard imgsrc={computer2} title="Test" ahref="/ex" hrefTitle="Employee"/>
                    </div>
                    <div className="col-md-4">
                        <Mrcard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>
                    <div className="col-md-4">
                        <Mrcard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>
                    <div className="col-md-4">
                        <Mrcard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>                   
                
                </div>
            </div>
       
        );
    }
}

export default Mrcards;
