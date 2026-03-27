import React from "react";
import "./WhyTravel.css";
import why from "/image/why.jpg";

// import cabImage from "../assets/cab.jpg"; // apni image path yaha daal dena

const WhyTravel = () => {
  return (
    <section className="why-section">
      <div className="container">
        <div className="row align-items-center">
<h2 className="main-heading">
                Why travel with{" "}
                <span style={{ color: "#fbbf24" }}>ByCab</span> ?
              </h2>
          {/* Left Image */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="image-wrapper">
              <img src={why} alt="Cab Travel" className="img-fluid rounded-img" />
            </div>
          </div>

          {/* Right Content */}
          <div className="col-lg-6">
            <div className="content-wrapper">
              

              <div className="feature-block">
  <h5>Clean Car</h5>
  <p>Sanitised, professionally cleaned and odour-free cars</p>
</div>

<div className="feature-block">
  <h5>Transparent Billing</h5>
  <p>Simple pricing with no night or driver charges</p>
</div>

<div className="feature-block">
  <h5>Reliable Service</h5>
  <p>On-time rides with instant driver details</p>
</div>

<div className="feature-block">
  <h5>Professional Drivers</h5>
  <p>Verified, trained and customer-friendly drivers</p>
</div>

<div className="feature-block">
  <h5>Services</h5>
  <p>Outstation, intercity, local rides and airport transfers</p>
</div>

              <button className="book-btn">BOOK CAB</button>
            </div>
          </div>

        </div>
      </div>

         {/* ✅ RIGHT YELLOW LINE */}
      {/* <div className="yellow-line"></div> */}
    </section>
  );
};

export default WhyTravel;