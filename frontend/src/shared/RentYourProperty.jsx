import React from "react";
import "./rent-your-property.css";
import { Link } from "react-router-dom";
import imgRentYourProperty from "../assets/images/rent-your-house.png";

const RentYourProperty = () => {
  return (
    <>
      <div className="rent-your-property__section d-flex align-items-center">
        <div className="rent-your-property__section-2">
          <h5 className="rent-your-property__subtitle align-items-center">
            Rent Your Property
          </h5>
          <h4 className="rent-your-property__title">
            Are you a Property Owner?
          </h4>
          <h2 className="rent-your-property__title">
            Looking for tenants/ buyers for your property?
          </h2>
          <button className="rent-your-property__btn">
            <Link to="/rent-property">Post Your Property</Link>
          </button>
        </div>
        <div className="rent_your_house">
          <img src={imgRentYourProperty} alt="" />
        </div>
      </div>
    </>
  );
};

export default RentYourProperty;
