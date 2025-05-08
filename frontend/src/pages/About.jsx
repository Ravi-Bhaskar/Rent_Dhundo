import React from "react";
import "../styles/about.css";

import Img from "../assets/images/home-img.png";

const About = () => {
  return (
    <>
      <section className="about-us">
      <h2>About Us</h2>
      <div className="about-us__section">
        <div className="about__container">
          <img src={Img} className="pic" alt="about-img" />
          </div>
          <div className="about__details">
            <h5>
              Rent<span> Dhundo</span>
            </h5>
            <p>
              Rent Dhundo is a web-based platform that simplifies the process of
              finding rental accommodations in new locations. With a wide range
              of rental options available in different locations, users can
              easily find a property that meets their budget and location
              preferences. The platform also allows property owners to list
              their properties for rent and connect with potential renters
              directly, providing a cost-effective solution. Rent Dhundo is
              committed to providing a secure and efficient rental process for
              both renters and owners, with advanced search algorithms and a
              user-friendly interface. Overall, Rent Dhundo aims to simplify the
              rental process for everyone involved, creating a valuable resource
              for those looking to find or list rental accommodations.
            </p>
        </div>
        </div>
      </section>
    </>
  );
};

export default About;
