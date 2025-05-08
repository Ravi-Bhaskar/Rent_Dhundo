import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/rents.css";
import "../shared/rent-card.css";

import SearchBar from "../shared/Home SearchBar/SearchBar";
import RentsPageCard from "../shared/RentsPageCard";
import FilterImg from "../assets/images/filter.png";
import loadingGif from "../assets/images/loading.gif";

import { BASE_URL } from "../utils/config";

const Rents = () => {
  const [filters, setFilters] = useState({
    bed: null,
    bath: null,
    propertyType: "",
    priceMax: 100000,
  });

  const [page, setPage] = useState(0);
  const [rents, setRents] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false); // filter side panel

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Debounce Effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  useEffect(() => {
    const fetchRents = async () => {
      setLoading(true);
      setError("");

      try {
        let url = `${BASE_URL}/rents?page=${page}`;
        if (debouncedFilters.bed) url += `&bed=${debouncedFilters.bed}`;
        if (debouncedFilters.bath) url += `&bath=${debouncedFilters.bath}`;
        if (debouncedFilters.propertyType)
          url += `&propertyType=${debouncedFilters.propertyType}`;
        if (debouncedFilters.priceMax)
          url += `&priceMax=${debouncedFilters.priceMax}`;

        const response = await fetch(url);
        const result = await response.json();

        if (result.success) {
          setRents(result.data);
          setPageCount(Math.ceil(result.totalCount / 9));
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Something went wrong");
      }

      setLoading(false);
    };

    fetchRents();
    window.scrollTo(0, 0);
  }, [debouncedFilters, page]);

  const resetFilters = () => {
    setFilters({
      bed: null,
      bath: null,
      propertyType: "",
      priceMax: 100000,
    });
    setPage(0);
  };

  return (
    <>
      <div>
        {loading && (
          <>
            <img src={loadingGif} className="loading" alt="loading..." />
            <h4 className="text-center pt-5 mt-2 mb-4">
              Loading... Please Wait
            </h4>
          </>
        )}
        {error && <h4 className="text-center pt-5">{error}</h4>}

        {!loading && !error && (
          <div className="rent__section">
            {/* Side Panel */}
            {show && (
              <div className={`filter-panel__container ${show ? "" : "hide"}`}>
                <div className="cart__close">
                  <span>
                    <i
                      className="ri-close-fill"
                      onClick={() => setShow(false)}
                    ></i>
                  </span>
                </div>
                <div className="filter-panel__section">
                  <Container>
                    <button onClick={resetFilters}>Reset Filters</button>
                    <Row>
                      <SearchBar />
                    </Row>

                    <div className="filters">
                      {/* Bedrooms Filter */}
                      <div className="filter-group">
                        <h5>Bedrooms (BHK)</h5>
                        <div className="filter-buttons">
                          {[1, 2, 3, 4, 5, 6].map((bedroom) => (
                            <button
                              key={bedroom}
                              className={
                                filters.bed === bedroom ? "active-filter" : ""
                              }
                              onClick={() => {
                                setFilters((prev) => ({
                                  ...prev,
                                  bed: bedroom,
                                }));
                                setPage(0);
                              }}
                            >
                              BHK {bedroom}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Property Type Dropdown */}
                      <div className="filter-group mt-3">
                        <h5>Property Type</h5>
                        <select
                          value={filters.propertyType}
                          onChange={(e) => {
                            setFilters((prev) => ({
                              ...prev,
                              propertyType: e.target.value,
                            }));
                            setPage(0);
                          }}
                        >
                          <option value="">Select</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Villa House">Villa House</option>
                          <option value="Farm House">Farm House</option>
                          <option value="Row House">Row House</option>
                          <option value="Builder Floor">Builder Floor</option>
                          <option value="Studio">Studio</option>
                          <option value="Independent House">
                            Independent House
                          </option>
                        </select>
                      </div>

                      {/* Bathrooms Filter */}
                      <div className="filter-group mt-3">
                        <h5>Bathrooms</h5>
                        <div className="filter-buttons">
                          {[1, 2, 3, 4].map((bathroom) => (
                            <button
                              key={bathroom}
                              className={
                                filters.bath === bathroom ? "active-filter" : ""
                              }
                              onClick={() => {
                                setFilters((prev) => ({
                                  ...prev,
                                  bath: bathroom,
                                }));
                                setPage(0);
                              }}
                            >
                              {bathroom}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price Range Filter */}
                      <div className="filter-group mt-3">
                        <h5>Price Range</h5>
                        <input
                          type="range"
                          className="price-slider"
                          min="1000"
                          max="100000"
                          step="500"
                          value={filters.priceMax}
                          onChange={(e) => {
                            setFilters((prev) => ({
                              ...prev,
                              priceMax: e.target.value,
                            }));
                            setPage(0);
                          }}
                        />
                        <div className="price-labels">
                          <span>₹1K</span>
                          <span>₹1L</span>
                        </div>
                        <div className="current-price">
                          Selected: ₹{filters.priceMax}
                        </div>
                      </div>
                    </div>
                  </Container>
                </div>
              </div>
            )}

            {/* List Section */}
            <div className="rent-list__section">
              <Container>
                <Row>
                  <Col
                    lg="12"
                    className="mb-4 mt-3 d-flex align-items-center justify-content-between"
                  >
                    <h2 className="featured__rent-title">All Rents</h2>
                    <button
                      className="filter-btn"
                      onClick={() => setShow(!show)}
                    >
                      <img src={FilterImg} alt="" /> Filters
                    </button>
                  </Col>

                  {/* Rent Cards */}
                  {rents.map((rent) => (
                    <Col lg="4" md="6" sm="6" className="mb-4" key={rent._id}>
                      <RentsPageCard rent={rent} />
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>

            {/* Pagination */}
            <Container>
              <Row>
                <Col lg="12">
                  <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                    {[...Array(pageCount).keys()].map((number) => (
                      <span
                        key={number}
                        onClick={() => setPage(number)}
                        className={page === number ? "active__page" : ""}
                      >
                        {number + 1}
                      </span>
                    ))}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
    </>
  );
};

export default Rents;
