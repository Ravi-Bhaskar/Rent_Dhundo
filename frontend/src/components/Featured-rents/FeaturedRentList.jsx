import React from "react";
import RentCard from "../../shared/RentCard";
import { Col } from "reactstrap";
import useFetch from "./../../hooks/useFetch";
import { BASE_URL } from "./../../utils/config";

const FeaturedRentList = () => {
  const {
    data: featuredRents,
    loading,
    error,
  } = useFetch(`${BASE_URL}/rents/search/getFeaturedRents`);
  
  return (
    <>
      {loading && <h4>Loading..... Please Wait</h4>}
      {error && <h4>{error}</h4>}
      {!loading &&
        !error &&
        featuredRents?.map((rent) => (
          <Col lg="4" md="6" sm="6" className="mb-4" key={rent._id}>
            <RentCard rent={rent} />
          </Col>
        ))}
    </>
  );
};

export default FeaturedRentList;
