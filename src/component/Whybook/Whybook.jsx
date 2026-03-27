import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Whybook.css";
import { FaHeadset, FaLock, FaBolt, FaUsers, FaHeart } from "react-icons/fa";

const features = [
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "We’re here for your smooth ride",
  },
  {
    icon: <FaLock />,
    title: "Secure Booking",
    desc: "Your data secured with latest standards",
  },
//   {
//     icon: <FaBolt />,
//     title: "Instant Refund",
//     desc: "Get instant refunds effortlessly on your travel bookings.",
//   },
  {
    icon: <FaUsers />,
    title: "Trusted Service",
    desc: "Proudly earned 4.8/5 stars on the App Store.",
  },
  {
    icon: <FaHeart />,
    title: "3k+ Members",
    desc: "Millions of happy users worldwide rely on us.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="why-wrapper py-3">
      <div className="container">
        <h4 className="fw-bold main-heading   d-block w-100">Why Book <span style={{color:"#fbbf24"}}>  With Us? </span> </h4>

        <div className="features-grid">
          {features.map((item, index) => (
            <div key={index} className="why-card-item">
              <div className="icon-circle">
                {item.icon}
              </div>
              <div className="feature-content">
                <h6 className="feature-title fw-bold">{item.title}</h6>
                <p className="feature-desc mb-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;