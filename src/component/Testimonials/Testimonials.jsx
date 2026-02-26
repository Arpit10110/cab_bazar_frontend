import React, { useState } from "react";
import "./Testimonials.css";

const customers = [
  {
    id: 1,
    name: "Saloni Gupta",
    location: "New Delhi, Delhi",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    review:
      "Cab service was smooth and driver was polite. Everything went perfectly and on time.",
  },
  {
    id: 2,
    name: "Ankita Mahawar",
    location: "Pune, Maharashtra",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "The service was excellent- thankyou. My driver was waiting at arrival for me with clear sign. He introduced himself, was very polite and friendly and drove me without delay. I will definitely use your service again. Your service and reliability made a long stressful journey end positively. Everything went perfectly! I will be pleased to recommend this service to my family and friends.",
  },
  {
    id: 3,
    name: "Harshit",
    location: "Bengaluru, Karnataka",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Very professional service. Booking process was easy and journey was comfortable.",
  },
];

const Testimonials = () => {
  const [activeCustomer, setActiveCustomer] = useState(customers[1]);

  return (
    <section className="testimonial-section">
      
      
      {/* Main Content */}
      <div className="testimonial-content">
        <h1>Meet CabBazar Satisfied Customers</h1>

        {/* Top Profiles */}
        <div className="customer-row">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className={`customer-item ${
                activeCustomer.id === customer.id ? "active" : ""
              }`}
              onClick={() => setActiveCustomer(customer)}
            >
              <img src={customer.image} alt={customer.name} />
              <div>
                <p className="customer-name">{customer.name}</p>
                <span className="customer-location">
                  {customer.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Review Section */}
        <div className="review-section">
          <img
            src={activeCustomer.image}
            alt={activeCustomer.name}
            className="large-image"
          />

          <div className="review-text">
            <p>{activeCustomer.review}</p>

            <h4>{activeCustomer.name}</h4>
            <span>{activeCustomer.location}</span>
          </div>
        </div>
      </div>

     <div className="yellow-line"></div>
    </section>
  );
};

export default Testimonials;