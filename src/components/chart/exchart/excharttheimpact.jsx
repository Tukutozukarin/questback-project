import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class exChartTheImpact extends Component {
    refChart = {};

    constructor(props) {
        super(props);
        this.state = {
            chartData: props.chartData
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: ''
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.chartData !== this.state.chartData) {
          this.setState({ chartData: nextProps.chartData });
        }
      }

    render() {
        return (
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    ref={(referense) => this.refChart = referense}
                    width={100}
                    height={50}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Largest Cost in ' + this.props.location,
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

export default exChartTheImpact;
