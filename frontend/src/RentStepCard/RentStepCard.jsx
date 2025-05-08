import React from 'react';
import './rent-step-card.css';

const RentStepCard = ({item}) => {

    const {imgUrl, title, desc} = item;
  return (
    <div className="rent_step__item">
        <div className="rent_step__img">
            <img src={imgUrl} alt="" />
        </div>
        <h5>{title}</h5>
        <p>{desc}</p>
    </div>
  );
};

export default RentStepCard;