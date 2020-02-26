import React, { Component } from 'react';
import Card from './CardsUI';

import computer1 from '../assets/img/computer1.jpg';
import computer2 from '../assets/img/computer2.jpg';


class Cards extends Component {
    render() {
        return (
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-4">
                        <Card imgsrc={computer1} title="Console"/>
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={computer2} title="Test"/>
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={computer1} title="Computer"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cards;
