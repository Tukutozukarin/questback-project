import React from 'react';
import './excard-style.css';
import RangeEx from '../../rangeslider/RangeEx';

const Excard = props => {
    return (
        <div className="card text-center shadow">
            <div className="overflow">
                {/* <img src={props.imgsrc} alt='Image 1' className="card-img-top" /> */}

            </div>
            <div className="card-body text-dark">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text text-secondary">
                    lorem ipsum
                </p>
            </div>

            <div className="overflow">
                {/* Still under testing in regards to min and max props values */}
                <RangeEx min={props.minimumValues} max={props.maximumValue} />
                <p></p>
                <a href={props.ahref} className="btn btn-outline-success">{props.hrefTitle}</a>
                <p></p>
            </div>
        
        
        </div>
    );
}

export default Excard;