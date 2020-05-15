import React from 'react';
import '../excard-style.css'

const ExWhyTheNumbers = props => {
  return (

    <div className="col-md-12">
      
      <h3>{props.title}</h3>
      <hr />
      <div className="col-sm-5 float-right">
          <img className="img" alt="" src={props.image}/>
          </div>
      <p>
        {props.firstDescription}
      </p>

      <hr className="hr-below-whythenumbers" width="60%" align="left"/>

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