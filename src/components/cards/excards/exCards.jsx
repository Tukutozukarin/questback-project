import React, { Component } from 'react';
import classnames from 'classnames';
import { renderToString } from 'react-dom/server';
// props import to refactor the code UI
import Excard from './exUI/exCardsUI';
import ExUsingQuesback from './exUI/exUsingQuestback';
import ExWhyTheNumbers from './exUI/exWhyTheNumbers';

// chart component that can be changed in chart folder
import ExChartTheImpact from '../../chart/exchart/excharttheimpact';
import ExChartTotalBusinessImpact from '../../chart/exchart/excharttotalbusinessimpact';


// Range sliders import from rangeslide folder
import ExSizeSlider from '../../rangeslider/exslider/exSizeSlider';
import ExGrowRateSlider from '../../rangeslider/exslider/exGrowRateSlider';
import ExAttritionSlider from '../../rangeslider/exslider/exAttritionSlider';
import ExPaySlider from '../../rangeslider/exslider/exPaySlider';
import ExCostPerHireSlider from '../../rangeslider/exslider/exCostPerHireSlider';
import ExOnboardingSlider from '../../rangeslider/exslider/exOnboardingSlider';
import ExCalculationCPHSlider from '../../rangeslider/exslider/dothecalculation-exslider/exCalculationCPHSlider';
import ExCalculationOnboardingSlider from '../../rangeslider/exslider/dothecalculation-exslider/exCalculationOnboardingSlider';
import ExCalculationAttritionSlider from '../../rangeslider/exslider/dothecalculation-exslider/exCalculationAttritionSlider';

// Input numeric 
import NumericInput from 'react-numeric-input';
// Formating numbers for values such as "0.0"
import Numeral from 'numeral';

// pdf renderer modules
import jsPDF from 'jspdf';
import { Page, View, Document, StyleSheet } from '@react-pdf/renderer';
import pdfTemplate from '../../assets/img/questback_protoTemplate.png';
// css
import './excard-style.css';

class Excards extends Component {
  /* Navigating though divs for sidebar  */
  refROIDashboard = React.createRef();
  refAboutYourCompany = React.createRef();
  refWhyTheNumbers = React.createRef();
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

    // Smooth scroll for the sidebar navigation
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
      // Calculation values for the impact
      SizeValue: 0,
      GrowValue: 0,
      AttritionValue: 0,
      PayValue: 0,
      CostPerHireValues: 0,
      OnboardingTimeValue: 0,

      // Do the calculation values t
      CalculationCPHValue: 0,
      CalculationOnboardingValue: 0,
      CalculationAttritionValue: 0,
      FullProductionCost: 240,

      // Chart values
      chartData: {},
      chartDataYear2: 2,
      chartDataYear3: 3,
      chartBusinessData: {},
      chartBusinessDataYear2: 2,
      chartBusinessDataYear3: 3,

      calculateSizeValue: true,

      includeExcludeSize: true,
      includeExcludeGrow: true,
      includeExcludeAttrition: true,
      includeExcludePay: true,
      includeExcludeCostPerHire: true,
      includeExcludeOnboarding: true,

      currencyText: 'GBP',
      currencyChange: '￡',

