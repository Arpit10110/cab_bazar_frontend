import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Journey.css"

import { FaSmile, FaMapMarkerAlt, FaCar, FaStar } from "react-icons/fa";

const JourneyStats = () => {
  return (
    <div className="journey-wrapper py-4">
      <div className="container-fluid px-3 px-md-5">

        {/* Title */}
        <h5 className="journey-title mb-3">Our journey so far</h5>

        {/* Card */}
        <div className="journey-card">

          <div className="row g-4 text-center">
            
            {/* Item 1 */}
            <div className="col-6">
              <div className="stat-item">
                <div className="icon-box">
                  <FaSmile />
                </div>
                <h6>1 Mn +</h6>
                <p>Happy Revvers</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="col-6">
              <div className="stat-item">
                <div className="icon-box">
                  <FaMapMarkerAlt />
                </div>
                <h6>22+ cities</h6>
                <p>Across India</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="col-6">
              <div className="stat-item">
                <div className="icon-box">
                  <FaCar />
                </div>
                <h6>50 Mn +</h6>
                <p>Kms travelled</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="col-6">
              <div className="stat-item">
                <div className="icon-box">
                  <FaStar />
                </div>
                <h6>4.5 / 5</h6>
                <p>100K+ reviewers</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default JourneyStats;