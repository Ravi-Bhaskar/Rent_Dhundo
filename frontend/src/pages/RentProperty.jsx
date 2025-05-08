import React, { useEffect, useState, useContext } from "react";
import { Container, Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import toast from "react-hot-toast";

import "../styles/rent-property.css";
import postPropertyImg from "../assets/images/post-property.jpg";
import tickMarkImg from "../assets/images/check-mark.png";

const RentProperty = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [images, setImages] = useState([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bed, setBed] = useState("");
  const [bath, setBath] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [availableFor, setAvailableFor] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    images.forEach((img) => {
      formData.append("photos", img); // must match backend field
    });

    formData.append("city", city);
    formData.append("state", state);
    formData.append("address", address);
    formData.append("propertyType", propertyType);
    formData.append("bed", bed);
    formData.append("bath", bath);
    formData.append("price", price);
    formData.append("area", area);
    formData.append("availableFor", availableFor);
    formData.append("desc", desc);

    setIsSubmitting(true);

    try {
      if (!user) {
        toast("Please Sign In");
        return navigate("/login");
      }

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authorization token missing");
        return;
      }

      const res = await fetch(`${BASE_URL}/rents`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) return toast.error(result.message);

      toast.success(result.message);
      const rentId = result.savedRent._id;
      navigate(`/rents/${rentId}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <Container className="post-property__section">
        <div className="post-property__container">
          <div className="post-property__img">
            <img src={postPropertyImg} alt="post-property" />
          </div>
          <div className="post-property__details">
            <h2>
              Post Property Ad to Rent Online for <span>Free!</span>
            </h2>
            <div className="rent-detail__list">
              {[...Array(5)].map((_, i) => (
                <div className="detail__list" key={i}>
                  <img src={tickMarkImg} alt="tickImg" />
                  <p>
                    {
                      [
                        "List Property on Rent Dhundo Directly",
                        "List Unlimited Property as You Want",
                        "Get Unlimited enquiries",
                        "Get Better Exposure To Potential Tenants",
                        "Negotiate directly without any mediator",
                      ][i]
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="upload-property__form">
          <h3>Upload Listing</h3>
          <hr />

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <label>City</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>State</label>
              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="form-control"
              >
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Andaman and Nicobar Islands">
                  Andaman and Nicobar Islands
                </option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Delhi">Delhi</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Property Type</label>
              <select
                required
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="form-control"
              >
                <option value="">Select Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa House">Villa House</option>
                <option value="Farm House">Farm House</option>
                <option value="Row House">Row House</option>
                <option value="Builder Floor">Builder Floor</option>
                <option value="Studio">Studio</option>
                <option value="Independent House">Independent House</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Bed</label>
              <select
                required
                value={bed}
                onChange={(e) => setBed(e.target.value)}
                className="form-control"
              >
                <option value="">Select Beds</option>
                {[1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <label>Bath</label>
              <select
                required
                value={bath}
                onChange={(e) => setBath(e.target.value)}
                className="form-control"
              >
                <option value="">Select Baths</option>
                {[1, 2, 3, 4].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <label>Cost</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Built Up Area (Sq.ft)</label>
              <input
                type="number"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Available For</label>
              <select
                required
                value={availableFor}
                onChange={(e) => setAvailableFor(e.target.value)}
                className="form-control"
              >
                <option value="">Select Availability</option>
                <option value="Family">Family</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Anyone">Anyone</option>
                <option value="Rent">Rent</option>
                <option value="Lease">Lease</option>
                <option value="PG">PG</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Description</label>
              <textarea
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Upload Property Images (You can select multiple)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </FormGroup>

            <Button
              disabled={isSubmitting}
              className="btn create-property__btn auth__btn"
              type="submit"
            >
              {isSubmitting ? "Creating..." : "Create Property"}
            </Button>
          </Form>
        </div>
      </Container>
    </section>
  );
};

export default RentProperty;
