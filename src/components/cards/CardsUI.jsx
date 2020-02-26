import React from 'react';
import img1 from '../assets/img/computer1.jpg';
import img2 from '../assets/img/computer2.jpg';

const Card = props => {
    return(
        <div className="card text-center">
            <div className="overflow">
                <img src={img1} alt='Image 1' />
            </div>
        </div>
    );
}

export default Card;