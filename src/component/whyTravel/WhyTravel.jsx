import React from "react";
import "./WhyTravel.css";

// import cabImage from "../assets/cab.jpg"; // apni image path yaha daal dena

const WhyTravel = () => {
  return (
    <section className="why-section">
      <div className="container">
        <div className="row align-items-center">
<h2 className="main-heading">
                Why travel with <span>ByCab</span> ?
              </h2>
          {/* Left Image */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="image-wrapper">
              <img src='https://cabbazar.com/assets/img/people/why_cabbazar.webp' alt="Cab Travel" className="img-fluid rounded-img" />
            </div>
          </div>

          {/* Right Content */}
          <div className="col-lg-6">
            <div className="content-wrapper">
              

              <div className="feature-block">
                <h5>Clean Car</h5>
                <p>Sanitised Post-Ride • Professionally Cleaned • Odour-Free</p>
              </div>

              <div className="feature-block">
                <h5>Transparent Billing</h5>
                <p>Simple pricing • No Night Charges • No Driver Charges</p>
              </div>

              <div className="feature-block">
                <h5>Reliable Service</h5>
                <p>Immediate Driver details • On Time • Thousands of Cabs</p>
              </div>

              <div className="feature-block">
                <h5>Professional Drivers</h5>
                <p>Gentle, Well-Behaved • Verified & Trained • Customer-Centric</p>
              </div>

              <div className="feature-block">
                <h5>Services</h5>
                <p>Outstation cab booking • Intercity cabs • Local car rental • Airport transfers</p>
              </div>

              <button className="book-btn">BOOK CAB</button>
            </div>
          </div>

        </div>
      </div>

         {/* ✅ RIGHT YELLOW LINE */}
      <div className="yellow-line"></div>
    </section>
  );
};

export default WhyTravel;