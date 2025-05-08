import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import API from '../../utils/api';
import { IMAGE_BASE_URL } from '../../utils/config';
import './MyPropertyDetails.css'; // 👈 Add custom styles here
import BathImg from "../../assets/images/bathtub.png";
import loadingGif from "../../assets/images/loading.gif";

const MyPropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [previewImg, setPreviewImg] = useState('');

  useEffect(() => {
    API.get(`/rents/view/${id}`).then(res => {
      setProperty(res.data);
      if (res.data.photo && res.data.photo.length > 0) {
        setPreviewImg(`${IMAGE_BASE_URL}${res.data.photo[0]}`);
      }
    });
  }, [id]);

  if (!property) return <>
              <img src={loadingGif} className="loading" alt="loading..." />
              <h4 className="text-center pt-5 mt-2 mb-4">
                Loading... Please Wait
              </h4>
            </>;

  const { photo, city, state, address, price, bed, bath, area, desc } = property;

  return (
    <Container className="property-details">
      <h2 className="title"><i className="ri-map-pin-line"></i> {city}, {state}</h2>
      <Row>
        <Col md={6}>
          {previewImg && (
            <div className="main-image-wrapper">
              <Image src={previewImg} className="main-image" />
            </div>
          )}
          <div className="thumbnail-wrapper">
            {photo.map((img, index) => (
              <Image
                key={index}
                src={`${IMAGE_BASE_URL}${img}`}
                className="thumbnail"
                onClick={() => setPreviewImg(`${IMAGE_BASE_URL}${img}`)}
              />
            ))}
          </div>
        </Col>
        <Col md={6}>
          <div className="details-card">
            <h5>Property Details:</h5>
            <div><strong><i className="ri-map-pin-range-fill"></i> Address:</strong> {address}</div>
            <div><strong><i className="ri-price-tag-3-fill"></i> Price:</strong> ₹{price}</div>
            <div><strong><i className="ri-hotel-bed-fill"></i> Bedrooms:</strong> {bed}</div>
            <div><strong><img style={{width: "20px"}} src={BathImg} alt="bed-img" /> Bathrooms:</strong> {bath}</div>
            <div><strong><i class="ri-layout-masonry-fill"></i> Area:</strong> {area} sq ft</div>
            <div><strong><i class="ri-information-fill"></i> Description:</strong> {desc}</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyPropertyDetails;
