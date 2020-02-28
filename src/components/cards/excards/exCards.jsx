import React, { Component } from 'react';
import Excard from './exCardsUI';

import computer1 from '../../assets/img/computer1.jpg';
import computer2 from '../../assets/img/computer2.jpg';


class Excards extends Component {
    render() {
        return (
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-4">
                        <Excard imgsrc={computer1} title="Console" ahref="/mr" hrefTitle="Management" />
                    </div>
                    <div className="col-md-4">
                        <Excard imgsrc={computer2} title="Test" ahref="/ex" hrefTitle="Employee"/>
                    </div>
                    <div className="col-md-4">
                        <Excard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>

                    <div className="col-md-4">
                        <Excard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>

                    <div className="col-md-4">
                        <Excard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>
                    <div className="col-md-4">
                        <Excard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>
                    <div className="col-md-4">
                        <Excard imgsrc={computer1} title="Computer" ahref="/cx" hrefTitle="test"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Excards;
