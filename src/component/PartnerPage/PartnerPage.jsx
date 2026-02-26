import React from "react";
import "./PartnerPage.css";

const PartnerPage = () => {
  return (
    <div className="partner-wrapper">
      
      {/* Left Yellow Line */}
      <div className="left-yellow-line"></div>

      {/* Right Top Yellow Box */}
      {/* <div className="right-top-yellow"></div> */}

      <div className="partner-content">
        <h1>Partner with CabBazar</h1>

        <div className="partner-grid">

          {/* Block 1 */}
          <div className="partner-card">
            <h3>Attach your car (For Drivers)</h3>
            <p>
              Drivers / Taxi service providers can partner with CabBazar to
              attach your car with company and get business from CabBazar.
            </p>
            <button>KNOW MORE</button>
          </div>

          {/* Block 2 */}
          <div className="partner-card">
            <h3>Blog</h3>
            <p>
              Stay updated with travel related information with CabBazar travel
              blogs. Interesting articles on travel tips, useful information,
              places, culture and cuisine.
            </p>
            <button>READ BLOG</button>
          </div>

          {/* Block 3 */}
          <div className="partner-card">
            <h3>Sales Partner</h3>
            <p>
              Become a Sales partner and earn with every booking placed through
              you. You can join as Affiliate, travel agent using our partner
              portal or API integration.
            </p>
            <div className="btn-group">
              <button>KNOW MORE</button>
              <button className="outline-btn">Partner Portal Login</button>
            </div>
          </div>

          {/* Block 4 */}
          <div className="partner-card">
            <h3>Career</h3>
            <p>
              Interested in working at CabBazar? We're looking for talent that
              will help us sustainably create value to tackle the future
              mobility challenge together.
            </p>
            <button>KNOW MORE</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PartnerPage;