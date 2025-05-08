import React from 'react';
import RentStepCard from './RentStepCard';
import { Col } from 'reactstrap';

import locationImg from '../assets/images/map.png';
import propertyTypeImg from '../assets/images/property.png';
import bhkTypeImg from '../assets/images/bhk.png';
import priceRangeImg from '../assets/images/pricing.png';
import searchImg from '../assets/images/search-data.png';
import bookRentImg from '../assets/images/booking.png';

const rentStepData = [
    {
        imgUrl: locationImg,
        title: "Location",
        desc: "Enter the location where you want to find rent",
    },
    {
        imgUrl: searchImg,
        title: "Search",
        desc: "Click on search icon to search rent",
    },
    {
        imgUrl: propertyTypeImg,
        title: "Property Type",
        desc: "Select the different property type",
    },
    {
        imgUrl: bhkTypeImg,
        title: "BHK Type",
        desc: "Select the different BHK type",
    },
    {
        imgUrl: priceRangeImg,
        title: "Price Range",
        desc: "Select the different price range",
    },
    {
        imgUrl: bookRentImg,
        title: "Book Rent",
        desc: "Easy Contact to Rent Owner for booking rent",
    },
]

const RentStepList = () => {
  return (
    <>
    {
        rentStepData.map((item,index)=> <Col key={index}>
            <RentStepCard item={item}/>
        </Col>)
    }
    </>
  )
};

export default RentStepList;