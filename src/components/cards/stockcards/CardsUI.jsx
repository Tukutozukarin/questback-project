import React from 'react';
import img1 from '../assets/img/computer1.jpg';
import img2 from '../assets/img/computer2.jpg';
import './card-style.css';

const Card = props => {
    return(
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.imgsrc} alt='Image 1' className="card-img-top" />
            </div>
            <div className="card-body text-dark">
    <h4 className="card-title">{props.title}</h4>
                <p className="card-text text-secondary">
                    lorem ipsum
                </p>
                <a href="#" className="btn btn-outline-success">Go anywhere</a>
            </div>
        </div>
    );
}

export default Card;