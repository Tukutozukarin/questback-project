import React, { Component } from 'react';
import ExCard from '../cards/excards/exCards';

class Ex extends Component {

  render() {
    return (
        <div>
          {/* The site will be found at excards folder */}
          <ExCard />
        </div>
    );
  }
}

export default Ex;