import React from 'react';
import './excard-style.css';

const Excard = props => {
    return (
        <div className="card text-center shadow">
            <div className="overflow">
                {/* <img src={props.imgsrc} alt='Image 1' className="card-img-top" /> */}

            </div>
            <div className="card-body text-dark">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text text-secondary">
                    {props.description}
                </p>
            </div>

        
        </div>
    );
}

export default Excard;