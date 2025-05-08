import React from "react";
import "./OwnerPropertyForm.css"; // custom styles

const OwnerPropertyForm = ({
  handleSubmit,
  formData,
  setFormData,
  isEdit = false,
}) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photos") {
      setFormData((prev) => ({ ...prev, images: [...files] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? "Edit Property" : "Add New Property"}</h2>

      <div className="form-row">
        <label>City</label>
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter city"
          required
        />
      </div>
      <div className="form-row">
        <label>State</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
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
          <option value="Delhi">Delhi</option>
          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
          <option value="Ladakh">Ladakh</option>
          <option value="Puducherry">Puducherry</option>
        </select>
      </div>

      <div className="form-row">
        <label>Address</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter address"
          required
        />
      </div>

      <div className="form-row">
        <label>Property Type</label>
        <select
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
          required
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
      </div>

      <div className="form-row">
        <label>Bedrooms</label>
        <input
          type="number"
          name="bed"
          value={formData.bed}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label>Bathrooms</label>
        <input
          type="number"
          name="bath"
          value={formData.bath}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label>Price (₹)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label>Area (sq ft)</label>
        <input
          name="area"
          value={formData.area}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label>Available For</label>
        <select
          name="availableFor"
          value={formData.availableFor}
          onChange={handleChange}
          required
        >
          <option value="">Available For</option>
          <option value="Family">Family</option>
          <option value="Bachelors">Bachelors</option>
          <option value="Anyone">Anyone</option>
          <option value="Rent">Rent</option>
          <option value="Lease">Lease</option>
          <option value="PG">PG</option>
        </select>
      </div>

      <div className="form-row">
        <label>Description</label>
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          rows="4"
          placeholder="Write short description..."
        />
      </div>

      <div className="form-row">
        <label>{isEdit ? "Replace" : "Upload"} Images</label>
        <input type="file" name="photos" multiple onChange={handleChange} />
      </div>

      <button type="submit" className="submit-btn">
        {isEdit ? "Update Property" : "Create Property"}
      </button>
    </form>
  );
};

export default OwnerPropertyForm;
