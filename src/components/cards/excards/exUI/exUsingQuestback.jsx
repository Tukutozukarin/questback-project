import React from 'react';
import '../excard-style.css'

const ExUsingQuesback = props => {
    return (
      
        <div className="container">
        <h3>{props.title}</h3>
          <hr />
          <p>
            <b>{props.headline}</b>
          </p>
          <p>
                {props.description}
          </p>
          <p>
            <a class="a-read-more" href="https://www.questback.com/no/" target="blank">
              {props.ahrefText} &#8594;
            </a>{' '}
          </p>
        </div>
    );
}

export default ExUsingQuesback;