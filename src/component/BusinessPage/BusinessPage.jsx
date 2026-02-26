import React from "react";
import "./BusinessPage.css";
import { useForm, ValidationError } from '@formspree/react';
const BusinessPage = () => {
  const [state, handleSubmit] = useForm("xbdazndy");
  if (state.succeeded) {
      return alert("Form Submited Successfully");
  }
  return (
    <div className="business-container">

      {/* LEFT YELLOW STRIP */}
      <div className="yellow-strip"></div>

      {/* LEFT FORM SECTION */}
      <div className="form-section">
        <h1>ByCab for Business</h1>

        <h3>One way cab for Corporate travel</h3>

        <p>
          Save big on company's commute costs with ByCab’s one way cab fare
          for outstation travel !!!
        </p>

        <form onSubmit={handleSubmit} className="business-form">
          <label>Company Name</label>
          <input id="companyname" name="companyname" type="text" placeholder="Enter company name" />

          <label>Name</label>
          <input id="name" name="name" type="text" placeholder="Enter your name" />

          <label>Email</label>
          <input type="email" name="email" id="email" placeholder="Enter your email id" />

          <label>Phone</label>
          <input type="tel" name="phone" id="phone" placeholder="Enter your phone number" />

          <button type="submit">Request Callback</button>
        </form>
      </div>

      {/* RIGHT PROMO SECTION */}
      <div className="promo-section">
        <div className="promo-card">
          <h2>One Way Cab For</h2>
          <h1>Corporate Travel</h1>

          <p>
            Save big on company commute costs with ByCab’s one way cab fare
            for outstation travel !!!
          </p>

          <div className="yellow-badge">
            For one way travel, Pay for one way only
          </div>

          <img
            src="https://images.unsplash.com/photo-1549924231-f129b911e442"
            alt="Car"
            className="car-image"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;