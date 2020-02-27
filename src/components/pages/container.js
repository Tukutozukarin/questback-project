import React from 'react';
import { Switch, Route } from "react-router-dom";
import Ex from './Ex';
import Cx from './Cx';
import Mr from './Mr';
import Sidebar from '../sidenav/sidebar';


const items = [
    { name: 'Logo', label: 'Logo' },
    {
      name: 'roiCalculator',
      label: 'ROI Calculator',
      items: [
        { name: 'dashboard', label: 'Dashboard'},
        { name: 'hiddenTransaction', label: 'Hidden Transaction Fees' },
        { name: 'internalProductivity', label: 'Internal Productivity and Labor Savings' },
        { name: 'internationalRevenue', label: 'International Revenue'},
        { name: 'summary', label: 'Summary'},
      ],
    },
    { name: '', label: '' },
    { name: '', label: '' },
    { name: 'mr', label: 'MR' },
    { name: 'ex', label: 'EX', path: '/ex', exact: true, sidebar: () => <div>home</div>},
    { name: 'cx', label: 'CX' },
    {
    },
  ]

  function Container() {
      return (
    <div>

       <Sidebar items={items}/>
        <Switch>
          <Route exact path="/" component={Ex} />
          <Route path="/mr" component={Mr} />
          <Route path="/cx" component={Cx} />
        </Switch>
    </div>
      )
  }

  export default Container; 