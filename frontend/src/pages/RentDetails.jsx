import React, { useRef, useState, useEffect, useContext } from "react";
import "../styles/rent-details.css";
import ContactOwner from "../components/Contact-Owner/ContactOwner";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";

//images
import CityImg from "../assets/images/city.png";
import BedImg from "../assets/images/bed.png";
import BathImg from "../assets/images/bathtub.png";
import BuildingImg from "../assets/images/building.png";
import AreaImg from "../assets/images/area.png";
import AvailableForImg from "../assets/images/group.png";
import loadingGif from "../assets/images/loading.gif";

import useFetch from "./../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { IMAGE_BASE_URL } from "../utils/config";
import { AuthContext } from "./../context/AuthContext";

const RentDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [rentRating, setRentRating] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // fetch data from database
  const { data: rent, loading, error } = useFetch(`${BASE_URL}/rents/${id}`);

  //destructure properties from rent object
  const {
    currentOwner,
    desc,
    price,
    reviews,
    city,
    state,
    address,
    bed,
    bath,
    area,
    availableFor,
    propertyType,
    photo,
  } = rent;

  //for images to click and show
  const [previewImg, setPreviewImg] = useState(rent.photo);

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  //format date
  const options = { day: "numeric", month: "long", year: "numeric" };

  //submit request to server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert("Please Sign In");
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: rentRating,
      };

      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }

      alert(result.message);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (photo && photo.length > 0) {
      setPreviewImg(`${IMAGE_BASE_URL}${photo[0]}`);
    }
  }, [photo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [rent]);

  // for popup contact owner details
  const [popup, setPopup] = useState(false);

  const togglePopup = () => {
    setPopup(!popup);
  };

  const handleToggle = async (e) => {
    e.preventDefault();
    if (!user || user === undefined || user === null) {
      alert("Please Sign In");
      return navigate("/login");
    }
    togglePopup();
  };

  if (popup) {
    document.body.classList.add("active-popup");
  } else {
    document.body.classList.remove("active-popup");
  }

  return (
    <>
      <section>
        <Container>
          {loading && (
            <>
              <img src={loadingGif} className="loading" alt="loading..." />
              <h4 className="text-center pt-5">Loading.....Please Wait</h4>
            </>
          )}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="rent__content">
                  <img src={previewImg} alt="original" />
                  {photo && photo.length > 0 && (
                    <Col lg="5" md="2">
                      <div className="rent__images d-flex gap-3">
                        {photo.map((img, index) => (
                          <div
                            key={index}
                            className="img__item"
                            onClick={() =>
                              setPreviewImg(`${IMAGE_BASE_URL}${img}`)
                            }
                          >
                            <img
                              src={`${IMAGE_BASE_URL}${img}`}
                              alt={`rent-preview-${index}`}
                              className="secondary-rent__images"
                            />
                          </div>
                        ))}
                      </div>
                    </Col>
                  )}

                  <div className="rent__info">
                    <h2>
                      {bed} BHK House For rent in {city}, {state}
                    </h2>
                    <div className="price__tag">
                      <h5>
                        <span>{"\u20B9 "}</span>
                        {price}
                      </h5>
                    </div>

                    <div className="rent-detail-rating__container d-flex gap-3">
                      <span className="rent-detail__rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "#D5AB55" }}
                        ></i>{" "}
                        {avgRating === 0 ? null : avgRating}{" "}
                        {totalRating === 0 ? (
                          "Not Rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span className="d-flex align-items-center gap-1">
                        <i className="ri-map-pin-line"></i> Address - {address},{" "}
                        {city}, {state}
                      </span>
                    </div>

                    <div className="view-contact__button align-items-center">
                      <button
                        onClick={handleToggle}
                        className="view_contact__btn"
                      >
                        View Contact
                      </button>
                    </div>

                    {popup && (
                      <div className="popup">
                        <div onClick={togglePopup} className="overlay"></div>
                        <div className="popup-content">
                          <div className="owner-details__container">
                            <h3>Owner Details</h3>
                            <img src={avatar} alt="" />
                            <p>Name : {currentOwner?.username}</p>
                            <p>Email : {currentOwner?.email}</p>
                          </div>
                          <div className="close-btn">
                            <button
                              className="close-popup"
                              onClick={togglePopup}
                            >
                              OK
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="rent-detail__heading">
                      <h5>Overview</h5>
                    </div>
                    <div className="rent__extra-details">
                      <span>
                        <img className="icons" src={CityImg} alt="city-img" />
                        <p>{city}</p>
                      </span>
                      <hr />
                      <span>
                        <img className="icons" src={BedImg} alt="bed-img" />{" "}
                        <p>{bed} bedroom</p>
                      </span>
                    </div>

                    <div className="rent__extra-details">
                      <span>
                        <img className="icons" src={BathImg} alt="bed-img" />{" "}
                        <p>{bath} bathroom</p>
                      </span>
                      <hr />
                      <span>
                        <img
                          className="icons"
                          src={BuildingImg}
                          alt="bed-img"
                        />{" "}
                        <p>{propertyType}</p>
                      </span>
                    </div>

                    <div className="rent__extra-details">
                      <span>
                        <img className="icons" src={AreaImg} alt="bed-img" />{" "}
                        <p>{area} sq.ft.</p>
                      </span>
                      <hr />
                      <span>
                        <img
                          className="icons"
                          src={AvailableForImg}
                          alt="bed-img"
                        />{" "}
                        <p>Available for {availableFor}</p>
                      </span>
                    </div>
                    <div className="rent-detail__heading">
                      <h5>Description</h5>
                      <p>{desc}</p>
                    </div>
                  </div>

                  {/* --------- rent reviews section --------- */}
                  <div className="rent__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setRentRating(1)}>
                          1 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setRentRating(2)}>
                          2 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setRentRating(3)}>
                          3 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setRentRating(4)}>
                          4 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setRentRating(5)}>
                          5 <i className="ri-star-s-fill"></i>
                        </span>
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review) => (
                        <div className="review__item">
                          <img src={avatar} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString("en-US", options)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}{" "}
                                <i className="ri-star-s-fill"></i>
                              </span>
                            </div>

                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/* --------- rent reviews section end --------- */}
                </div>
              </Col>

              <Col lg="4" key={rent._id}>
                <ContactOwner rent={rent} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default RentDetails;
