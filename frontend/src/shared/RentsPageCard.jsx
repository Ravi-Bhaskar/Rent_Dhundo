import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";

import BedImg from "../assets/images/bed.png";
import BathImg from "../assets/images/bathtub.png";
import BuildingImg from "../assets/images/building.png";
import { IMAGE_BASE_URL } from "../utils/config"

import "./rent-card.css";

const RentsPageCard = ({ rent }) => {
  const {
    _id,
    city,
    state,
    photo,
    price,
    featured,
    reviews,
    bed,
    bath,
    propertyType,
  } = rent;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <>
      <div className="rent__card">
        <Card>
          <div className="rent__img">
            <img src={`${IMAGE_BASE_URL}${photo[0]}`} alt="rent-img" />
            {/* src={`/rent-images/${photo01}`}   src={photo01} */}
            {featured && <span>Featured</span>}
          </div>
          <CardBody>
            <div className="card__top d-flex align-items-center justify-content-between">
              <span className="rent__location d-flex align-items-center gap-1">
                <i className="ri-map-pin-line"></i> {city}
              </span>
              <span className="rent__rating d-flex align-items-center gap-1">
                <i className="ri-star-fill"></i>{" "}
                {avgRating === 0 ? null : avgRating}{" "}
                {totalRating === 0 ? (
                  "Not Rated"
                ) : (
                  <span>({reviews.length})</span>
                )}
              </span>
            </div>

            <h5 className="rent__title">
              <Link to={`/rents/${_id}`}>
                {bed} BHK House For rent in {city}, {state}
              </Link>
            </h5>
            <div className="d-flex align-items-center justify-content-between">
              <span className="d-flex align-items-center gap-1">
                <img className="bed__icon" src={BedImg} alt="bed-img" /> {bed}
                <img className="bath__icon" src={BathImg} alt="bed-img" />{" "}
                {bath}
                <img
                  className="bath__icon"
                  src={BuildingImg}
                  alt="bed-img"
                />{" "}
                {propertyType}
              </span>
            </div>
            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
              <h5>
                <span>{"\u20B9 "}</span>
                {price} <span className="per__month"> /month</span>
              </h5>
            </div>

            <div className="d-flex gap-2 mt-2 align-items-center">
              <button className="btn booking__btn">
                <Link to={`/rents/${_id}`}>View Property</Link>
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default RentsPageCard;
