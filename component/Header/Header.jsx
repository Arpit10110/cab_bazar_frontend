import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaLocationArrow } from "react-icons/fa";
import "./Header.css";

const HeroSection = () => {
  return (
    <div className="hero-wrapper">
      <Container fluid>
        <Row className="align-items-center">

          {/* LEFT FORM SECTION */}
          <Col md={5} className="form-col">
            <div className="booking-card">

              <div className="top-title">
                All India Cab Service
              </div>

              <div className="trip-type">
                <Button className="active-btn">Outstation</Button>
                <Button className="inactive-btn">Local / Airport</Button>
              </div>

              <div className="trip-option">
                <span className="radio-active"></span> Round Trip
                <span className="ms-4 radio-inactive"></span> One Way Trip
              </div>

              <Form>
                <Form.Group className="mb-3 position-relative">
                  <FaLocationArrow className="input-icon"/>
                  <Form.Control type="text" placeholder="Enter pickup city" />
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <FaMapMarkerAlt className="input-icon"/>
                  <Form.Control type="text" placeholder="Enter destination city" />
                </Form.Group>

                <div className="add-city">
                  + Add More City
                </div>

                <Form.Group className="mb-3 position-relative">
                  <FaPhoneAlt className="input-icon"/>
                  <Form.Control type="text" placeholder="Enter mobile number" />
                </Form.Group>

                <Button className="book-btn w-100">
                  Check Price & Book Cab
                </Button>
              </Form>

            </div>
          </Col>

          {/* RIGHT IMAGE SECTION */}
          <Col md={7} className="p-0">
            <div className="hero-image"></div>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;