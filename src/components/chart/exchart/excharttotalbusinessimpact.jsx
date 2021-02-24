import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

class exChartTotalBusinessImpact extends Component {
    refChartBusiness = {};

    constructor(props) {
        super(props);
        this.state = {
            chartBusinessData: props.chartBusinessData
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: ''
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.chartBusinessData !== this.state.chartBusinessData) {
          this.setState({ chartBusinessData: nextProps.chartBusinessData });
        }
      }

    render() {
        return (
            <div className="chart">
                <HorizontalBar
                    data={this.state.chartBusinessData}
                    ref={(referense) => this.refChartBusiness = referense}
                    width={100}
                    height={50}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Your total BUSINESS IMPACT would be ' + this.props.location,
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                    }}
                />
            </div>
        )
    }
}

export default exChartTotalBusinessImpact;
