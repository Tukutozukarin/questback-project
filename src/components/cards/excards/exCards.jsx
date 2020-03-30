import React, { Component } from 'react';
import Excard from './exCardsUI';
import classnames from 'classnames';
import ExChartTheImpact from '../../chart/exchart/excharttheimpact';

import businessimpactimg from '../../assets/img/business-impact.png';
import whythenumbersImg from '../../assets/img/Sigurd.png';
import iconCalculator from '../../assets/img/iconcalculator.png';

import ExSizeSlider from '../../rangeslider/exslider/exSizeSlider';
import ExGrowRateSlider from '../../rangeslider/exslider/exGrowRateSlider';
import ExAttritionSlider from '../../rangeslider/exslider/exAttritionSlider';
import ExPaySlider from '../../rangeslider/exslider/exPaySlider';
import ExCostPerHireSlider from '../../rangeslider/exslider/exCostPerHireSlider';
import ExOnboardingSlider from '../../rangeslider/exslider/exOnboardingSlider';

import ExCalculationCPHSlider from '../../rangeslider/exslider/dothecalculation-exslider/exCalculationCPHSlider';
import ExCalculationOnboardingSlider from '../../rangeslider/exslider/dothecalculation-exslider/exCalculationOnboardingSlider';
import ExCalculationAttritionSlider from '../../rangeslider/exslider/dothecalculation-exslider/exCalculationAttritionSlider';

import includeButton from '../../buttons/includebutton';


class Excards extends Component {

    /* Navigating though divs for sidebar  */
    refWhatIf = React.createRef()
    refROIDashboard = React.createRef()
    refTheImpact = React.createRef()
    refTotalBusinessImpact = React.createRef()


