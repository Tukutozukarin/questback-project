import React from 'react';
import '../excard-style.css'

const ExWhyTheNumbers = props => {
    return (
      
        <div className="col-md-8">
                <h3>{props.title}</h3>
          <hr />
        <p>
            {props.firstDescription}
        </p>

        <hr className="hr-below-whythenumbers" />

        <p>
            {props.secondDescription}
        </p>
        <p>
          <a className="a-read-more" href="https://www.questback.com/no/" target="blank">
            {props.ahrefText} &#8594;
      </a>{' '}
        </p>
      </div>
    );
}

export default ExWhyTheNumbers;