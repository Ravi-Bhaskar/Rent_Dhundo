// components/FilterPanel.jsx
import React, { useState } from "react";
import "./FilterPanel.css";

const FilterPanel = ({ filters, setFilters, resetFilters }) => {
  const [showFilter, setShowFilter] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === "" ? null : isNaN(value) ? value : Number(value),
    }));
  };

  return (
    <>
      <button
        className="filter-toggle-btn"
        onClick={() => setShowFilter(!showFilter)}
      >
        {showFilter ? "Close Filters" : "Open Filters"}
      </button>

      <div className={`filter-container ${showFilter ? "visible" : ""}`}>
        <button onClick={resetFilters} className="reset-btn">
          Reset Filters
        </button>

        <h5>Beds</h5>

        <input
          type="number"
          name="bed"
          placeholder="Beds eg. 2"
          value={filters.bed || ""}
          onChange={handleChange}
        />

        <h5>Bathrooms</h5>

        <input
          type="number"
          name="bath"
          placeholder="Baths eg. 1"
          value={filters.bath || ""}
          onChange={handleChange}
        />

        <h5>Property Type</h5>

        <select
          name="propertyType"
          value={filters.propertyType}
          onChange={handleChange}
        >
          <option value="">Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa House">Villa House</option>
          <option value="Farm House">Farm House</option>
          <option value="Row House">Row House</option>
          <option value="Builder Floor">Builder Floor</option>
          <option value="Studio">Studio</option>
          <option value="Independent House">Independent House</option>
        </select>

        <h5>Price Range</h5>

        <input
          type="range"
          name="priceMax"
          min="0"
          max="100000"
          value={filters.priceMax}
          onChange={handleChange}
        />
        <div className="price-text">Max Price: ₹{filters.priceMax}</div>
      </div>
    </>
  );
};

export default FilterPanel;
