import React from "react";
import { Container, Row, Col } from "reactstrap";

const CommonSection = ({ title }) => {
  return (
    <section className="common__section">
      <Container>
        <Row>
          <Col lg="12">
            <h1 style={{fontSize: "22px"}}>{title}</h1>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CommonSection;