      time: new Date(),
    };
  }

  // get chart data from excharttheimpact file 
  // More configuration settings will be in the file mentioned earlier
  // Data: Calculation from the impact values 
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
                  (state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    (state.PayValue / state.FullProductionCost) *
                    state.OnboardingTimeValue *
                    ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.PayValue * ((state.SizeValue / 100) * state.AttritionValue)) * state.chartDataYear2
                ),
                Math.round(
                  (state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    (state.PayValue / state.FullProductionCost) *
                    state.OnboardingTimeValue *
                    ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.PayValue * ((state.SizeValue / 100) * state.AttritionValue)) * state.chartDataYear3
                ),
              ],
              backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
            },
          ],
        },
      };
    });
  }

  // Chart for excharttotalbusinessimpact file
  // The calculation is based of the total calculation on total business impact
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
                Math.round(
                  state.PayValue * ((state.SizeValue / 100) * state.AttritionValue)) -
                state.PayValue * ((state.SizeValue / 100) * state.CalculationAttritionValue) +
                (state.PayValue / 240) *
                state.OnboardingTimeValue *
                ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                (state.PayValue / state.FullProductionCost) *
                state.CalculationOnboardingValue *
                ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                state.CalculationCPHValue * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue)
                ,

                Math.round(
                  ((state.PayValue * ((state.SizeValue / 100) * state.AttritionValue)) -
                    state.PayValue * ((state.SizeValue / 100) * state.CalculationAttritionValue) +
                    (state.PayValue / 240) *
                    state.OnboardingTimeValue *
                    ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                    (state.PayValue / state.FullProductionCost) *
                    state.CalculationOnboardingValue *
                    ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                    state.CalculationCPHValue * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue)) * state.chartBusinessDataYear2
                ),

                Math.round(
                  ((state.PayValue * ((state.SizeValue / 100) * state.AttritionValue)) -
                    state.PayValue * ((state.SizeValue / 100) * state.CalculationAttritionValue) +
                    (state.PayValue / 240) *
                    state.OnboardingTimeValue *
                    ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                    (state.PayValue / state.FullProductionCost) *
                    state.CalculationOnboardingValue *
                    ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) +
                    state.CostPerHireValues * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue) -
                    state.CalculationCPHValue * ((state.SizeValue / 100) * state.GrowValue + (state.SizeValue / 100) * state.AttritionValue)) * state.chartBusinessDataYear3
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

  // Handle the state of Size such as calculation from the impact
  // These will also update both charts everytime the chart updates
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

  /* Include/exclude functionanlities button */

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

  // changing the currency for the values, this will not convert from api
  // This will only change the state string
  currencyChangeToGBP = (e) => {
    e.preventDefault();
    this.setState({
      currencyChange: '£',
      currencyText: 'GBP',
    });
  };

  currencyChangeToUSD = (e) => {
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


  // format for some of the calculation for the impact
  growFormat(grow) {
    return grow + '%';
  }

  // calculation for values such as the total impact
  getCostPerHire = () => {
    return (this.state.SizeValue / 100) * this.state.GrowValue + (this.state.SizeValue / 100) * this.state.AttritionValue;
  };

  calculateTotalBusiness = () => {
    return Numeral(Math.round(this.state.PayValue * ((this.state.SizeValue / 100) * this.state.AttritionValue)) -
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
      this.getCostPerHire()).format('0,0')
  }

  calculateCostOfRecruitment = () => {
    return Numeral(Math.round(this.state.CostPerHireValues * this.getCostPerHire())).format('0,0');
  };

  calculateCostOfOnboarding = () => {
    return Numeral(Math.round((this.state.PayValue / 240) * this.state.OnboardingTimeValue * this.getCostPerHire())).format('0,0');
  }

  calculateCostOfAttrition = () => {
    return Numeral(Math.round(this.state.PayValue * ((this.state.SizeValue / 100) * this.state.AttritionValue))).format('0,0');
  }

  calculateTotalCostInOneYear = () => {
    return Numeral(Math.round(
      this.state.CostPerHireValues *
      (this.getCostPerHire()) +
      (this.state.PayValue / this.state.FullProductionCost) *
      this.state.OnboardingTimeValue *
      (this.getCostPerHire()) +
      this.state.PayValue * ((this.state.SizeValue / 100) * this.state.AttritionValue)
    )).format('0,0');
  }


  // Do the calculation 

  // Do the calculation textbox 1
  doThecalculationCostOfRecruitMentWouldGoDown = () => {
    return Numeral(Math.round(
      this.state.CalculationCPHValue *
      this.getCostPerHire())).format('0,0');
  }


  doTheCalculationCostOfRecuitmentSavingYou = () => {
    return Numeral(Math.round(
      this.state.CostPerHireValues *
      this.getCostPerHire() -
      this.state.CalculationCPHValue *
      this.getCostPerHire())).format('0,0');
  }

  // Do the Calculation textbox 2

  doTheCalculationCostOfOnboardingWillGoDown = () => {
    return Numeral(Math.round(
      (this.state.PayValue / this.state.FullProductionCost) *
      this.state.CalculationOnboardingValue *
      this.getCostPerHire())).format('0,0');
  }

  doTheCalculationCostOfOnboardingSavingYou = () => {
    return Numeral(Math.round(
      (this.state.PayValue / 240) *
      this.state.OnboardingTimeValue *
      this.getCostPerHire() -
      (this.state.PayValue / this.state.FullProductionCost) *
      this.state.CalculationOnboardingValue *
      this.getCostPerHire())).format('0,0');
  }

  // Do the calculation textbox 3

  doTheCalculationCostOfAttritionWouldGoDown = () => {
    return Numeral(Math.round(this.state.PayValue * ((this.state.SizeValue / 100) * this.state.CalculationAttritionValue))).format('0,0');
  }

  doTheCalculationCostOfAttritionSavingYou = () => {
    return Numeral(Math.round(this.state.PayValue * ((this.state.SizeValue / 100) * this.state.AttritionValue)) -
      this.state.PayValue * ((this.state.SizeValue / 100) * this.state.CalculationAttritionValue)).format('0,0');
  }

  render() {

    // Buttons that are used for include/excludde in addtition it uses css 
    // such as include and exclude which are customizedable
    let btn_includeSize = this.state.includeExcludeSize ? 'Include' : 'Exclude';
    let btn_includeGrow = this.state.includeExcludeGrow ? 'Include' : 'Exclude';
    let btn_includeAttrition = this.state.includeExcludeAttrition ? 'Include' : 'Exclude';
    let btn_includePay = this.state.includeExcludePay ? 'Include' : 'Exclude';
    let btn_includeCostPerHire = this.state.includeExcludeCostPerHire ? 'Include' : 'Exclude';
    let btn_includeOnboarding = this.state.includeExcludeOnboarding ? 'Include' : 'Exclude';

    // Other ways to add date and time in real time
    // this.state.time.toLocalTimeString(), toLocalDateString() and if you want both its toLocalString
    // the text values in pdf. The first one means vertical positioning and second value is horizontal positioning
    // This is the outpu of the pdf renderer
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
      pdf.text(`${Numeral(Math.round((this.state.SizeValue + this.state.GrowValue))).format('0,0')}`, 148, 53);

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

    // Styling for pdf
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

    // Just a blank template, it does not do much
    // const print relay on this function
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
        {/* top nav bar  */}
        <nav
          className={classnames('top-navbar navbar', {
            'navbar--hidden': !this.state.visible,
          })}
        >
          {/* Dropdown for product nav */}
          <div>
            <div class="dropdown">
              <button class="dropdown__btn dropdown__btn--left">Product</button>
              <button class="dropdown__btn dropdown__btn--right">Ex</button>

              <div class="dropdown-content dropdown-product">
                <a href="#">MR</a>
                <a href="/ex">EX</a>
                <a href="#">CX</a>
              </div>
            </div>

            {/* Dropdown for currency nav*/}
            <div class="dropdown">
              <button class="dropdown__btn dropdown__btn--left">CURRENCY</button>
              <button class="dropdown__btn dropdown__btn--right">{this.state.currencyText}</button>
              <div class="dropdown-content dropdown-currency">
                <a href="#" onClick={this.currencyChangeToGBP}>
                  GBP
              </a>
                <a href="#" onClick={this.currencyChangeToNok}>
                  Nok
              </a>
                <a href="#" onClick={this.currencyChangeToEuro}>
                  EURO
              </a>
                <a href="#" onClick={this.currencyChangeToUSD}>
                  USD
              </a>
              </div>
            </div>
          </div>


          {/* Customer dropdown functionality that hasnt been worked on */}
          {/* 
          <div class="dropdown">
            <button class="dropdown__btn dropdown__btn--left">CUSTOMER</button>
            <button class="dropdown__btn dropdown__btn--right">OLD</button>
            <div class="dropdown-content">
              <a href="#">NEW</a>
              <a href="#">OLD</a>
            </div>
          </div>
          */}
        </nav>

        {/* Sidebar navigation scroll start 
             How it works is that when you click on one of the text,
              it will smooth scroll automatically to a certain div. 
                to add a certein scrolling you will need to make a ref etc  refROIDashboard = React.createRef();
                 then you have to create on ref for the text you want it to smooth scroll as u can see below.
              to add a destination how far the scroll will go write this beside the class name of the div etc ref={this.refROIDashboard}
        */}
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
                this.handleScrollTo(this.refWhyTheNumbers);
              }}
            >
              Why the numbers
            </li>
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

        {/* Sidebar navigation scroll end */}

        {/* PDF button start */}
        <div className="container-fluid pdfbtn-sidebar">
          <button className="PDF-btn" onClick={print}>
            PDF
          </button>
        </div>

        {/* PDF button end */}

        {/* ROI Dashboard total business sum start */}
        <div className="bg-content mt-4 mb-5" ref={this.refROIDashboard}>
          <div className="container d-flex justify-content-between">
            <p className="p-result">ROI Dashboard | Total Business:</p>

            <p className="sum">
              {this.state.currencyChange}{' '}
              {this.calculateTotalBusiness()}
            </p>
          </div>
        </div>

        {/* ROI Dashboard total business sum end */}

        {/* Select a section div start */}
        <div className="container bg-content mt-4 mb-4 p-4" ref={this.refAboutYourCompany}>
          <h3>Select a section below to review your ROI{'\n'}</h3>
          <p>
            To calculate your return of investment, begin with the first section below. The information entered automatically populate corresponding
            fields in the other sections. You will be able to move from section to section to add/or adjust value to reflect your organization and
            process. To return to this screen, click on the ROI Dashboard button to the left.
          </p>
        </div>
        {/* Select a section div end */}

        {/*  Ex cards calculation with props from exCardsUI start*/}
        {/* row one start */}
        <div className="container-fluid mb-4" ref={this.refTheImpact}>
          <div className="row">
            <div className="col-xs-12 col-lg-7">
              <div className="row">
                <div className="col-xs-12 col-xl-4 mb-4">
                  {/* These props from Excard can be found in exCardsUI */}
                  <Excard title="Size" description="How many employees do you have">
                    <p className="p-SizeValue">
                      {/* Customizedable numeric imput, more can be found in numericInput documentation */}
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
                  <Excard title="Grow rate" description="By what % does your organization grow per year?">
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
                  <Excard title="Attrition" description="What % of your organization leave per year?">
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



          </div>

          {/* row two end */}
        </div>

        {/* Second row for excard calculation start */}

        <div className="container-fluid mb-4">
          <div className="row">
            <div className="col-xs-12 col-lg-7">
              <div className="row">
                <div className="col-xs-12 col-xl-4 mb-4">
                  <Excard title="Salary in your company" description="What is the average fully loaded annual salary in your company?">
                    <p className="p-PayValue">
                      <NumericInput
                        min={0}
                        max={200000}
                        value={(this.state.PayValue)}
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

                <div className="col-xs-12 col-xl-4 mb-4">
                  <Excard
                    title="Cost per hire (CPH)"
                    description="Consider job boards, consultants, background - Checks, marketing"
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

                <div className="col-xs-12 col-xl-4 mb-4">
                  <Excard
                    title="Onboarding time (in days)"
                    description="How long does it take for employees. To be fully productive?"
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
              </div>
            </div>

          </div>

          {/* second row end */}
        </div>

        {/* Third row chart and total the impact */}


        <div className="container-fluid mb-8">
          <div className="row">
     
              <div className="col-lg-4 col-md-6">
              <div className="card shadow">
                <div className="card-body">
                    {/* Added chart in the div, this is the the impact chart */}
                    <ExChartTheImpact chartData={this.state.chartData} legendPositiont="top" location="EX" />
              </div>
            </div>
              
              </div>
        
       

            <div className="col-lg-4 col-md-6">
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
                      {Numeral(Math.round(this.getCostPerHire())).format('0,0')}
                    </b>
                    <hr className="hr-total-new-hires" />

                    <p className="the-impact-cost-of-recruitmet-text">
                      <b>Cost of Recruitment</b>
                    </p>
                    <b className="the-impact-cost-of-recruitmet-number p-TheImpact-GreenValue">
                      {this.state.currencyChange} {this.calculateCostOfRecruitment()}
                    </b>

                    <p className="the-impact-productivity-cost-text">
                      <b>Cost of Onboarding</b>
                    </p>
                    <b className="the-impact-productivity-cost-number p-TheImpact-GreenValue">
                      {this.state.currencyChange}{' '}
                      {this.calculateCostOfOnboarding()}{' '}
                    </b>

                    <p className="the-impact-cost-of-attrition-text">
                      <b>Cost of Attrition</b>
                    </p>
                    <b className="the-impact-cost-of-attrition-number p-TheImpact-GreenValue">
                      {this.state.currencyChange} {this.calculateCostOfAttrition()}
                    </b>

                    <hr className="hr-cost-of-attrition" />

                    <p className="the-impact-total-cost-text">
                      <b>Total cost in one year</b>
                    </p>
                    <b className="the-impact-total-cost-number p-TheImpact-GreenValue">
                      {this.state.currencyChange}
                      {this.calculateTotalCostInOneYear()}
                    </b>
                  </div>
                </div>
              </div>
            </div>

          </div>
          </div>


        

    


        {/* Why the numbers div start*/}
        <div className="container mt-5 mb-8" ref={this.refWhyTheNumbers}>
            
            {/* Props text for exWhytheNumers file */}
            <ExWhyTheNumbers 
              title="Why the numbers"
              firstDescription="   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum."
              secondDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum."
              ahrefText="Read More"
            />

          </div>
     

        {/* why the numbers div end */}

        {/* Using Questback div start */}
        {/* The ref will refer the smooth scroll link to what if, in sidebar */}
        <div className="bg-content pt-5 pb-5 mt-5 mb-5" ref={this.refUsingQuestback}>
          <ExUsingQuesback
            title="Using Questback"
            headline="This is what you could save by using Questback tools. All the calculation is based on articles and by customer."
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum."
            ahrefText="Read More"
          />
        </div>
        {/* Using Questback div end */}

        {/* First calculation that calculates the total business impact */}
        <div className="container mt-5 mb-5">
          <h3>Do the calculation</h3>
          <hr />
          <div className="container-fluid bg-content p-4">
            <div className="row align-items-center mb-3">
              <div className="col-md-7">
                <strong> If you could reduce CPH to this much</strong>
              </div>
              <div className="col-md-3">
                {/* range slider, check the import for the specific file */}
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
                  {this.doThecalculationCostOfRecruitMentWouldGoDown()
                  }
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
                  {this.doTheCalculationCostOfRecuitmentSavingYou()
                  }
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
                  {this.doTheCalculationCostOfOnboardingWillGoDown()}
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
                  {this.doTheCalculationCostOfOnboardingSavingYou()
                  }
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
                  {this.doTheCalculationCostOfAttritionWouldGoDown()}
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
                  {this.doTheCalculationCostOfAttritionSavingYou()}
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
            {/* Total business impact chart */}
            <ExChartTotalBusinessImpact chartBusinessData={this.state.chartBusinessData} />
          </div>
        </div>
        {/* End of Business impact */}
      </div>
    );
  }
}

export default Excards;