    handleScrollTo = (elRef) => {
        // Incase the ref supplied isn't ref.current
        const el = elRef.current ? elRef.current : elRef

        // Scroll the element into view
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            prevScrollpos: window.pageYOffset,
            visible: true,
            SizeValue: 0,
            GrowValue: 0,
            AttritionValue: 0,
            PayValue: 0,
            CostPerHireValues: 0,
            OnboardingTimeValue: 0,
            CalculationCPHValue: 0,
            CalculationOnboardingValue: 0,
            CalculationAttritionValue: 0,
            totalHires: 0,
            chartData: {}

        };
    }

    getChartData() {
        // Ajax calls 
        this.setState({
            chartData: {
                labels: [
                    'Year 1',
                    'Year 2',
                    'Year 3',
                ],
                datasets: [
                    {
                        label: 'The Impact',
                        data: [
                            this.state.SizeValue,
                            4324,
                            54654,
                            654756,

                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(75, 192, 192, 0.6)',

                        ]
                    }
                ]
            }
        })
    }

    componentWillMount() {
        this.getChartData();
    }

    // Adds an event listener when the component is mount. 
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.setState({ loaded: true })
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

    /* 
        handleSizeChange = (size) => {
            this.setState({ SizeValue: size })
        }
    
      
        handleGrowChange = (growratevalues) => {
            this.setState({ GrowValue: growratevalues })
        }
    
        handleAttritionChange = (attritionvalues) => {
            this.setState({ AttritionValue: attritionvalues })
        }
    
        */

    handleSizeChange = (size) => {
        this.setState({ SizeValue: parseInt(size) })
    }


    handleGrowChange = (growratevalues) => {
        this.setState({ GrowValue: growratevalues })
    }

    handleAttritionChange = (attritionvalues) => {
        this.setState({ AttritionValue: parseInt(attritionvalues) })
    }

    handlePayChange = (payvalues) => {
        this.setState({ PayValue: payvalues })
    }

    handleCostPerHireChange = (costperhirevalues) => {
        this.setState({ CostPerHireValues: costperhirevalues })
    }

    handleOnboardinTimeChange = (onboardingvalues) => {
        this.setState({ OnboardingTimeValue: onboardingvalues })
    }

    handleCalculationCPHChange = (calculationcphvalues) => {
        this.setState({ CalculationCPHValue: calculationcphvalues })
    }

    handleCalculationOnboardingChange = (calculationonboardingvalues) => {
        this.setState({ CalculationOnboardingValue: calculationonboardingvalues })
    }

    handleCalculationAttritionChange = (calculationattritionvalues) => {
        this.setState({ CalculationAttritionValue: calculationattritionvalues })
    }






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
                            <li className="div-link-text-sidebar" onClick={() => { this.handleScrollTo(this.refTheImpact) }}>The Impact</li>
                        </ul>
                        <p></p>
                        <li className="div-link-text-sidebar" onClick={() => { this.handleScrollTo(this.refWhatIf) }}>What If</li>
                        <p></p>
                        <li className="div-link-text-sidebar" onClick={() => { this.handleScrollTo(this.refTotalBusinessImpact) }}>Total Business Impact</li>
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

                <div className="container-fluid div-topnav"></div>

                <div className="container-fluid div-belowtopnav"></div>

                <div className="container-fluid div-result" ref={this.refROIDashboard}
                >ROI Dashboard | Total Business:
                 <p className="sum">$ 30030300</p>
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

                {/* The ref will refer the scroll link to what if, in sidebar */}
                <div className="container-fluid div-whatif" ref={this.refWhatIf}>
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
                                <b> If you could reduce CPH to this much
                                    <p className="p-calculation-green-numbers-1" ><h4><b>${this.state.CalculationCPHValue}</b></h4></p>
                                </b>
                            </p>
                            <div className="calculation-CPH-slider">
                                <ExCalculationCPHSlider setCalculationCPHValue={this.handleCalculationCPHChange} />
                            </div>
                        </div>
                        <div className="calculation-costofrecruitment-textbox-1">
                            <p><b>Cost of recruitment would go down</b> <h4 className="calculation-costofrecruitment-numbers-1" >$ 1 800 800</h4> </p>
                        </div>


                        <div className="calculation-costofonboarding-savingyou-text-1">
                            <p className="calculation-savingyou-text-textbox-1">Saving you</p>
                        </div>

                        <div className="calculation-costofonboarding-savingyou-textbox-1">

                            <h4 className="calculation-costofonboarding-numbers-textbox-1" >$200 000</h4>
                        </div>


                    </div>

                    {/* End of first calculation textbox */}

                    {/* Start of second calculation textbox */}

                    <div className="div-calculation-textbox-2">
                        <div className="calculation-green-textbox-2">
                            <p className="p-calculation-green-textbox-2">
                                <b>If you could reduce ONBOARDING time this much <p className="p-calculation-green-numbers-2" ><h4><b>Days {this.state.CalculationOnboardingValue}</b></h4></p>
                                </b>
                            </p>
                            <div className="calculation-onboarding-slider">
                                <ExCalculationOnboardingSlider setCalculationOnboardingValue={this.handleCalculationOnboardingChange} />
                            </div>
                        </div>
                        <div className="calculation-costofonboarding-textbox-2">
                            <p className="calculation-costofonboarding-text-2" ><b>Cost of ONBOARDING will go down to</b>


                                <h4 className="calculation-costofonboarding-numbers-2" >$ 1 800 800</h4>
                            </p>

                            <div className="calculation-costofonboarding-savingyou-textbox-2">

                                <h4 className="calculation-costofonboarding-numbers-textbox-2" >$291 667</h4>
                            </div>


                            <div className="calculation-costofonboarding-savingyou-text-2">
                                <p className="calculation-savingyou-text-textbox-2">Saving you</p>
                            </div>

                        </div>

                    </div>



                    <div className="div-calculation-textbox-3">
                        <div className="calculation-green-textbox-2">
                            <p className="p-calculation-green-textbox-2">
                                <b>
                                    If you could reduce ATTRITION to this much <p className="p-calculation-green-numbers-3" >
                                        <h4><b>{this.state.CalculationAttritionValue} %</b></h4></p>
                                </b>
                            </p>

                            <div className="calculation-attrition-slider">
                                <ExCalculationAttritionSlider setCalculationAttritionValue={this.handleCalculationAttritionChange} />
                            </div>
                        </div>
                        <div className="calculation-costofonboarding-textbox-2">
                            <p className="calculation-costofonboarding-text-2" ><b>Cost of ONBOARDING will go down to</b>

                                <h4 className="calculation-costofonboarding-numbers-2" >$ 1 800 800</h4>
                            </p>



                            <div className="calculation-costofonboarding-savingyou-text-2">
                                <p className="calculation-savingyou-text-textbox-2">Saving you</p>
                            </div>

                            <div className="calculation-costofonboarding-savingyou-textbox-2">

                                <h4 className="calculation-costofonboarding-numbers-textbox-2" >$291 667</h4>
                            </div>

                        </div>

                    </div>

                    <p className="calculated-CPH">Calculated as CPH x (Total new Hires)</p>

                </div>

                {/* start of business impact */}

                <div className="container-fluid div-business-impact">
                    <div className="div-total-business-impact" ref={this.refTotalBusinessImpact}>
                        <b className="div-total-business-impact-title">Your total BUSINESS IMPACT</b>
                        <includeButton onClick={() => { console.log("test")}}
                                    type="button"
                                    buttonStyle="btn--primary--outline"
                                    buttonSize="btn--large"
                                >Include</includeButton>
                    </div>

                    <div className="div-business-impact-box">
                        <ExChartTheImpact chartData={this.state.chartData} legendPositiont="top" location="EX" />
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
                        <button class="dropbtn drop-product">MR</button>

                        <div class="dropdown-content dropdown-product">
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
                        <button class="dropbtn drop-currency">USD</button>
                        <div class="dropdown-content dropdown-currency">
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

                            <Excard
                                title="Size"
                                description="How many employees do you have"
                                ahref="/mr"
                            />
                            <p className="p-SizeValue">{this.state.SizeValue}</p>
                            <div className=" container-fluid div-slider-size">
                                <ExSizeSlider setSizeValue={this.handleSizeChange} />

                             
                            </div>
                        </div>
                        <div className="col-md-3">

                            <Excard
                                title="Grow rate"
                                description="By what % does your organization grow per year?"
                                ahref="/mr"
                                hrefTitle="Included"
                            />
                            <p className="p-GrowValue">{this.state.GrowValue}</p>
                            <div className="container-fluid div-slider-grow">
                                <ExGrowRateSlider setGrowValue={this.handleGrowChange} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <Excard
                                title="Attrition"
                                description="What % of your organization leave per year?"
                                ahref="/cx"
                                hrefTitle="test"
                            />
                            <p className="p-AttritionValue">{this.state.AttritionValue}</p>
                            <div className="container-fluid div-slider-attrition">
                                <ExAttritionSlider setAttritionValue={this.handleAttritionChange} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <Excard
                                title="Pay"
                                description="What is the average fully loaded annual salary in your company?"
                                ahref="/cx"
                                hrefTitle="test"
                            />
                            <p className="p-PayValue">{this.state.PayValue}</p>
                            <div className="container-fluid div-slider-pay">
                                <ExPaySlider setPayValue={this.handlePayChange} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <Excard
                                title="Cost per hire (CPH)"
                                description="Consider job boards, consultants, background - Checks, marketing etc..."
                                ahref="/cx"
                                hrefTitle="test"
                            />
                            <p className="p-CostPerHireValue">{this.state.CostPerHireValues}</p>
                            <div className="container-fluid div-slider-costperhire">
                                <ExCostPerHireSlider setCostValue={this.handleCostPerHireChange} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <Excard
                                title="Onboarding time (in days"
                                description="How long does it take for employees. To be fully productive?"
                                ahref="/cx"
                                hrefTitle="test"
                            />
                            <p className="p-OnboardingTimeValue">{this.state.OnboardingTimeValue}</p>
                            <div className="container-fluid div-slider-onboardingtime">
                                <ExOnboardingSlider setOnboardingValue={this.handleOnboardinTimeChange} />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="div-the-impact-card">
                                <h4 className="the-impact-title" ref={this.refTheImpact}><b>THE IMPACT</b></h4>

                                <div className="div-the-impact-card-info">
                                    <p className="the-impact-total-new-hires-text"><b>Total New Hires >> </b></p>
                                    <b className="the-impact-total-new-hires-number">{this.state.SizeValue + this.state.AttritionValue}</b>
                                    <hr className="hr-total-new-hires" />

                                    <p className="the-impact-cost-of-recruitmet-text"><b>Cost of Recruitment</b></p>
                                    <b className="the-impact-cost-of-recruitmet-number">{this.state.AttritionValue}</b>

                                    <p className="the-impact-productivity-cost-text"><b>How much does getting <br /> people
                                    up to full produtivity cost?</b></p>
                                    <b className="the-impact-productivity-cost-number">$ 4 375 000</b>

                                    <p className="the-impact-cost-of-attrition-text"><b>Cost of Attrition</b></p>
                                    <b className="the-impact-cost-of-attrition-number">$ 33 000 000</b>

                                    <hr className="hr-cost-of-attrition" />

                                    <p className="the-impact-total-cost-text"><b>Total cost in one year</b></p>
                                    <b className="the-impact-total-cost-number">$ 4 137 500</b>

                                </div>

                            </div>
                        </div>

                    </div>


                </div>

            </div >

        );
    }
}

export default Excards;
