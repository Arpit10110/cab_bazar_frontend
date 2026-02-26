import React from "react";
import "./TaxiServices2.css";

const TaxiServices = () => {
  return (
    <section className="taxi-section">
      <div className="yellow-line-left"></div>
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT IMAGE */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="image-box">
              <img
                src="/image/mobile1img.png"
                alt="Mobile App"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-6">
            <div className="right-content">
              <h2>Get ₹200 cashback on mobile app download</h2>

              <div className="store-buttons">
                <a href="#">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                  />
                </a>

                <a href="#">
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="App Store"
                  />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

       

    </section>
  );
};

export default TaxiServices;