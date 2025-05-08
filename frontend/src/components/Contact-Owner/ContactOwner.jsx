import React, { useRef, useContext } from "react";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./contact-owner.css";
import { FormGroup, Button } from "reactstrap";
import toast from "react-hot-toast";

const ContactOwner = ({ rent, avgRating }) => {
  const { price, reviews, currentOwner } = rent;

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const formRef = useRef();

  const serviceId = process.env.REACT_APP_SERVICE_ID;
  const templateId = process.env.REACT_APP_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;
 
  const handleContactOwner = async (e) => {
    e.preventDefault();

    if (!user || user === undefined || user === null) {
        alert("Please Sign In");
        return navigate("/login");
      }

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
    .then((result) => {
        toast.success("Email Sent Successfully to Property Owner");
    }, (error) => {
        toast.error("Opps!!! Can't able to Contact to Owner");
    });
    e.target.reset();
  };

  return (
    <div className="contact-owner">
      <div className="contact__top d-flex align-items-center justify-content-between">
        <h3>
          <span>{"\u20B9 "}</span>
          {price}<span>/per month</span>
        </h3>
        <span className="rent__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* ====== Contact Owner Form ====== */}
      <div className="contact_owner__form">
        <h5>Send enquiry to Owner</h5>
        <form ref={formRef} onSubmit={handleContactOwner} className="contact-owner__info-form">
        <FormGroup className="hide-owner__detail">
          <input type="text" placeholder="Owner Name" value={currentOwner?.username} name="to_name" readOnly />
          </FormGroup>
          <FormGroup className="hide-owner__detail">
          <input type="email" placeholder="Owner Email" value={currentOwner?.email} name="to_email" readOnly />
          </FormGroup>
          <FormGroup>
            <input type="text" placeholder="Full Name" name="from_name" required />
          </FormGroup>
          <FormGroup>
            <input type="text" placeholder="Email" name="from_email" required />
          </FormGroup>
          <FormGroup>
            <input type="number" placeholder="WhatsApp Number" name="from_phone" required />
          </FormGroup>
          <FormGroup>
            <input type="text" placeholder="Description" name="message" defaultValue={"I am interested in your Property."} required />
          </FormGroup>
          <Button className="btn create-property__btn auth__btn" type="submit">
                Contact Owner
              </Button>
        </form>
      </div>
      {/* ====== Contact Owner Form Ends ====== */}
    </div>
  );
};

export default ContactOwner;
