import React from "react";
import { FaTaxi, FaMapMarkerAlt, FaPlane, FaClock } from "react-icons/fa";
import "./Popularcity.css";
import carphone from "/image/carphone.jpg";

const Cab = () => {
  return (
    <div className="container py-3 cab-section">
      
      <div className=" mx-auto ">
        <h1 className="display-5 main-heading text-capitalize mb-3">
          ByCab <span className="text-darkorange">Services</span>
        </h1>

        {/* <p className="mb-0">
          ByCab offers reliable and affordable cab services for all your travel needs.
        </p> */}
      </div>

      <div className="row g-4 align-items-center">
        
        {/* LEFT */}
        <div className="col-xl-4">
          <div className="row gy-4 gx-0 left">

            <div className="col-10">
              <div className="feature-item">
                <div className="feature-icon">
                  <FaTaxi />
                </div>
                <div className="ms-4">
                  <h5>Book Outstation Cabs</h5>
                </div>
              </div>
            </div>

            <div className="col-10">
              <div className="feature-item">
                <div className="feature-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="ms-4">
                  <h5>Online Cab Booking</h5>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CENTER */}
        <div className="col-lg-12 col-xl-4 text-center">
          <img
            src={carphone}
            className="img-fluid center-img"
            alt="cab"
          />
        </div>

        {/* RIGHT */}
        <div className="col-xl-4">
          <div className="row gy-4 gx-0 right">

            <div className="col-10 ms-auto">
              <div className="feature-item justify-content-end">
                <div className="text-end me-4">
                  <h5>Airport Taxi Service</h5>
                </div>
                <div className="feature-icon">
                  <FaPlane />
                </div>
              </div>
            </div>

            <div className="col-10 ms-auto">
              <div className="feature-item justify-content-end">
                <div className="text-end me-4">
                <h5>Affordable Cab Service</h5>
                </div>
                <div className="feature-icon">
                  <FaClock />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Cab;