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

                <div className="container-fluid div-topnav"></div>

                <div className="container-fluid div-belowtopnav"></div>

                <div className="container-fluid div-result"
                >ROI Dashboard | Total Business:
            <p className="sum"> 30030300</p>
                </div>

                <div className="container-fluid div-textbelowdashboard">
                    <h3>Select a section below to review your ROI{"\n"}</h3>
                    <p>To calculate your return of investment, begin with the first section below.
                        The information entered automatically populate corresponding fields in the other sections.
                        You will be able to move from section to section to add/or adjust value to reflect your organization and process.
                        To return to this screen, click on the ROI Dashboard button to the left.
                </p>
                </div>


                <div className="container-fluid div-whythenumbers"
                ><h3>Why the numbers</h3>
                    <hr className="hr-below-whythenumbers-title" />
                    <div>

                        <img src={whythenumbersImg} class="img-whythenumbers" alt="whythenumbersImg"></img>

                        <div className="container-fluid div-whythenumbers-textbox">
                            <p>

                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                 commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>

                            <hr className="hr-below-whythenumbers" />

                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                 commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <p><a className="a-read-more" href="https://www.questback.com/no/" target="blank">Read more &#8594;</a> </p>
                        </div>
                    </div>
                </div>

                <div className="container-fluid div-whatif">
                    <h3><b>WHAT IF</b></h3>



                    <div className="container-fluid div-whatif-textbox">


                        <p>
                            <b>
                                This is what you could save by using Questback tools.
                                 All the calculation is based on articles and by customer.
                            </b>
                        </p>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                        </p>

                        <p><a class="a-read-more" href="https://www.questback.com/no/" target="blank">Read more &#8594;</a> </p>
                    </div>
                </div>

                <div className="container-fluid div-calculation">
                    <div className="div-calculation-title">
                        <h2>Do the calculation</h2>
                    </div>

                    {/* Start of first calculation textbox */}
                    <div className="div-calculation-textbox-1">
                        <div className="calculation-green-textbox-1">
                            <p className="p-calculation-green-textbox-1">
                                <b>
                                    If you could reduce CPH to this much <p className="p-calculation-green-numbers-1" ><h2><b>$900</b></h2></p>
                                </b>
                            </p>

                        </div>
                        <div className="calculation-costofrecruitment-textbox-1">
                            <p><b>Cost of recruitment would go down</b> <h4 className="calculation-costofrecruitment-numbers-1" >$ 1 800 800</h4> </p>
                        </div>

                        <div className="calculation-savingyou-textbox-1">
                            <p className="calculation-savingyou-text-textbox-1">Saving you</p>
                            <h4 className="calculation-savingyou-numbers-textbox-1">$ 200 000</h4>
                        </div>

                    </div>

                    {/* End of first calculation textbox */}

                    {/* Start of second calculation textbox */}

                <div className="div-calculation-textbox-2">
                        <div className="calculation-green-textbox-2">
                        <p className="p-calculation-green-textbox-2">
                                <b>
                                    If you could reduce ONBOARDING time this much <p className="p-calculation-green-numbers-2" ><h2><b>Days 14</b></h2></p>
                                </b>
                            </p>
                    </div>
                    <div className="calculation-costofonboarding-textbox-2">
                         <p className="calculation-costofonboarding-text-2" ><b>Cost of ONBOARDING will go down to</b> 
                           
                            
                            <h4 className="calculation-costofonboarding-numbers-2" >$ 1 800 800</h4> 
                        </p>
                       
                        <div className="calculation-costofonboarding-savingyou-textbox-2">
                            <p className="calculation-costofonboarding-textcalculated-2">Calculated as (Pay / 240 working days) x 
                                <br/>onboarding Time x (Total New Hires)
                                </p>
                                <h4 className="calculation-costofonboarding-numbers-textbox-2" >$291 667</h4> 
                        </div>

                        <div className="calculation-costofonboarding-savingyou-text-2">
                            <p className="calculation-savingyou-text-textbox-2">Saving you</p>
                        </div>

                        </div>

                </div>

                <div className="div-calculation-textbox-3">
                    <div className="calculation-green-textbox-3">

                    </div>
                </div>
            </div>

                  {/* End of second calculation textbox */ }


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



            <div className="container-fluid div-cards">
                <div className="row">

                    <div className="col-md-3">
                        <Excard imgsrc={computer1} title="Size" ahref="/mr" hrefTitle="Included" />
                    </div>
                    <div className="col-md-3">
                        <Excard imgsrc={computer2} title="Test" ahref="/ex" hrefTitle="Employee" />
                    </div>
                    <div className="col-md-3">
                        <Excard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test" />
                    </div>
                    <div className="col-md-3">
                        <Excard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test" />
                    </div>
                    <div className="col-md-3">
                        <Excard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test" />
                    </div>

                </div>


            </div>

            </div >

        );
    }
}

export default Excards;
