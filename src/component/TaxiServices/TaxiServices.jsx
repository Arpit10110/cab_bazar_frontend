import React from "react";
import "./TaxiServices.css";

const TaxiServices = () => {
  return (
    <section className="taxi-section">

      <div className="container">
        <div className="row align-items-center">

          {/* LEFT IMAGE */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="image-box1">
              <img
                src="https://cabbazar.com/assets/img/people/outstation_taxi.webp"
                alt="Taxi Service"
                className="service-img"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-6">
            <div className="content-box">
              <h2 className="main-title">ByCab Taxi Services</h2>

              <div className="service-item">
                <h5>Outstation Cabs</h5>
                <p>
                  Round Trip cab services • Multiple Destinations as you plan •
                  Multiple Stops as per your choice • All sightseeing at
                  destination included • No driver boarding and lodging • Simple
                  pricing - Driver charges included, Night charges included
                </p>
              </div>

              <div className="service-item">
                <h5>One Way Cab</h5>
                <p>
                  No return fare • One pick-up, One drop, One-way fare • All
                  inclusive lowest prices on popular routes - Toll tax, state
                  tax included
                </p>
              </div>

              <div className="service-item">
                <h5>Local Hourly Car Rental</h5>
                <p>
                  Hourly Car Rentals for Local Sightseeing • Business trips •
                  Marriage • Shopping and much more...
                </p>
              </div>

              <div className="service-item">
                <h5>Airport Taxi</h5>
                <p>
                  Last mile connectivity • From Airport • To Airport • Assured
                  Luggage option • Confirmed Cab
                </p>
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

export default TaxiServices;