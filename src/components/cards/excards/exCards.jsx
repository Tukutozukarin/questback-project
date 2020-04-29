import React, { Component, useState } from 'react';
import Excard from './exCardsUI';
import classnames from 'classnames';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import ExChartTheImpact from '../../chart/exchart/excharttheimpact';
import ExChartTotalBusinessImpact from '../../chart/exchart/excharttotalbusinessimpact';

import whythenumbersImg from '../../assets/img/Sigurd.png';
import iconCalculator from '../../assets/img/iconcalculator.png';
import pdfTemplate from '../../assets/img/questback_protoTemplate.png';

import ExSizeSlider from '../../rangeslider/exslider/exSizeSlider';
import ExGrowRateSlider from '../../rangeslider/exslider/exGrowRateSlider';
import ExAttritionSlider from '../../rangeslider/exslider/exAttritionSlider';
import ExPaySlider from '../../rangeslider/exslider/exPaySlider';
import ExCostPerHireSlider from '../../rangeslider/exslider/exCostPerHireSlider';
import ExOnboardingSlider from '../../rangeslider/exslider/exOnboardingSlider';

import ExCalculationCPHSlider from '../../rangeslider/exslider/dothecalculation-exslider/exCalculationCPHSlider';
import ExCalculationOnboardingSlider from '../../rangeslider/exslider/dothecalculation-exslider/exCalculationOnboardingSlider';
import ExCalculationAttritionSlider from '../../rangeslider/exslider/dothecalculation-exslider/exCalculationAttritionSlider';

import { renderToString } from 'react-dom/server';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import styled from '@react-pdf/styled-components';



class Excards extends Component {

    /* Navigating though divs for sidebar  */
    refWhatIf = React.createRef()
    refROIDashboard = React.createRef()
    refTheImpact = React.createRef()
    refTotalBusinessImpact = React.createRef()
    refPdf = React.createRef()

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

            MorePeoplePerYear: 1000,
            LostPeoplePerYear: 1000,

            SizeValue: 0,
            GrowValue: 0,
            AttritionValue: 0,
            PayValue: 0,
            CostPerHireValues: 0,
            OnboardingTimeValue: 0,

            CalculationCPHValue: 0,
            CalculationOnboardingValue: 0,
            CalculationAttritionValue: 0,
            FullProductionCost: 240,

            chartData: {},
            chartBusinessData: {},

            calculateSizeValue: true,

            includeExcludeSize: true,
            includeExcludeGrow: true,
            includeExcludeAttrition: true,
            includeExcludePay: true,
            includeExcludeCostPerHire: true,
            includeExcludeOnboarding: true,

            currencyText: "USD",
            currencyChange: "$",


