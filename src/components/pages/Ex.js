import React, { Component } from 'react';
import Card from '../cards/Cards';
import ExCard from '../cards/excards/exCards';


class Ex extends Component {
  render() {
    return (
        <div>
          <h2>Ex</h2>
          <Card />
          <ExCard />
        </div>
    );
  }
}

export default Ex;