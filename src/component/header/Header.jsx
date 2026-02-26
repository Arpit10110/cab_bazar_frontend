import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaPhoneAlt, FaLocationArrow } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const HeroWithPromo = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("outstation");
  const [tripMode, setTripMode] = useState("round");
  const [mobile, setMobile] = useState("");
  const [cities, setCities] = useState(["", ""]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Debounce timer reference
  const debounceRef = useRef(null);

  // ✅ API CALL
  const fetchSuggestions = async (value) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API}/api/v1/get-address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input: value }),
        }
      );

      const data = await response.json();
      setSuggestions(data || []);
    } catch (error) {
      console.error("API Error:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Input Change Handler with Manual Debounce
  const handleCityChange = (value, index) => {
    const updated = [...cities];
    updated[index] = value;
    setCities(updated);
    setActiveIndex(index);

    // Clear previous timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value.length > 2) {
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(value);
      }, 500); // 500ms debounce delay
    } else {
      setSuggestions([]);
    }
  };

  const addCity = () => {
    setCities([...cities, ""]);
  };

  // ✅ Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setSuggestions([]);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleCabData = async()=>{
    console.log("tripType",tripType);
    console.log("tripMode",tripMode);
    console.log("cities",cities);
    console.log("mobile",mobile);
    //save data in local storage
    const bookingdata={
      tripType,
      tripMode,
      cities,
      mobile
    }
    localStorage.setItem("bookingdata",JSON.stringify(bookingdata));
    navigate("/cablist");
  }

  return (
    <>
      {/* HERO SECTION */}
      <div className="hero-wrapper">
        <Container>
          <Row className="hero-row">
            <Col lg={5} md={6} xs={12} className="form-col">
              <div className="booking-card">
                <div className="top-title">All India Cab Service</div>

                <div className="trip-type">
                  <Button
                    className={
                      tripType === "outstation"
                        ? "active-btn"
                        : "inactive-btn"
                    }
                    onClick={() => setTripType("outstation")}
                  >
                    Outstation
                  </Button>

                  <Button
                    className={
                      tripType === "local" ? "active-btn" : "inactive-btn"
                    }
                    onClick={() => setTripType("local")}
                  >
                    Local / Airport
                  </Button>
                </div>

                {tripType === "outstation" && (
                  <div className="trip-option">
                    <span onClick={() => setTripMode("round")}>
                      <span
                        className={
                          tripMode === "round"
                            ? "radio-active"
                            : "radio-inactive"
                        }
                      ></span>
                      Round Trip
                    </span>

                    <span onClick={() => setTripMode("oneway")}>
                      <span
                        className={
                          tripMode === "oneway"
                            ? "radio-active"
                            : "radio-inactive"
                        }
                      ></span>
                      One Way Trip
                    </span>
                  </div>
                )}

                <Form onClick={(e) => e.stopPropagation()}>
                  {cities.map((city, index) => (
                    <Form.Group
                      key={index}
                      className="mb-3 position-relative"
                    >
                      <Form.Control
                        type="text"
                        placeholder={
                          index === 0
                            ? "Enter pickup city"
                            : "Enter destination city"
                        }
                        value={city}
                        onChange={(e) =>
                          handleCityChange(e.target.value, index)
                        }
                        autoComplete="off"
                      />

                      <FaLocationArrow className="input-icon" />

                      {activeIndex === index &&
                        (suggestions.length > 0 || loading) && (
                          <div className="suggestion-box">
                            {loading && (
                              <div className="suggestion-item">
                                Loading...
                              </div>
                            )}

                            {!loading &&
                              suggestions.map((item) => (
                                <div
                                  key={item.place_id}
                                  className="suggestion-item"
                                  onClick={() => {
                                    const updated = [...cities];
                                    updated[index] = item.description;
                                    setCities(updated);
                                    setSuggestions([]);
                                  }}
                                >
                                  <strong>
                                    {
                                      item.structured_formatting
                                        ?.main_text
                                    }
                                  </strong>
                                  <small className="text-muted d-block">
                                    {
                                      item.structured_formatting
                                        ?.secondary_text
                                    }
                                  </small>
                                </div>
                              ))}
                          </div>
                        )}
                    </Form.Group>
                  ))}

                  {tripType === "outstation" && (
                    <div className="add-city" onClick={addCity}>
                      + Add More City
                    </div>
                  )}

                  {tripType === "local" && (
                    <Form.Group className="mb-3">
                      <Form.Select>
                        <option>Select Airport</option>
                        <option>Delhi Airport</option>
                        <option>Mumbai Airport</option>
                        <option>Bangalore Airport</option>
                      </Form.Select>
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3 position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Enter mobile number"
                      value={mobile}
                      onChange={(e)=>setMobile(e.target.value)}
                      required
                    />
                    <FaPhoneAlt className="input-icon" />
                  </Form.Group>

                  <Button onClick={handleCabData} className="book-btn w-100">
                    Book Cab
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* PROMO SECTION */}
      <div className="promo-wrapper">
        <div className="desktop-view">
          <div className="promo-item">
  <h6>Get ₹200 cashback on mobile app download</h6>

  <div className="store-buttons">
    {/* Play Store - Always Visible */}
    <a 
      href="https://play.google.com/store/apps" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
        alt="Google Play Store"
        className="play-store"
      />
    </a>

    {/* App Store - Hide on Mobile */}
    <a 
      href="https://www.apple.com/app-store/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="app-store-link"
    >
      <img
        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
        alt="App Store"
        className="app-store"
      />
    </a>
  </div>
</div>

          <div className="promo-item border-left">
            <h4>No return fare</h4>
            <p>
              One-Way cab fare | No hidden charges
              <br />
              Minimal advance
            </p>
          </div>

          <div className="promo-item border-left">
            <h4>No over-pricing</h4>
            <p>
              Cheapest costs | Competitive prices
              <br />
              Pay as you go
            </p>
          </div>
        </div>

        <div className="mobile-view">
          <Slider {...sliderSettings}>
            <div className="carousel-card">
              <div className="promo-item">
                <h6>Get ₹200 cashback on mobile app download</h6>
                 <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
        alt="Google Play Store"
        className="play-store"
      />
              </div>
            </div>
            <div className="carousel-card d-md-none">
              <div className="promo-item">
                <h4>No return fare</h4>
                 <p>
              One-Way cab | No hidden charges
              <br />
              Minimal advance
            </p>
              </div>
            </div>
            <div className="carousel-card">
              <div className="promo-item">
                <h4>No over-pricing</h4>
                 <p>
              Cheapest costs | Competitive prices
              <br />
              Pay as you go
            </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>

      <div className="mobile-image"></div>
    </>
  );
};

export default HeroWithPromo;