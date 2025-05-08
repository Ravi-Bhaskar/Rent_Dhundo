import React from "react";
import "./WhyUseUs.css";

import NoMiddleMan from "../../assets/images/avoid-broker.jpg"
import FreeListing from "../../assets/images/free-listing.jpg"
import VirtualShortlisting from "../../assets/images/virtual-shortlisting.jpg"
import RentalAgreement from "../../assets/images/rental-agreement.jpg"

const WhyChooseUs = () => {
  return (
    <section class="why-use">
  <div class="features">
    <div class="feature-box">
      <img src={NoMiddleMan} alt="No Middlemen" />
      <h3>No Middlemen</h3>
      <p>Connect directly with verified property owners and save brokerage.</p>
    </div>
    <div class="feature-box">
      <img src={FreeListing} alt="Free Listing" />
      <h3>Free Listing</h3>
      <p>List your property for free in just a few clicks. Quick and easy process.</p>
    </div>
    <div class="feature-box">
      <img src={VirtualShortlisting} alt="Virtual Shortlisting" />
      <h3>Virtual Shortlisting</h3>
      <p>View details and shortlist properties online — no physical visits needed.</p>
    </div>
    <div class="feature-box">
      <img src={RentalAgreement} alt="Rental Agreement Assistance" />
      <h3>Rental Agreement</h3>
      <p>We assist in creating rental agreements and handling paperwork smoothly.</p>
    </div>
  </div>
</section>
  );
};

export default WhyChooseUs;
