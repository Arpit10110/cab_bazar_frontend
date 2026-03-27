import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Feature.css'
import { FaCar, FaMapMarkerAlt, FaStar, FaCheck } from "react-icons/fa";

const StatsSection = () => {
  return (
    <div className="stats-wrapper py-4">
      <div className="container-fluid px-3 px-md-5">

        {/* Top Stats */}
        <div className="row justify-content-center text-center g-3 mb-3">
          <div className="col-6 col-md-3">
            <div className="stat-box d-flex align-items-center justify-content-center gap-3">
              <div className="icon-box">
                <FaCar />
              </div>
              <div className="text-start">
                <h6 className="mb-0 fw-bold">50000+</h6>
                <small className="text-muted">Vehicles</small>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="stat-box d-flex align-items-center justify-content-center gap-3">
              <div className="icon-box">
                <FaMapMarkerAlt />
              </div>
              <div className="text-start">
                <h6 className="mb-0 fw-bold">170+</h6>
                <small className="text-muted">Cities</small>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="stat-box d-flex align-items-center justify-content-center gap-3">
              <div className="icon-box">
                <FaStar />
              </div>
              <div className="text-start">
                <h6 className="mb-0 fw-bold">4.5</h6>
                <small className="text-muted">Rating</small>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="row text-center text-md-start mt-2">
          <div className="col-md-6">
            <p><FaCheck className="check-icon" /> Top Quality Cars</p>
            <p><FaCheck className="check-icon" /> Verified Drivers</p>
          </div>

          <div className="col-md-6">
            <p><FaCheck className="check-icon" /> No Hidden Charges</p>
            <p><FaCheck className="check-icon" /> Free Cancellation</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatsSection;