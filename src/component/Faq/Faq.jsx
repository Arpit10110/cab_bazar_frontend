import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import './Faq.css';

const faqs = [
  {
    question: "What do MyChoize Car rental service provides in Delhi?",
    answer: "We provide a wide range of self-drive cars including hatchbacks, sedans, and SUVs with unlimited kilometers and zero hidden charges.",
  },
  {
    question: "Which mode of payment is available for renting a car in Delhi?",
    answer: "You can pay via Credit Cards, Debit Cards, Net Banking, and popular UPI apps like GPay, PhonePe, and Paytm.",
  },
  {
    question: "How does MyChoize car rental service works in Delhi?",
    answer: "Simply select your dates, choose a car, upload your documents for verification, make the payment, and pick up your car or get it delivered.",
  },
  {
    question: "What documents do I need to rent a car in Delhi?",
    answer: "You need a valid Original Driving License and a Government-approved ID proof (Aadhar Card or Passport).",
  },
];

const FAQSection = () => {
  return (
    <section className="faq-container ">
      <div className="container" >
        
        {/* Header with dots like the image */}
        <div className=" ">
          <div className="faq-title-wrapper">
            <h2 className=" main-heading  p-3 ">FAQ's</h2>
            <div className="dot-decoration d-none"></div>
          </div>
        </div>

        {/* Floating Accordion List */}
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={index} className="faq-card-item mb-3">
              <summary className="d-flex justify-content-between align-items-center">
                <span className="faq-question">{item.question}</span>
                <div className="icon-box">
                  <FaPlus className="plus-icon" />
                  <FaMinus className="minus-icon" />
                </div>
              </summary>
              <div className="faq-answer-content">
                <hr className="my-2 opacity-10" />
                <p className="mb-0 text-muted">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;