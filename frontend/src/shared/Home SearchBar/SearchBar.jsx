import React, { useRef } from "react";
import "./search-bar.css";
import { FormGroup } from "reactstrap";

import { BASE_URL } from "./../../utils/config";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const locationRef = useRef("");
  const navigate = useNavigate();

  const SearchHandler = async () => {
    const location = locationRef.current.value;

    if (location === "") {
      return alert("All fields are required!");
    }

    const res = await fetch(
      `${BASE_URL}/rents/search/getRentBySearch?city=${location}`
    );

    if (!res.ok) alert("Something went wrong");

    const result = await res.json();

    navigate(`/rents/search?city=${location}`, { state: result.data });
  };

  return (
    <>
      <div className="search__container">
        <div className="home-search__bar">
          <FormGroup className="d-flex gap-3 mt-3 home-form__group home-form__group-fast">
            <span>
              <i className="ri-map-pin-fill"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Search City/Street"
                ref={locationRef}
              />
            </div>
          </FormGroup>
          <div className="search-icon__container">
            <span
              className="home-search__icon"
              type="submit"
              onClick={SearchHandler}
            >
              <i className="ri-search-line"></i>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
