import React, { Component, useState } from 'react';
import Excard from './exCardsUI';
import classnames from 'classnames';
import { Page, View, Document, StyleSheet } from '@react-pdf/renderer';
import ExChartTheImpact from '../../chart/exchart/excharttheimpact';
import ExChartTotalBusinessImpact from '../../chart/exchart/excharttotalbusinessimpact';

import whythenumbersImg from '../../assets/img/Sigurd.png';
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

import CurrencyFormat from 'react-currency-format';
import NumericInput from 'react-numeric-input';
import Numeral from 'numeral';

import { renderToString } from 'react-dom/server';
import jsPDF from 'jspdf';
import './excard-style.css';

class Excards extends Component {
  /* Navigating though divs for sidebar  */
  refROIDashboard = React.createRef();
  refAboutYourCompany = React.createRef();
  refTheImpact = React.createRef();
  refTotalBusinessImpact = React.createRef();
  refUsingQuestback = React.createRef();
  // PDF ref
  refPdf = React.createRef();

  // getting ref to be able to smooth scrolling with a click on the menu
  // and target currennt ref destination
  handleScrollTo = (elRef) => {
    // Incase the ref supplied isn't ref.current
    const el = elRef.current ? elRef.current : elRef;

    // Scroll the element into view
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

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

      currencyText: 'USD',
      currencyChange: '$',

      time: new Date(),
    };
  }

  // get chart data
  getChartData() {
    // Ajax calls
    this.setState((state) => {
      return {
        chartData: {
          labels: ['Year 1', 'Year 2', 'Year 3'],
          datasets: [
            {
              label: 'The Impact',
              data: [
                Math.round(
                  state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    (state.PayValue / state.FullProductionCost) *
                      state.OnboardingTimeValue *
                      ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.PayValue * ((state.SizeValue / 100) * state.AttritionValue)
                ),
                Math.round(
                  state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    (state.PayValue / state.FullProductionCost) *
                      state.OnboardingTimeValue *
                      ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.PayValue * ((state.SizeValue / 100) * state.AttritionValue) +
                    state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    (state.PayValue / state.FullProductionCost) *
                      state.OnboardingTimeValue *
                      ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.PayValue * ((state.SizeValue / 100) * state.AttritionValue)
                ),
                Math.round(
                  state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    (state.PayValue / state.FullProductionCost) *
                      state.OnboardingTimeValue *
                      ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.PayValue * ((state.SizeValue / 100) * state.AttritionValue) +
                    state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    (state.PayValue / state.FullProductionCost) *
                      state.OnboardingTimeValue *
                      ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.PayValue * ((state.SizeValue / 100) * state.AttritionValue) +
                    state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    (state.PayValue / state.FullProductionCost) *
                      state.OnboardingTimeValue *
                      ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.PayValue * ((state.SizeValue / 100) * state.AttritionValue)
                ),
              ],
              backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
            },
          ],
        },
      };
    });
  }

  getChartBusinessData() {
    // Ajax calls
    this.setState((state) => {
      return {
        chartBusinessData: {
          labels: ['Year 1', 'Year 2', 'Year 3'],
          datasets: [
            {
              label: 'The Business impact',
              data: [
                Math.round(state.PayValue * ((state.SizeValue / 100) * state.AttritionValue)) -
                  state.PayValue * ((state.SizeValue / 100) * state.CalculationAttritionValue) +
                  (state.PayValue / 240) *
                    state.OnboardingTimeValue *
                    ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                  (state.PayValue / state.FullProductionCost) *
                    state.CalculationOnboardingValue *
                    ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                  state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                  state.CalculationCPHValue * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue),
                Math.round(
                  state.PayValue * ((state.SizeValue / 100) * state.AttritionValue) -
                    state.PayValue * ((state.SizeValue / 100) * state.CalculationAttritionValue) +
                    (state.PayValue / 240) *
                      state.OnboardingTimeValue *
                      ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                    (state.PayValue / state.FullProductionCost) *
                      state.CalculationOnboardingValue *
                      ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                    state.CalculationCPHValue * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.PayValue * ((state.SizeValue / 100) * state.AttritionValue) -
                    state.PayValue * ((state.SizeValue / 100) * state.CalculationAttritionValue) +
                    (state.PayValue / 240) *
                      state.OnboardingTimeValue *
                      ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                    (state.PayValue / state.FullProductionCost) *
                      state.CalculationOnboardingValue *
                      ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                    state.CalculationCPHValue * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue)
                ),

                Math.round(
                  state.PayValue * ((state.SizeValue / 100) * state.AttritionValue) -
                    state.PayValue * ((state.SizeValue / 100) * state.CalculationAttritionValue) +
                    (state.PayValue / 240) *
                      state.OnboardingTimeValue *
                      ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                    (state.PayValue / state.FullProductionCost) *
                      state.CalculationOnboardingValue *
                      ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                    state.CalculationCPHValue * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.PayValue * ((state.SizeValue / 100) * state.AttritionValue) -
                    state.PayValue * ((state.SizeValue / 100) * state.CalculationAttritionValue) +
                    (state.PayValue / 240) *
                      state.OnboardingTimeValue *
                      ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                    (state.PayValue / state.FullProductionCost) *
                      state.CalculationOnboardingValue *
                      ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                    (state.CalculationCPHValue * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                      state.PayValue * ((state.SizeValue / 100) * state.AttritionValue) -
                      state.PayValue * ((state.SizeValue / 100) * state.CalculationAttritionValue) +
                      (state.PayValue / 240) *
                        state.OnboardingTimeValue *
                        ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                      (state.PayValue / state.FullProductionCost) *
                        state.CalculationOnboardingValue *
                        ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                      state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                      state.CalculationCPHValue * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue))
                ),
              ],
              backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
            },
          ],
        },
      };
    });
  }

  componentWillMount() {
    this.getChartData();
    this.getChartBusinessData();
  }

  // Adds an event listener when the component is mount.
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState({ loaded: true });
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date(),
    });
  }

  // This will hide and show the top navbar
  handleScroll = () => {
    const { prevScrollpos } = this.state;
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible,
    });
  };

  handleSizeChange = (size) => {
    this.setState({ SizeValue: parseInt(size) });
    this.getChartData();
    this.getChartBusinessData();
  };

  handleGrowChange = (growratevalues) => {
    this.setState({ GrowValue: parseInt(growratevalues) });
    this.getChartData();
    this.getChartBusinessData();
  };

  handleAttritionChange = (attritionvalues) => {
    this.setState({ AttritionValue: parseInt(attritionvalues) });
    this.getChartData();
    this.getChartBusinessData();
  };

  handlePayChange = (payvalues) => {
    this.setState({ PayValue: parseInt(payvalues) });
    this.getChartData();
    this.getChartBusinessData();
  };

  handleCostPerHireChange = (costperhirevalues) => {
    this.setState({ CostPerHireValues: parseInt(costperhirevalues) });
    this.getChartData();
    this.getChartBusinessData();
  };

  handleOnboardinTimeChange = (onboardingvalues) => {
    this.setState({ OnboardingTimeValue: parseInt(onboardingvalues) });
    this.getChartData();
    this.getChartBusinessData();
  };

  handleCalculationCPHChange = (calculationcphvalues) => {
    this.setState({ CalculationCPHValue: parseInt(calculationcphvalues) });
    this.getChartData();
    this.getChartBusinessData();
  };

  handleCalculationOnboardingChange = (calculationonboardingvalues) => {
    this.setState({ CalculationOnboardingValue: parseInt(calculationonboardingvalues) });
    this.getChartData();
    this.getChartBusinessData();
  };

  handleCalculationAttritionChange = (calculationattritionvalues) => {
    this.setState({ CalculationAttritionValue: parseInt(calculationattritionvalues) });
    this.getChartData();
    this.getChartBusinessData();
  };

  /* Include functionanlities button */

  includeSize = () => {
    this.setState({
      SizeValue: 0,
      includeExcludeSize: !this.state.includeExcludeSize,
    });
  };

  includeGrow = () => {
    this.setState({
      GrowValue: 0,
      includeExcludeGrow: !this.state.includeExcludeGrow,
    });
  };

  includeAttrition = () => {
    this.setState({
      AttritionValue: 0,
      includeExcludeAttrition: !this.state.includeExcludeAttrition,
    });
  };

  includePay = () => {
    this.setState({
      PayValue: 0,
      includeExcludePay: !this.state.includeExcludePay,
    });
  };

  includeCostPerHire = () => {
    this.setState({
      CostPerHireValues: 0,
      includeExcludeCostPerHire: !this.state.includeExcludeCostPerHire,
    });
  };

  includeOnboarding = () => {
    this.setState({
      OnboardingTimeValue: 0,
      includeExcludeOnboarding: !this.state.includeExcludeOnboarding,
    });
  };

  currencyChangeToUSD = (e) => {
    //reent default will let you use onclick in ahref
    e.preventDefault();
    this.setState({
      currencyChange: '$',
      currencyText: 'USD',
    });
  };

  currencyChangeToNok = (e) => {
    e.preventDefault();
    this.setState({
      currencyChange: 'kr',
      currencyText: 'NOK',
    });
  };

  currencyChangeToEuro = (e) => {
    e.preventDefault();
    this.setState({
      currencyChange: '€',
      currencyText: 'Euro',
    });
  };

  currencyChangeToGBP = (e) => {
    e.preventDefault();
    this.setState({
      currencyChange: '£',
      currencyText: 'GBP',
    });
  };

  sizeFormat(size) {
    return size + '.0';
  }

  growFormat(grow) {
    return grow + '%';
  }

  payFormat(pay) {
    return pay + '';
  }

  onboardingFormat(onboarding) {
    return 'Days ' + onboarding;
  }

  getCostPerHire = () => {
    return (this.state.SizeValue / 100) * this.state.GrowValue + (this.state.SizeValue / 100) * this.state.AttritionValue;
  };

  calculateCostOfRecruitment = () => {
    return Math.round(this.state.CostPerHireValues * this.getCostPerHire());
  };

  render() {
    let btn_includeSize = this.state.includeExcludeSize ? 'Include' : 'Exclude';
    let btn_includeGrow = this.state.includeExcludeGrow ? 'Include' : 'Exclude';
    let btn_includeAttrition = this.state.includeExcludeAttrition ? 'Include' : 'Exclude';
    let btn_includePay = this.state.includeExcludePay ? 'Include' : 'Exclude';
    let btn_includeCostPerHire = this.state.includeExcludeCostPerHire ? 'Include' : 'Exclude';
    let btn_includeOnboarding = this.state.includeExcludeOnboarding ? 'Include' : 'Exclude';

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
      pdf.addImage(pdfTemplateInvoice, 'png', 10, 0, width - 20, height - 10);

      pdf.setFontSize(6);
      // date format
      pdf.text(` ${this.state.time.toLocaleDateString()}`, 173.5, 10);
      // time format
      pdf.text(` ${this.state.time.toLocaleTimeString()}`, 185, 10);

      // potential benefit achieveable
      pdf.setFontSize(16);
      pdf.text(`${Math.round(this.state.SizeValue + this.state.GrowValue)}`, 148, 53);

      // minustes spent searching left result
      pdf.setFontSize(14);
      pdf.text(`${Math.round(this.state.OnboardingTimeValue + this.state.GrowValue)}`, 43, 103);

      // your business department middle result
      pdf.text(`${Math.round(this.state.PayValue + this.state.GrowValue)}`, 90, 103);

      // current data quality right result
      pdf.text(`${Math.round(this.state.AttritionValue + this.state.GrowValue)}`, 138, 103);

      // number of sales result left
      pdf.setFontSize(14);
      pdf.text(`${Math.round(this.state.SizeValue)}`, 70, 123);

      // Annual company result middle
      pdf.text(`${Math.round(this.state.SizeValue + this.state.AttritionValue)}`, 116, 123);

      //Number of customers result right
      pdf.text(`${Math.round(this.state.SizeValue + this.state.PayValue)}`, 163, 123);

      pdf.setFontSize(22);
      // Indirect cost result left
      pdf.text(`${Math.round(this.state.GrowValue + this.state.GrowValue)}`, 62, 170);
      //Operational cost result right
      pdf.text(`${Math.round(this.state.SizeValue + this.state.CostPerHireValues)}`, 143, 170);

      pdf.fromHTML(string);
      pdf.save('expdf');
    };

    const styles = StyleSheet.create({
      page: { backgroundColor: 'tomato' },
      text: {
        color: 'blue',
        left: 100,
        fontSize: 30,
        display: 'flex',
      },
      section: {
        textAlign: 'right',
        margin: 30,
      },
    });

    const Prints = () => (
      <div>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}></View>
          </Page>
        </Document>
      </div>
    );

    return (
      <div>
        <nav
          className={classnames('top-navbar navbar', {
            'navbar--hidden': !this.state.visible,
          })}
        >
          <div class="dropdown">
            <button class="dropdown__btn dropdown__btn--left">Product</button>
            <button class="dropdown__btn dropdown__btn--right">Ex</button>

            <div class="dropdown-content dropdown-product">
              <a href="#">MR</a>
              <a href="/ex">EX</a>
              <a href="#">CX</a>
            </div>
          </div>

          <div class="dropdown">
            <button class="dropdown__btn dropdown__btn--left">CUSTOMER</button>
            <button class="dropdown__btn dropdown__btn--right">OLD</button>
            <div class="dropdown-content">
              <a href="#">NEW</a>
              <a href="#">OLD</a>
            </div>
          </div>

          <div class="dropdown">
            <button class="dropdown__btn dropdown__btn--left">CURRENCY</button>
            <button class="dropdown__btn dropdown__btn--right">{this.state.currencyText}</button>
            <div class="dropdown-content dropdown-currency">
              <a href="#" onClick={this.currencyChangeToUSD}>
                USD
              </a>
              <a href="#" onClick={this.currencyChangeToNok}>
                Nok
              </a>
              <a href="#" onClick={this.currencyChangeToEuro}>
                EURO
              </a>
              <a href="#" onClick={this.currencyChangeToGBP}>
                GBP
              </a>
            </div>
          </div>
        </nav>

        {/* Sidebar start */}
        <div className="container-fluid nav-sidebar">
          <ul className="list-sidebar">
            <li
              className="div-link-text-sidebar"
              onClick={() => {
                this.handleScrollTo(this.refROIDashboard);
              }}
            >
              ROI Dashboard
            </li>
            <p></p>
            <li
              className="div-link-text-sidebar"
              onClick={() => {
                this.handleScrollTo(this.refAboutYourCompany);
              }}
            >
              About your company
            </li>
            <ul className="list-sidebar-moretext">
              <li
                className="div-link-text-sidebar"
                onClick={() => {
                  this.handleScrollTo(this.refTheImpact);
                }}
              >
                The Impact
              </li>
            </ul>
            <p></p>
            <li
              className="div-link-text-sidebar"
              onClick={() => {
                this.handleScrollTo(this.refUsingQuestback);
              }}
            >
              Using Questback
            </li>
            <p></p>
            <li
              className="div-link-text-sidebar"
              onClick={() => {
                this.handleScrollTo(this.refTotalBusinessImpact);
              }}
            >
              Total Business Impact
            </li>
          </ul>
        </div>

        {/* Sidebar end */}

        <div className="container-fluid pdfbtn-sidebar">
          <button className="PDF-btn" onClick={print}>
            PDF
          </button>
        </div>

        <div className="bg-content mt-4 mb-4" ref={this.refROIDashboard}>
          <div className="container d-flex justify-content-between">
            <p className="p-result">ROI Dashboard | Total Business:</p>

            <p className="sum">
              {this.state.currencyChange}{' '}
              {Math.round(this.state.PayValue * ((this.state.SizeValue / 100) * this.state.AttritionValue)) -
                this.state.PayValue * ((this.state.SizeValue / 100) * this.state.CalculationAttritionValue) +
                (this.state.PayValue / 240) *
                  this.state.OnboardingTimeValue *
                  (this.getCostPerHire()) -
                (this.state.PayValue / this.state.FullProductionCost) *
                  this.state.CalculationOnboardingValue *
                  this.getCostPerHire() +
                this.state.CostPerHireValues *
                  this.getCostPerHire() -
                this.state.CalculationCPHValue *
                  this.getCostPerHire()}
            </p>
          </div>
        </div>

        <div className="container bg-content mt-4 mb-4 p-4" ref={this.refAboutYourCompany}>
          <h3>Select a section below to review your ROI{'\n'}</h3>
          <p>
            To calculate your return of investment, begin with the first section below. The information entered automatically populate corresponding
            fields in the other sections. You will be able to move from section to section to add/or adjust value to reflect your organization and
            process. To return to this screen, click on the ROI Dashboard button to the left.
          </p>
        </div>

        <div className="container-fluid mb-4" ref={this.refTheImpact}>
          <div className="row">
            <div className="col-xs-12 col-lg-7">
              <div className="row">
                <div className="col-xs-12 col-xl-4 mb-4">
                  <Excard title="Size" description="How many employees do you have" ahref="/mr">
                    <p className="p-SizeValue">
                      <NumericInput
                        min={0}
                        max={100000}
                        value={this.state.SizeValue}
                        className="form-control p-SizeValue"
                        placeholder=""
                        onChange={this.handleSizeChange}
                        noStyle
                      />
                    </p>

                    <div className="container-fluid div-slider-size">
                      <ExSizeSlider setSizeValue={this.handleSizeChange} />
                      <button className="btn btn-primary" disabled={this.state.SizeValue === 0 ? true : false} onClick={this.includeSize.bind(this)}>
                        {btn_includeSize}
                      </button>
                    </div>
                  </Excard>
                </div>
                <div className="col-xs-12 col-xl-4 mb-4">
                  <Excard title="Grow rate" description="By what % does your organization grow per year?" ahref="/mr">
                    <p className="p-GrowValue">
                      <NumericInput
                        min={0}
                        max={100}
                        value={this.state.GrowValue}
                        className="form-control p-GrowValue"
                        placeholder=""
                        onChange={this.handleGrowChange}
                        format={this.growFormat}
                        noStyle
                      />
                    </p>
                    <div className="container-fluid div-slider-grow">
                      <ExGrowRateSlider setGrowValue={this.handleGrowChange} />
                      <button className="btn btn-primary" disabled={this.state.GrowValue === 0 ? true : false} onClick={this.includeGrow.bind(this)}>
                        {btn_includeGrow}
                      </button>
                    </div>
                  </Excard>
                </div>
                <div className="col-xs-12 col-xl-4 mb-4">
                  <Excard title="Attrition" description="What % of your organization leave per year?" ahref="/cx">
                    <p className="p-AttritionValue">
                      <NumericInput
                        min={0}
                        max={100}
                        value={this.state.AttritionValue}
                        className="form-control p-AttritionValue"
                        placeholder=""
                        onChange={this.handleAttritionChange}
                        format={this.growFormat}
                        noStyle
                      />
                    </p>
                    <div className="container-fluid div-slider-attrition">
                      <ExAttritionSlider setAttritionValue={this.handleAttritionChange} />
                      <button
                        className="btn btn-primary"
                        disabled={this.state.AttritionValue === 0 ? true : false}
                        onClick={this.includeAttrition.bind(this)}
                      >
                        {btn_includeAttrition}
                      </button>
                    </div>
                  </Excard>
                </div>
              </div>
            </div>

            <div className=" col-xs-12 col-lg-5">
              <div className="card shadow">
                <div className="card-body">
                  <h4 className="card-title">
                    <b>THE IMPACT</b>
                  </h4>

                  <div className="div-the-impact-card-info">
                    <p className="the-impact-total-new-hires-text">
                      <b>Total New Hires >> </b>
                    </p>
                    <b className="the-impact-total-new-hires-number p-TheImpact-GreenValue">
                      {Math.round(this.getCostPerHire())}
                    </b>
                    <hr className="hr-total-new-hires" />

                    <p className="the-impact-cost-of-recruitmet-text">
                      <b>Cost of Recruitment</b>
                    </p>
                    <b className="the-impact-cost-of-recruitmet-number p-TheImpact-GreenValue">
                      {this.state.currencyChange} {Numeral(this.calculateCostOfRecruitment()).format('0,0')}
                    </b>

                    <p className="the-impact-productivity-cost-text">
                      <b>Cost of Onboarding</b>
                    </p>
                    <b className="the-impact-productivity-cost-number p-TheImpact-GreenValue">
                      {this.state.currencyChange}{' '}
                      {Math.round(
                        (this.state.PayValue / 240) *
                          this.state.OnboardingTimeValue *
                          this.getCostPerHire()
                      )}{' '}
                    </b>

                    <p className="the-impact-cost-of-attrition-text">
                      <b>Cost of Attrition</b>
                    </p>
                    <b className="the-impact-cost-of-attrition-number p-TheImpact-GreenValue">
                      {this.state.currencyChange} {Math.round(this.state.PayValue * ((this.state.SizeValue / 100) * this.state.AttritionValue))}
                    </b>

                    <hr className="hr-cost-of-attrition" />

                    <p className="the-impact-total-cost-text">
                      <b>Total cost in one year</b>
                    </p>
                    <b className="the-impact-total-cost-number p-TheImpact-GreenValue">
                      {this.state.currencyChange}{' '}
                      {Math.round(
                        this.state.CostPerHireValues *
                          (this.getCostPerHire() +
                          (this.state.PayValue / this.state.FullProductionCost) *
                            this.state.OnboardingTimeValue *
                            this.getCostPerHire()) +
                          this.state.PayValue * ((this.state.SizeValue / 100) * this.state.AttritionValue)
                      )}
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <Excard title="Salary in your company" description="What is the average fully loaded annual salary in your company?" ahref="/cx">
                <p className="p-PayValue">
                  <NumericInput
                    min={0}
                    max={200000}
                    value={this.state.PayValue}
                    className="form-control p-PayValue"
                    placeholder=""
                    onChange={this.handlePayChange}
                    noStyle
                  />
                </p>

                <div className="container-fluid div-slider-pay">
                  <ExPaySlider setPayValue={this.handlePayChange} />
                  <button className="btn btn-primary" disabled={this.state.PayValue === 0 ? true : false} onClick={this.includePay.bind(this)}>
                    {btn_includePay}
                  </button>
                </div>
              </Excard>
            </div>

            <div className="col-md-2">
              <Excard
                title="Cost per hire (CPH)"
                description="Consider job boards, consultants, background - Checks, marketing etc..."
                ahref="/cx"
                hrefTitle="test"
              >
                <p className="p-CostPerHireValue">
                  <NumericInput
                    min={0}
                    max={200000}
                    value={this.state.CostPerHireValues}
                    className="form-control p-CostPerHireValue"
                    placeholder=""
                    onChange={this.handleCostPerHireChange}
                    noStyle
                  />
                </p>
                <div className="container-fluid div-slider-costperhire">
                  <ExCostPerHireSlider setCostValue={this.handleCostPerHireChange} />
                  <button
                    className="btn btn-primary"
                    disabled={this.state.CostPerHireValues === 0 ? true : false}
                    onClick={this.includeCostPerHire.bind(this)}
                  >
                    {btn_includeCostPerHire}
                  </button>
                </div>
              </Excard>
            </div>

            <div className="col-md-2">
              <Excard
                title="Onboarding time (in days)"
                description="How long does it take for employees. To be fully productive?"
                ahref="/cx"
                hrefTitle="test"
              >
                <p className="p-OnboardingTimeValue">
                  <NumericInput
                    min={0}
                    max={365}
                    value={this.state.OnboardingTimeValue}
                    className="form-control p-OnboardingTimeValue"
                    placeholder=""
                    onChange={this.handleOnboardinTimeChange}
                    noStyle
                  />
                </p>
                <div className="container-fluid div-slider-onboardingtime">
                  <ExOnboardingSlider setOnboardingValue={this.handleOnboardinTimeChange} />
                  <button
                    className="btn btn-primary"
                    disabled={this.state.OnboardingTimeValue === 0 ? true : false}
                    onClick={this.includeOnboarding.bind(this)}
                  >
                    {btn_includeOnboarding}
                  </button>
                </div>
              </Excard>
            </div>

            <div className="col-md-6">
              <div className="card shadow">
                <div className="card-body">
                  <h4 className="card-title">
                    <b>THE IMPACT</b>
                  </h4>
                  <div className="card-text">
                    <ExChartTheImpact chartData={this.state.chartData} legendPositiont="top" location="EX" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5 mb-5">
          <h3>Why the numbers</h3>
          <hr />
          <div className="row flex-md-row-reverse">
            <div className="col-md-4">
              <img src={whythenumbersImg} class="img-whythenumbers" alt="whythenumbersImg"></img>
            </div>

            <div className="col-md-8">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <hr className="hr-below-whythenumbers" />

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                <a className="a-read-more" href="https://www.questback.com/no/" target="blank">
                  Read more &#8594;
                </a>{' '}
              </p>
            </div>
          </div>
        </div>

        {/* The ref will refer the scroll link to what if, in sidebar */}
        <div className="bg-content pt-5 pb-5 mt-5 mb-5" ref={this.refUsingQuestback}>
          <div className="container">
            <h3>Using Questback</h3>
            <hr />
            <p>
              <b>This is what you could save by using Questback tools. All the calculation is based on articles and by customer.</b>
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
              in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <p>
              <a class="a-read-more" href="https://www.questback.com/no/" target="blank">
                Read more &#8594;
              </a>{' '}
            </p>
          </div>
        </div>

        <div className="container mt-5 mb-5">
          <h3>Do the calculation</h3>
          <hr />
          <div className="container-fluid bg-content p-4">
            <div className="row align-items-center mb-3">
              <div className="col-md-7">
                <strong> If you could reduce CPH to this much</strong>
              </div>
              <div className="col-md-3">
                <ExCalculationCPHSlider setCalculationCPHValue={this.handleCalculationCPHChange} />
              </div>
              <div className="col-md-2 text-right">
                <h4 className="p-DoTheCaluculation-InputColor">
                  <NumericInput
                    min={0}
                    max={4000}
                    value={this.state.CalculationCPHValue}
                    className="form-control p-DoTheCalculationValue"
                    placeholder=""
                    onChange={this.handleCalculationCPHChange}
                    noStyle
                  />
                </h4>
              </div>
            </div>

            <div className="row align-items-center mb-3">
              <div className="col-md-10">
                <strong>Cost of recruitment would go down</strong>
              </div>
              <div className="col-md-2 text-right">
                <h4 className="p-DoTheCalculation-GreenValue">
                  {this.state.currencyChange}
                  {Math.round(
                    this.state.CalculationCPHValue *
                      this.getCostPerHire()
                  )}
                </h4>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-md-10">
                <strong>Saving you</strong>
              </div>
              <div className="col-md-2 text-right">
                <h4 className="p-DoTheCalculation-GreenValue">
                  {this.state.currencyChange}
                  {Math.round(
                    this.state.CostPerHireValues *
                      this.getCostPerHire() -
                      this.state.CalculationCPHValue *
                        this.getCostPerHire()
                  )}
                </h4>
              </div>
            </div>
          </div>

          {/* Start of second calculation textbox */}

          <div className="container-fluid bg-content p-4 mt-3 mb-3">
            <div className="row align-items-center mb-3">
              <div className="col-md-7">
                <strong>If you could reduce ONBOARDING time this much </strong>
              </div>
              <div className="col-md-3">
                <ExCalculationOnboardingSlider setCalculationOnboardingValue={this.handleCalculationOnboardingChange} />
              </div>
              <div className="col-md-2 text-right p-DoTheCaluculation-InputColor">
                <h4>
                  <b>
                    <NumericInput
                      min={0}
                      max={31}
                      value={this.state.CalculationOnboardingValue}
                      className="form-control p-DoTheCalculationValue"
                      placeholder=""
                      onChange={this.handleCalculationOnboardingChange}
                      noStyle
                    />
                  </b>
                </h4>
              </div>
            </div>

            <div className="row align-items-center mb-3">
              <div className="col-md-10">
                <strong>Cost of ONBOARDING will go down to</strong>
              </div>
              <div className="col-md-2 text-right">
                <h4 className="p-DoTheCalculation-GreenValue">
                  {this.state.currencyChange}
                  {Math.round(
                    (this.state.PayValue / this.state.FullProductionCost) *
                      this.state.CalculationOnboardingValue *
                      this.getCostPerHire()
                  )}
                </h4>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-md-10">
                <strong>Saving you</strong>
              </div>
              <div className="col-md-2 text-right">
                <h4 className="p-DoTheCalculation-GreenValue">
                  {this.state.currencyChange}
                  {Math.round(
                    (this.state.PayValue / 240) *
                      this.state.OnboardingTimeValue *
                      this.getCostPerHire() -
                      (this.state.PayValue / this.state.FullProductionCost) *
                        this.state.CalculationOnboardingValue *
                        this.getCostPerHire()
                  )}
                </h4>
              </div>
            </div>
          </div>

          {/* Start of third calculation textbox */}

          <div className="container-fluid bg-content p-4 mt-3 mb-3">
            <div className="row align-items-center mb-3">
              <div className="col-sm-12 col-md-7">
                <strong>If you could reduce ATTRITION to this much </strong>
              </div>
              <div className="col-sm-12 col-md-3">
                <ExCalculationAttritionSlider setCalculationAttritionValue={this.handleCalculationAttritionChange} />
              </div>
              <div className="col-sm-12 col-md-2 text-right">
                <h4 className="p-DoTheCaluculation-InputColor">
                  <NumericInput
                    min={0}
                    max={100}
                    value={this.state.CalculationAttritionValue}
                    className="form-control p-DoTheCalculationValue"
                    placeholder=""
                    format={this.growFormat}
                    onChange={this.handleCalculationAttritionChange}
                    noStyle
                  />
                </h4>
              </div>
            </div>

            <div className="row align-items-center mb-3">
              <div className="col-sm-12 col-md-10">
                <strong>Cost of ATTRITION will go down to</strong>
              </div>
              <div className="col-sm-12 col-md-2 text-right">
                <h4 className="p-DoTheCalculation-GreenValue">
                  {this.state.currencyChange}
                  {Math.round(this.state.PayValue * ((this.state.SizeValue / 100) * this.state.CalculationAttritionValue))}
                </h4>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-md-10">
                <strong>Saving you</strong>
              </div>
              <div className="col-md-2 text-right">
                <h4 className="p-DoTheCalculation-GreenValue">
                  {this.state.currencyChange}
                  {Math.round(this.state.PayValue * ((this.state.SizeValue / 100) * this.state.AttritionValue)) -
                    this.state.PayValue * ((this.state.SizeValue / 100) * this.state.CalculationAttritionValue)}
                </h4>
              </div>
            </div>
          </div>

          <p className="calculated-CPH">Calculated as CPH x (Total new Hires)</p>
        </div>

        {/* End of third calculation textbox */}

        {/* start of business impact */}

        <div className="container-fluid div-business-impact">
          <div className="div-total-business-impact" ref={this.refTotalBusinessImpact}>
            <b className="div-total-business-impact-title">Your total BUSINESS IMPACT</b>
          </div>

          <div className="div-business-impact-box">
            <ExChartTotalBusinessImpact chartBusinessData={this.state.chartBusinessData} />
          </div>
        </div>
      </div>
    );
  }
}

export default Excards;
