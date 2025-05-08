import React, { useState, useEffect, useMemo } from "react";
import { Container } from "reactstrap";
import CommonSection from "./../shared/common/CommonSection";
import { useLocation } from "react-router-dom";
import RentCard from "./../shared/RentCard";
import FilterPanel from "../components/FilterPanel/FilterPanel";

const SearchResultList = () => {
  const location = useLocation();
  const originalData = useMemo(() => {
    return location.state || [];
  }, [location.state]);

  const [filters, setFilters] = useState({
    bed: null,
    bath: null,
    propertyType: "",
    priceMax: 100000,
  });

  const [filteredData, setFilteredData] = useState(originalData);

  // Apply filter on originalData whenever filters change
  useEffect(() => {
    const results = originalData.filter((rent) => {
      const bedMatch = !filters.bed || rent.bed === filters.bed;
      const bathMatch = !filters.bath || rent.bath === filters.bath;
      const typeMatch =
        !filters.propertyType || rent.propertyType === filters.propertyType;
      const priceMatch = !filters.priceMax || rent.price <= filters.priceMax;

      return bedMatch && bathMatch && typeMatch && priceMatch;
    });

    setFilteredData(results);
  }, [filters, originalData]);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Paginated data for current page
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const resetFilters = () => {
    setFilters({
      bed: null,
      bath: null,
      propertyType: "",
      priceMax: 100000,
    });
  };

  return (
    <>
      <section>
        <Container className="search__result-container">

          <div className="d-flex justify-content-between">
          <CommonSection title={"Rent Search Result"} />
          {/* FILTER UI */}
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
          />
          </div>

          {/* RESULT LIST */}
          <div className="d-flex flex-wrap mt-4">
            <div className="row g-4">
              {paginatedData.length > 0 ? (
                paginatedData.map((rent) => (
                  <div key={rent._id} className="co-md-6 col-lg-4">
                    <RentCard rent={rent} />
                  </div>
                ))
              ) : (
                <h4 className="text-center">No properties found.</h4>
              )}
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center mt-5 gap-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <span className="fw-bold">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  className="btn btn-outline-secondary"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
        </Container>
      </section>
    </>
  );
};

export default SearchResultList;