            time: new Date()


        };
    }





    getChartData() {
        // Ajax calls
        this.setState((state) => {
            return {
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
                                (state.MorePeoplePerYear + state.LostPeoplePerYear) +
                                (state.CostPerHireValues * (state.MorePeoplePerYear + state.LostPeoplePerYear)) +
                                ((state.PayValue / state.FullProductionCost) * state.OnboardingTimeValue * (state.MorePeoplePerYear + state.LostPeoplePerYear)) +
                                (state.PayValue + state.LostPeoplePerYear),
                                432,
                                746

                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(75, 192, 192, 0.6)',

                            ]
                        }
                    ]
                }
            }
        })
    }

    getChartBusinessData() {
        // Ajax calls 
        this.setState((state) => {
            return {
                chartBusinessData: {
                    labels: [
                        'Year 1',
                        'Year 2',
                        'Year 3',
                    ],
                    datasets: [
                        {
                            label: 'The Business impact',
                            data: [
                                // First row recruitment
                                (state.PayValue + state.LostPeoplePerYear - state.LostPeoplePerYear) +
                                //Second and third row is onboarding savings
                                (state.PayValue / state.FullProductionCost) * state.OnboardingTimeValue * (state.MorePeoplePerYear + state.LostPeoplePerYear) -
                                (state.PayValue / state.FullProductionCost) * state.CalculationOnboardingValue * (state.MorePeoplePerYear + state.LostPeoplePerYear) +
                                //last row is recruitment savings
                                state.CostPerHireValues * (state.MorePeoplePerYear + state.LostPeoplePerYear) -
                                state.CalculationCPHValue * (state.MorePeoplePerYear + state.LostPeoplePerYear),
                                400,
                                600,

                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                            ]
                        }
                    ]
                }
            }
        })
    }


    componentWillMount() {
        this.getChartData();
        this.getChartBusinessData();
    }

    // Adds an event listener when the component is mount.
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.setState({ loaded: true });
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    // Remove the event listener when the component is unmount.
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            time: new Date()
        });
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

    handleSizeChange = (size) => {
        this.setState({ SizeValue: parseInt(size) })
        this.getChartData()
        this.getChartBusinessData()
    }


    handleGrowChange = (growratevalues) => {
        this.setState({ GrowValue: parseInt(growratevalues) })
        this.getChartData()
        this.getChartBusinessData()

    }

    handleAttritionChange = (attritionvalues) => {
        this.setState({ AttritionValue: parseInt(attritionvalues) })
        this.getChartData()
        this.getChartBusinessData()

    }

    handlePayChange = (payvalues) => {
        this.setState({ PayValue: parseInt(payvalues) })
        this.getChartData()
        this.getChartBusinessData()

    }

    handleCostPerHireChange = (costperhirevalues) => {
        this.setState({ CostPerHireValues: parseInt(costperhirevalues) })
        this.getChartData()
        this.getChartBusinessData()

    }

    handleOnboardinTimeChange = (onboardingvalues) => {
        this.setState({ OnboardingTimeValue: parseInt(onboardingvalues) })
        this.getChartData()
        this.getChartBusinessData()

    }

    handleCalculationCPHChange = (calculationcphvalues) => {
        this.setState({ CalculationCPHValue: parseInt(calculationcphvalues) })
        this.getChartData()
        this.getChartBusinessData()

    }

    handleCalculationOnboardingChange = (calculationonboardingvalues) => {
        this.setState({ CalculationOnboardingValue: parseInt(calculationonboardingvalues) })
        this.getChartData()
        this.getChartBusinessData()

    }

    handleCalculationAttritionChange = (calculationattritionvalues) => {
        this.setState({ CalculationAttritionValue: parseInt(calculationattritionvalues) })
        this.getChartData()
        this.getChartBusinessData()

    }

    /* Include functionanlities button */

    includeSize = () => {
        this.setState({
            SizeValue: 0,
            includeExcludeSize: !this.state.includeExcludeSize
        });
    }

    includeGrow = () => {
        this.setState({
            GrowValue: 0,
            includeExcludeGrow: !this.state.includeExcludeGrow

        });
    }

    includeAttrition = () => {
        this.setState({
            AttritionValue: 0,
            includeExcludeAttrition: !this.state.includeExcludeAttrition
        });
    }

    includePay = () => {
        this.setState({
            PayValue: 0,
            includeExcludePay: !this.state.includeExcludePay
        });
    }

    includeCostPerHire = () => {
        this.setState({
            CostPerHireValues: 0,
            includeExcludeCostPerHire: !this.state.includeExcludeCostPerHire
        });
    }

    includeOnboarding = () => {
        this.setState({
            OnboardingTimeValue: 0,
            includeExcludeOnboarding: !this.state.includeExcludeOnboarding
        });
    }

    currencyChangeToUSD = (e) => {
        //reent default will let you use onclick in ahref
        e.preventDefault();
        this.setState({
            currencyChange: "$",
            currencyText: "USD"
        });
    }

    currencyChangeToNok = (e) => {
        e.preventDefault();
        this.setState({
            currencyChange: "kr",
            currencyText: "NOK",
        });
    }

    currencyChangeToEuro = (e) => {
        e.preventDefault();
        this.setState({
            currencyChange: "€",
            currencyText: "Euro"
        });
    }

    currencyChangeToGBP = (e) => {
        e.preventDefault();
        this.setState({
            currencyChange: "£",
            currencyText: "GBP"
        });
    }














    render() {

        let btn_includeSize = this.state.includeExcludeSize ? "Include" : "Exclude";
        let btn_includeGrow = this.state.includeExcludeGrow ? "Include" : "Exclude";
        let btn_includeAttrition = this.state.includeExcludeAttrition ? "Include" : "Exclude";
        let btn_includePay = this.state.includeExcludePay ? "Include" : "Exclude";
        let btn_includeCostPerHire = this.state.includeExcludeCostPerHire ? "Include" : "Exclude";
        let btn_includeOnboarding = this.state.includeExcludeOnboarding ? "Include" : "Exclude";


        // Other ways to add date and time in real time
        // this.state.time.toLocalTimeString(), toLocalDateString() and if you want both its toLocalString 
        // the text values in pdf. The first one means vertical positioning and second value is horizontal positioning
        const print = () => {
            const string = renderToString(<Prints />);
            const pdf = new jsPDF();
            const pdfTemplateInvoice = new Image();
            var width = pdf.internal.pageSize.getWidth();
            var height = pdf.internal.pageSize.getHeight();


            pdfTemplateInvoice.src = pdfTemplate;
            pdf.addImage(pdfTemplateInvoice, 'png', 10, 0, width - 20, height - 10)

            pdf.setFontSize(6)
            // date format
            pdf.text(` ${this.state.time.toLocaleDateString()}`, 173.5, 10)
            // time format
            pdf.text(` ${this.state.time.toLocaleTimeString()}`, 185, 10)

            // potential benefit achieveable
            pdf.setFontSize(16)
            pdf.text(`${Math.round(this.state.SizeValue + this.state.GrowValue)}`, 148, 53)

            // minustes spent searching left result
            pdf.setFontSize(14)
            pdf.text(`${Math.round(this.state.OnboardingTimeValue + this.state.GrowValue)}`, 43, 103)

            // your business department middle result
            pdf.text( `${Math.round(this.state.PayValue + this.state.GrowValue)}`,90, 103)

            // current data quality right result
            pdf.text(`${Math.round(this.state.AttritionValue + this.state.GrowValue)}`,138, 103)

            // number of sales result left
            pdf.setFontSize(14)
            pdf.text(`${Math.round(this.state.SizeValue)}`,70, 123)

            // Annual company result middle
            pdf.text(`${Math.round(this.state.SizeValue + this.state.AttritionValue)}`,116, 123)

            //Number of customers result right
            pdf.text(`${Math.round(this.state.SizeValue + this.state.PayValue)}`,163, 123)

            pdf.setFontSize(22)
            // Indirect cost result left
            pdf.text(`${Math.round(this.state.GrowValue + this.state.GrowValue)}`,62, 170)
            //Operational cost result right
            pdf.text(`${Math.round(this.state.SizeValue + this.state.CostPerHireValues)}`,143, 170)


            pdf.fromHTML(string);
            pdf.save('expdf')
        }

        const styles = StyleSheet.create({
            page: { backgroundColor: 'tomato' },
            text: {
                color: 'blue',
                left: 100,
                fontSize: 30,
                display: 'flex',

            },
            section: {
                textAlign: 'right', margin: 30,
            }
        });

        const Prints = () => (
            <div>
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>


                        </View>
                    </Page>
                </Document>
            </div>

        );







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

                    <div className="container-fluid pdfbtn-sidebar">
                        <button className="PDF-btn" onClick={print}>PDF</button>

                    </div>


                </div>

                {/* Sidebar end */}

                <div className="container-fluid div-topnav"></div>

                <div className="container-fluid div-belowtopnav"></div>

                <div className="container-fluid div-result" ref={this.refROIDashboard}>
                    <p className="p-result">ROI Dashboard | Total Business:</p>

                    <p className="sum">{this.state.currencyChange} 30030300</p>
                </div>

                <div className="container-fluid div-textbelowdashboard">
                    <h3>Select a section below to review your ROI{"\n"}</h3>
                    <p>To calculate your return of investment, begin with the first section below.
                    The information entered automatically populate corresponding fields in the other sections.
                    You will be able to move from section to section to add/or adjust value to reflect your organization and process.
                    To return to this screen, click on the ROI Dashboard button to the left.
                </p>
                </div>


                <div className="container-fluid div-whythenumbers">
                    <p className="p-whythenumbers-title">Why the numbers</p>
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
                    <p className="p-whatif-title">WHAT IF</p>


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
                                    <p className="p-calculation-green-numbers-1" ><h4><b>{this.state.currencyChange}{this.state.CalculationCPHValue}</b></h4></p>
                                </b>
                            </p>
                            <div className="calculation-CPH-slider">
                                <ExCalculationCPHSlider setCalculationCPHValue={this.handleCalculationCPHChange} />
                            </div>
                        </div>
                        <div className="calculation-costofrecruitment-textbox-1">
                            <p><b>Cost of recruitment would go down</b> <h4 className="calculation-costofrecruitment-numbers-1" >{this.state.currencyChange} {this.state.CalculationCPHValue * (this.state.MorePeoplePerYear + this.state.LostPeoplePerYear)}</h4> </p>
                        </div>


                        <div className="calculation-costofonboarding-savingyou-text-1">
                            <p className="calculation-savingyou-text-textbox-1">Saving you</p>
                        </div>

                        <div className="calculation-costofonboarding-savingyou-textbox-1">

                            <h4 className="calculation-costofonboarding-numbers-textbox-1" >{this.state.currencyChange} {Math.round(this.state.CostPerHireValues * (this.state.MorePeoplePerYear + this.state.LostPeoplePerYear) -
                                this.state.CalculationCPHValue * (this.state.MorePeoplePerYear + this.state.LostPeoplePerYear))}</h4>
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


                                <h4 className="calculation-costofonboarding-numbers-2" > {this.state.currencyChange}
                                    {Math.round((this.state.PayValue / this.state.FullProductionCost) * this.state.CalculationOnboardingValue * (this.state.MorePeoplePerYear + this.state.LostPeoplePerYear))}</h4>
                            </p>

                            <div className="calculation-costofonboarding-savingyou-textbox-2">

                                <div className="calculation-costofonboarding-savingyou-text-2">
                                    <p className="calculation-savingyou-text-textbox-2">Saving you</p>
                                </div>

                                <h4 className="calculation-costofonboarding-numbers-textbox-2" >{this.state.currencyChange}
                                    {Math.round((this.state.PayValue / this.state.FullProductionCost) * this.state.OnboardingTimeValue * (this.state.MorePeoplePerYear + this.state.LostPeoplePerYear) -
                                        (this.state.PayValue / this.state.FullProductionCost) * this.state.CalculationOnboardingValue * (this.state.MorePeoplePerYear + this.state.LostPeoplePerYear))}
                                </h4>
                            </div>




                        </div>

                    </div>

                    {/* Start of third calculation textbox */}

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

                                <h4 className="calculation-costofonboarding-numbers-2" >{this.state.currencyChange} {this.state.PayValue * this.state.CalculationAttritionValue}</h4>
                            </p>



                            <div className="calculation-costofonboarding-savingyou-text-2">
                                <p className="calculation-savingyou-text-textbox-2">Saving you</p>
                            </div>

                            <div className="calculation-costofonboarding-savingyou-textbox-2">

                                <h4 className="calculation-costofonboarding-numbers-textbox-2" >{this.state.currencyChange}
                                    {this.state.PayValue + this.state.LostPeoplePerYear - this.state.LostPeoplePerYear}
                                </h4>
                            </div>

                        </div>

                    </div>

                    <p className="calculated-CPH">Calculated as CPH x (Total new Hires)</p>

                </div>

                {/* Start of third calculation textbox */}

                {/* start of business impact */}

                <div className="container-fluid div-business-impact">
                    <div className="div-total-business-impact" ref={this.refTotalBusinessImpact}>
                        <b className="div-total-business-impact-title">Your total BUSINESS IMPACT</b>


                    </div>

                    <div className="div-business-impact-box">
                        <ExChartTotalBusinessImpact chartBusinessData={this.state.chartBusinessData} />


                    </div>


                </div>

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
                        <button class="dropbtn drop-currency">{this.state.currencyText}</button>
                        <div class="dropdown-content dropdown-currency">
                            <a href="#" onClick={this.currencyChangeToUSD}>USD</a>
                            <a href="#" onClick={this.currencyChangeToNok}>Nok</a>
                            <a href="#" onClick={this.currencyChangeToEuro}>EURO</a>
                            <a href="#" onClick={this.currencyChangeToGBP}>GBP</a>
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
                            <div className="container-fluid div-slider-size">
                                <ExSizeSlider setSizeValue={this.handleSizeChange} />
                                <button
                                    className={btn_includeSize}
                                    disabled={this.state.SizeValue === 0 ? true : false}
                                    onClick={this.includeSize.bind(this)}
                                >{btn_includeSize}</button>

                            </div>
                        </div>
                        <div className="col-md-3">

                            <Excard
                                title="Grow rate"
                                description="By what % does your organization grow per year?"
                                ahref="/mr"
                            />
                            <p className="p-GrowValue">{this.state.GrowValue}%</p>
                            <div className="container-fluid div-slider-grow">
                                <ExGrowRateSlider setGrowValue={this.handleGrowChange} />
                                <button
                                    className={btn_includeGrow}
                                    disabled={this.state.GrowValue === 0 ? true : false}
                                    onClick={this.includeGrow.bind(this)}
                                >{btn_includeGrow}</button>

                            </div>
                        </div>
                        <div className="col-md-3">
                            <Excard
                                title="Attrition"
                                description="What % of your organization leave per year?"
                                ahref="/cx"

                            />
                            <p className="p-AttritionValue">{this.state.AttritionValue}%</p>
                            <div className="container-fluid div-slider-attrition">
                               
                                <ExAttritionSlider setAttritionValue={this.handleAttritionChange} />
                                <button
                                    className={btn_includeAttrition}
                                    disabled={this.state.AttritionValue === 0 ? true : false}
                                    onClick={this.includeAttrition.bind(this)}
                                >{btn_includeAttrition}</button>
                            </div>
                        </div>

                  

                        <div className="col-md-3">
                            <div className="div-the-impact-card">
                                <h4 className="the-impact-title" ref={this.refTheImpact}><b>THE IMPACT</b></h4>

                                <div className="div-the-impact-card-info">
                                    <p className="the-impact-total-new-hires-text"><b>Total New Hires >> </b></p>
                                    <b className="the-impact-total-new-hires-number">{this.state.MorePeoplePerYear + this.state.LostPeoplePerYear}</b>
                                    <hr className="hr-total-new-hires" />

                                    <p className="the-impact-cost-of-recruitmet-text"><b>Cost of Recruitment</b></p>
                                    <b className="the-impact-cost-of-recruitmet-number">{this.state.currencyChange} {Math.round(this.state.CostPerHireValues * (this.state.MorePeoplePerYear + this.state.LostPeoplePerYear))}</b>

                                    <p className="the-impact-productivity-cost-text"><b>How much does getting <br /> people
                                    up to full produtivity cost?</b></p>
                                    <b className="the-impact-productivity-cost-number">{this.state.currencyChange} {Math.round(((this.state.PayValue / this.state.FullProductionCost) * this.state.OnboardingTimeValue * (this.state.MorePeoplePerYear + this.state.LostPeoplePerYear)))} </b>

                                    <p className="the-impact-cost-of-attrition-text"><b>Cost of Attrition</b></p>
                                    <b className="the-impact-cost-of-attrition-number">{this.state.currencyChange} {Math.round(this.state.PayValue + this.state.LostPeoplePerYear)}</b>

                                    <hr className="hr-cost-of-attrition" />

                                    <p className="the-impact-total-cost-text"><b>Total cost in one year</b></p>
                                    <b className="the-impact-total-cost-number">{this.state.currencyChange} {Math.round((this.state.MorePeoplePerYear + this.state.LostPeoplePerYear) +
                                        (this.state.CostPerHireValues * (this.state.MorePeoplePerYear + this.state.LostPeoplePerYear)) +
                                        ((this.state.PayValue / this.state.FullProductionCost) * this.state.OnboardingTimeValue * (this.state.MorePeoplePerYear + this.state.LostPeoplePerYear)) +
                                        (this.state.PayValue + this.state.LostPeoplePerYear))
                                    }
                                    </b>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>



                <div className="container-fluid div-cards2">
                    <div className="row">

                        <div className="col-md-3">
                            <Excard
                                title="Pay"
                                description="What is the average fully loaded annual salary in your company?"
                                ahref="/cx"

                            />
                            <p className="p-PayValue">{this.state.currencyChange} {this.state.PayValue} </p>
                            <div className="container-fluid div-slider-pay">
                                <ExPaySlider setPayValue={this.handlePayChange} />
                                <button
                                    className={btn_includePay}
                                    disabled={this.state.PayValue === 0 ? true : false}
                                    onClick={this.includePay.bind(this)}
                                >{btn_includePay}</button>

                            </div>
                        </div>

                        <div className="col-md-3">
                            <Excard
                                title="Cost per hire (CPH)"
                                description="Consider job boards, consultants, background - Checks, marketing etc..."
                                ahref="/cx"
                                hrefTitle="test"
                            />
                            <p className="p-CostPerHireValue">{this.state.currencyChange} {this.state.CostPerHireValues}</p>
                            <div className="container-fluid div-slider-costperhire">
                                <ExCostPerHireSlider setCostValue={this.handleCostPerHireChange} />
                                <button
                                    className={btn_includeCostPerHire}
                                    disabled={this.state.CostPerHireValues === 0 ? true : false}
                                    onClick={this.includeCostPerHire.bind(this)}
                                >{btn_includeCostPerHire}</button>

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
                                <button
                                    className={btn_includeOnboarding}
                                    disabled={this.state.OnboardingTimeValue === 0 ? true : false}
                                    onClick={this.includeOnboarding.bind(this)}
                                >{btn_includeOnboarding}</button>

                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="div-the-impact-card2">
                                <h4 className="the-impact-title" ref={this.refTheImpact}><b>THE IMPACT</b></h4>

                                <div className="div-the-impact-card-chart">
                                    <ExChartTheImpact chartData={this.state.chartData} legendPositiont="top" location="EX" />
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
