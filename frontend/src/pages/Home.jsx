import React from "react";
import "../styles/home.css";

import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/home-img.png";
import worldImg from "../assets/images/world.png";
import Subtitle from "./../shared/Subtitle";

import SearchBar from "../shared/Home SearchBar/SearchBar";
import FeaturedRentList from "../components/Featured-rents/FeaturedRentList";
import RentStepList from "../RentStepCard/RentStepList";
import RentYourProperty from "../shared/RentYourProperty";
import WhyUseUs from "../components/WhyUseUs/WhyUseUs";

const Home = () => {
  return (
    <>
      {/* --------- hero section ---------- */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle Subtitle={"Find Your Next Home"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Rent Your Dream House Located In Your{" "}
                  <span className="highlight"> Local City</span>
                </h1>
                <p>
                  Rent Dhundo is a user-friendly web platform that simplifies
                  the process of finding and listing rental accommodations. With
                  advanced search algorithms and a robust management system, it
                  provides a secure and efficient rental process for both
                  renters and owners. Overall, Rent Dhundo is a valuable
                  resource for those looking to find or list rental properties.
                </p>
              </div>
            </Col>

            <Col lg="6">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* XXXXXXXXX hero section end XXXXXXXXX */}

      {/* ------------ Search Bar Section ---------- */}
      <section>
        <Container>
          <SearchBar />
        </Container>
      </section>

      {/* --------- Rent steps section ----------- */}
      <section>
        <Container>
          <Row>
            <Col>
              <h5 className="services__subtitle align-items-center">
                How Its Work?
              </h5>
              <h2 className="services__title">Rent With 6 Easy Steps</h2>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Col lg="12" className="rent-step__container align-items-center">
            <RentStepList />
          </Col>
        </Container>
      </section>
      {/* XXXXXXXXX Rent steps section end XXXXXXXXX */}

      {/* ---------- Why Choose Us ------------ */}
      <section>
        <Container>
          <Row>
            <Col>
              <h5 className="services__subtitle align-items-center">
                Why Use Rent Dhundo?
              </h5>
              <h2 className="services__title">This Is What We Provide</h2>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section>
        <Container>
            <WhyUseUs />
        </Container>
      </section>

      {/* XXXXXXXXX Why Choose Us end XXXXXXXXXXXXXXX */}

      {/* --------- Featured Rent section ---------- */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle Subtitle={"Explore"} />
              <h2 className="featured__rent-title">Our Featured Rents</h2>
            </Col>
            <FeaturedRentList />
          </Row>
        </Container>
      </section>
      {/* XXXXXXXXX Featured Rent section end XXXXXXXXX */}

      {/* --------- Upload Property section ----------- */}
      <section>
        <RentYourProperty />
      </section>
    </>
  );
};

export default Home;
