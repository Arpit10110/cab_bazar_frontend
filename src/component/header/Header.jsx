import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaPhoneAlt, FaLocationArrow } from "react-icons/fa";
import taxi from "/image/taxi.jpg";
import Slider from "react-slick";
import  './Header.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const HeroWithPromo = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("outstation");
  const [tripMode, setTripMode] = useState("round");
  const [mobile, setMobile] = useState("");
  const [cities, setCities] = useState(["", ""]);
  const [placeIds, setPlaceIds] = useState(["", ""]);
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
    const nextPlaceIds = updated.map((_, i) =>
      i === index ? "" : placeIds[i] ?? "",
    );
    setPlaceIds(nextPlaceIds);
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
    setPlaceIds([...placeIds, ""]);
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

  const handleCabData = () => {
    if (tripType === "outstation") {
      const pickupId = String(placeIds[0] ?? "").trim();
      const destId = String(placeIds[1] ?? "").trim();
      if (!pickupId || !destId) {
        alert("Please choose pickup and destination from the suggestions list so we can calculate distance.");
        return;
      }
    }
    const bookingdata = {
      tripType,
      tripMode,
      cities,
      placeIds,
      mobile,
    };
    localStorage.setItem("bookingdata", JSON.stringify(bookingdata));
    navigate("/cablist");
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="w-full min-h-screen bg-[url('https://www.srdvtechnologies.com/assets/images/taxi-booking-services.jpg')] bg-no-repeat bg-center bg-cover relative flex items-center max-md:bg-none max-md:min-h-auto">
          <Row className="relative w-full z-[2] min-h-screen max-[450px]:!m-auto items-center max-md:min-h-[74vh] max-md:mt-10">
          <Col lg={5} md={6} xs={12} className="flex max-[450px]:!px-0  justify-start px-5 !-mt-20 max-md:!-mt-0">
            <div className="bg-[#f3f3f3] rounded-[20px] p-[15px] w-full max-w-[380px] h-auto flex flex-col  max-md:!bg-transparent max-md:!w-full" style={{ marginLeft: "9px", gap: "10px",marginTop:"-20px" }}>
                <div className="bg-[#f5b400]  m-head text-center rounded-[15px]  font-semibold">All India Cab Service</div>

                <div className="flex  gap-2.5 mb-[1px]">
                  <Button
                    className={
                      tripType === "outstation"
                        ? "!bg-[#f5b400] !rounded-[25px] !border-none font-semibold flex-1"
                        : "!bg-[#ddd] !rounded-[25px] !border-none flex-1 text-black " 
                    } 
                    onClick={() => setTripType("outstation")} style={{padding:"9px"}}
                  >
                    Outstation
                  </Button>

                  <Button
                    className={
                      tripType === "local" 
                        ? "!bg-[#f5b400] !rounded-[25px] !border-none font-semibold flex-1" 
                        : "!bg-[#ddd] !rounded-[25px] !border-none flex-1 text-black"
                    }
                    onClick={() => setTripType("local")} style={{padding:"9px"}}
                  >
                    Local / Airport
                  </Button>
                </div>

                {tripType === "outstation" && (
                  <div className="flex justify-between bg-[#e9e9e9]  px-[15px] rounded-[15px] mb-[1px] cursor-pointer" style={{padding:"9px"}}>
                    <span onClick={() => setTripMode("round")} className="flex items-center">
                      <span
                        className={
                          tripMode === "round"
                            ? "h-[15px] w-[15px] bg-[#f5b400] rounded-full inline-block mr-1.5"
                            : "h-[15px] w-[15px] border-2 border-black rounded-full inline-block mr-1.5"
                        }
                      ></span>
                      Round Trip
                    </span>

                    <span onClick={() => setTripMode("oneway")} className="flex items-center">
                      <span
                        className={
                          tripMode === "oneway"
                            ? "h-[15px] w-[15px] bg-[#f5b400] rounded-full inline-block mr-1.5"
                            : "h-[15px] w-[15px] border-2 border-black rounded-full inline-block mr-1.5"
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
                      className="p-1 relative"
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
                        className="!rounded-xl !py-3 !pr-10 !pl-[15px] !border-none !bg-[#e8e8e8c9]"
                      />

                      <FaLocationArrow className="absolute right-[15px] top-[12px] text-gray-500" />

                      {activeIndex === index &&
                        (suggestions.length > 0 || loading) && (
                          <div className="bg-white absolute w-full top-[45px] rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.1)] z-[99]">
                            {loading && (
                              <div className="px-3 py-2 cursor-pointer">
                                Loading...
                              </div>
                            )}

                            {!loading &&
                              suggestions.map((item) => (
                                <div
                                  key={item.place_id}
                                  className="px-3 py-2 cursor-pointer hover:bg-[#f5b400]"
                                  onClick={() => {
                                    const updated = [...cities];
                                    updated[index] = item.description;
                                    setCities(updated);
                                    const nextIds = [...placeIds];
                                    nextIds[index] = item.place_id;
                                    setPlaceIds(nextIds);
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
                    <div className="bg-[#e9d9b6] p-2.5 rounded-xl mb-[8px] mt-[3px] text-center cursor-pointer" onClick={addCity}>
                      + Add More City
                    </div>
                  )}

                  {tripType === "local" && (
                    <Form.Group className="mb-1
                    ">
                      <Form.Select className="!rounded-xl !py-3 !pr-10 !pl-[15px] !border-none !bg-[#e8e8e8c9]">
                        <option>Select Airport</option>
                        <option>Delhi Airport</option>
                        <option>Mumbai Airport</option>
                        <option>Bangalore Airport</option>
                      </Form.Select>
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3 relative">
                    <Form.Control
                      type="text"
                      placeholder="Enter mobile number"
                      value={mobile}
                      onChange={(e)=>setMobile(e.target.value)}
                      required
                      className="!rounded-xl !py-3 !pr-10 !pl-[15px] !border-none !bg-[#e8e8e8c9]"
                    />
                    <FaPhoneAlt className="absolute right-[15px] top-[12px] text-gray-500" />
                  </Form.Group>

                  <Button onClick={handleCabData} className="w-full m-btn !bg-[#f5b400] !border-none p-2.5 !m-0 font-bold !rounded-[30px] flex justify-center items-center text-black">
                    Book Cab
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
      </div>
      

      {/* PROMO SECTION */}
      <div className="w-full d-none flex justify-center -mt-[60px] lg:-mt-[70px] relative z-[5]">
        <div className="bg-[#efefef] w-[89%] max-w-[1200px] rounded-[80px] py-3 px-[50px] flex items-center mb-5 justify-between max-md:hidden">
          <div className="flex-1 text-center">
  <h6 className="font-semibold mb-[25px] cash">Get ₹200 cashback on mobile app download</h6>

  <div className="d-none flex gap-2.5 mt-2.5 justify-center">
    {/* Play Store - Always Visible this is a playstore link */}
    <a 
      href="https://play.google.com/store/apps" 
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={taxi}
        alt="Google Play Store"
        className="h-[45px] cursor-pointer"
      />
    </a>

    {/* App Store - Hide on Mobile */}
    <a 
      href="https://www.apple.com/app-store/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="max-md:hidden"
    >
      <img
        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
        alt="App Store"
        className="h-[45px] cursor-pointer"
      />
    </a>
  </div>
</div>

          <div className="flex-1 text-center border-l border-[#d4d4d4]">
            <h4 className="font-bold mb-2">No return fare</h4>
            <p className="m-0 text-[#555] text-[15px]">
              One-Way cab fare | No hidden charges
              <br />
              Minimal advance
            </p>
          </div>

          <div className="flex-1 text-center border-l border-[#d4d4d4]">
            <h4 className="font-bold mb-2">No over-pricing</h4>
            <p className="m-0 text-[#555] text-[15px]">
              Cheapest costs | Competitive prices
              <br />
              Pay as you go
            </p>
          </div>
        </div>

        <div className="hidden d-none max-md:block w-[95%] max-md:-mb-[105px] [&_.slick-slide]:!mb-[50px] [&_.slick-dots]:!hidden [&_.slick-slide_img]:!ml-[55px] [&_.slick-slide_img]:h-[40px]">
          <Slider {...sliderSettings}>
            <div className="bg-[#f1f1f1] rounded-[50px] mt-10 p-[25px] text-center h-[110px] !flex flex-col justify-center shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
              <div className="flex-1 text-center">
                <h6 className="font-semibold mb-[15px] max-md:text-[17px] cash">Get ₹200 cashback on mobile app download</h6>
                 {/* <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
        alt="Google Play Store"
        className="h-[45px] cursor-pointer"
      /> */}
              </div>
            </div>
            <div className="bg-[#f1f1f1] rounded-[50px] mt-10 p-[25px] text-center h-[110px] !flex flex-col justify-center shadow-[0_10px_25px_rgba(0,0,0,0.15)] d-md-none">
              <div className="flex-1 text-center">
                <h4 className="font-bold mb-2">No return fare</h4>
                 <p className="m-0 text-[#555] text-[15px]">
              One-Way cab | No hidden charges
              <br />
              Minimal advance
            </p>
              </div>
            </div>
            <div className="bg-[#f1f1f1] rounded-[50px] mt-10 p-[25px] text-center h-[110px] !flex flex-col justify-center shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
              <div className="flex-1 text-center">
                <h4 className="font-bold mb-2">No over-pricing</h4>
                 <p className="m-0 text-[#555] text-[15px]">
              Cheapest costs | Competitive prices
              <br />
              Pay as you go
            </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>

      <div className="hidden max-md:block h-[350px] bg-[url('https://www.srdvtechnologies.com/assets/images/taxi-booking-services.jpg')] bg-no-repeat bg-center bg-cover"></div>
    </>
  );
};

export default HeroWithPromo;