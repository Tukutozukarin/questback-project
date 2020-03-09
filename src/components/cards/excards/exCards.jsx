import React, { Component } from 'react';
import Excard from './exCardsUI';
import classnames from 'classnames';


import computer1 from '../../assets/img/computer1.jpg';
import computer2 from '../../assets/img/computer2.jpg';
import whythenumbersImg from '../../assets/img/Sigurd.png';



class Excards extends Component {
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


                <div class="container-fluid div-belowcards"
                ><h3>Why the numbers</h3>
                    <hr class="hr-below-whythenumbers-title" />
                    <div>

                         <img src={whythenumbersImg} class="img-whythenumbers" alt="whythenumbersImg"></img>

                        <div class="container-fluid div-whythenumbers-textbox">
                            <p>

                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                 commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>

                            <hr class="hr-below-whythenumbers" />

                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                 commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <p><a class="a-read-more" href="questback.no" target="_blank">Read more &#8594;</a> </p>

                        </div>


                    </div>
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
                        <Excard imgsrc={computer1} title="Size" ahref="/mr" hrefTitle="Included" />
                    </div>
                    <div className="col-md-4">
                        <Excard imgsrc={computer2} title="Test" ahref="/ex" hrefTitle="Employee" />
                    </div>
                    <div className="col-md-4">
                        <Excard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test" />
                    </div>
                    <div className="col-md-4">
                        <Excard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test" />
                    </div>
                    <div className="col-md-4">
                        <Excard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"  />
                    </div>

                </div>
            </div>

        );
    }
}

export default Excards;
