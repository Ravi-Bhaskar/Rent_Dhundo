import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import OwnerPropertyForm from "../../components/Dashboard/OwnerPropertyForm";
import API from "../../utils/api";
import toast from "react-hot-toast";

const EditRent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    address: "",
    propertyType: "",
    bed: "",
    bath: "",
    price: "",
    area: "",
    availableFor: "",
    desc: "",
    images: [],
  });

  useEffect(() => {
    API.get(`/rents/${id}`)
      .then((res) => setFormData({ ...res.data, images: [] }))
      .catch((err) => toast.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (key === "images")
        formData.images.forEach((img) => data.append("photos", img));
      else data.append(key, formData[key]);
    }

    await API.put(`/rents/update/${id}`, data);
    toast.success("Property updated successfully");
    navigate("/dashboard");
  };

  return (
    <Container>
      <h2 className="my-4">Edit Rent</h2>
      <OwnerPropertyForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEdit
      />
    </Container>
  );
};

export default EditRent;
