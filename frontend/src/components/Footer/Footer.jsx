import React, { useContext } from "react";
import "./footer.css";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

//auth
import { AuthContext } from "./../../context/AuthContext";

const quick__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/rent-property",
    display: "Rent Property",
  },
];

const quick__links2 = [
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];

const Footer = () => {
  const { user } = useContext(AuthContext);

  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo d-flex">
              {/* <img src={logo} alt="logo" /> */}
              <h2 className="logo-name logo-f-color align-items-center">
                Rent
              </h2>
              <h2 className="logo-name logo-b-color align-items-center">
                Dhundo
              </h2>
            </div>
            <h6>Do You Need Help With Anything?</h6>
            <p>
              Receive updates, get latest deals, discounts sent straight in your
              inbox every month
            </p>
            <div className="social__links d-flex align-items-center gap-4">
              <span>
                <Link to="#">
                  <i className="ri-youtube-line"></i>
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="ri-github-line"></i>
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="ri-facebook-circle-line"></i>
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="ri-instagram-line"></i>
                </Link>
              </span>
            </div>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title mt-3">Discover</h5>

            <ListGroup className="footer__quick-links">
              {quick__links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          {user ? (
            <></>
          ) : (
            <>
              <Col lg="3">
                <h5 className="footer__link-title mt-3">Quick Links</h5>

                <ListGroup className="footer__quick-links">
                  {quick__links2.map((item, index) => (
                    <ListGroupItem key={index} className="ps-0 border-0">
                      <Link to={item.path}>{item.display}</Link>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Col>
            </>
          )}

          <Col lg="3">
            <h5 className="footer__link-title mt-3">Contact</h5>

            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  Address:
                </h6>
                <p className="mb-0">Bihar, India</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  Email:
                </h6>
                <p className="mb-0">rentdhundo@gmail.com</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex gap-2">
                  <span>
                    <i className="ri-phone-fill"></i>
                  </span>
                  Phone:
                </h6>
                <p className="mb-0">+91 7903254548</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="12" className="text-center pt-5">
            <p className="copyright mb-0">
              Copyright &copy; {year}, Rent Dhundo All right received.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
