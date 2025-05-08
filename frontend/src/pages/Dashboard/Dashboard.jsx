import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import API from "../../utils/api";
import OwnerPropertyCard from "../../components/Dashboard/OwnerPropertyCard";
import toast from "react-hot-toast";
import loadingGif from "../../assets/images/loading.gif";
import "./Dashboard.css"

import DashboardIcon from "../../assets/images/dashboard.png";
import ViewListing from "../../assets/images/view-listing.jpg";
import EditListing from "../../assets/images/edit-listing.jpg";
import DeleteListing from "../../assets/images/delete-listing.jpg";

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    const { data } = await API.get("/rents/myProperties");
    setProperties(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmDelete) return;

    await API.delete(`/rents/delete/${id}`);
    setProperties((prev) => prev.filter((p) => p._id !== id));
    toast.success("Deleted Successfully");
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <Container>
      <section class="owner-dashboard">
  <h2><img src={DashboardIcon} alt="dashboard icon" />Dashboard</h2>
  <p class="dashboard-subtext">A powerful control panel to manage your property listings easily.</p>
  <div class="dashboard-features">
    <div class="dash-box">
      <img src={ViewListing} alt="View Listings" />
      <h4>View Listings</h4>
      <p>See all your active properties in one place.</p>
    </div>
    <div class="dash-box">
      <img src={EditListing} alt="Edit Listings" />
      <h4>Edit Listings</h4>
      <p>Update property info, images, or prices anytime.</p>
    </div>
    <div class="dash-box">
      <img src={DeleteListing} alt="Delete Listings" />
      <h4>Delete Properties</h4>
      <p>Remove listings that are no longer available with one click.</p>
    </div>
  </div>
</section>
      <h4 className="my-5">My Properties</h4>
      {loading ? (
        <>
          <img src={loadingGif} className="loading" alt="loading..." />
          <h4 className="text-center pt-5 mt-2 mb-4">Loading... Please Wait</h4>
        </>
      ) : (
        <Row>
          {properties.map((prop) => (
            <Col md={6} lg={4} key={prop._id}>
              <OwnerPropertyCard property={prop} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
