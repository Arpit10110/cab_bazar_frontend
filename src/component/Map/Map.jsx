import React from 'react';
import './Map.css';

const BookingProcess = () => {
  const steps = [
    { id: '01', title: 'Select City ', img: 'https://www.mychoize.com/assets/img/Step_01.png', color: '#e8f5e9' },
    { id: '02', title: 'Select Travel date', img: 'https://www.mychoize.com/assets/img/Step_02.png', color: '#e3f2fd' },
    { id: '03', title: 'Choose car ', img: 'https://www.mychoize.com/assets/img/Step_03.png', color: '#ffebee' },
    { id: '04', title: 'Make Payment', img: 'https://www.mychoize.com/assets/img/Step_04.png', color: '#fff8e1' },
  ];

  return (
    <section className="booking-section ">
      <div className="container">
        <div class="">
          <h2 class="main-heading">How to <span style={{color:"#fbbf24"}}> Book Car</span> Online </h2>
          <p>Craving freedom on your Delhi adventure? 
 Skip the cabs and book a self-drive car in Delhi with MyChoize! Explore the capital city by avoiding rigid schedules and creating
  unforgettable memories - 
</p>
</div>
        
        {/* Desktop View: ZigZag */}
        <div className="desktop-zigzag">
          <svg className="zigzag-svg" viewBox="0 0 1000 200" fill="none">
            <path 
              d="M50,100 C150,0 250,200 350,100 C450,0 550,200 650,100 C750,0 850,200 950,100" 
              stroke="#e0e0e0" strokeWidth="3" strokeDasharray="8 8" 
            />
          </svg>

          {steps.map((step) => (
            <div key={step.id} className="step-card">
              <div className="icon-box" style={{ backgroundColor: step.color }}>
                <img src={step.img} alt={step.title} />
              </div>
              <span className="step-num">{step.id}</span>
              <p className="step-text">{step.title}</p>
            </div>
          ))}
        </div>

        {/* Mobile View: 2x2 Grid */}
        <div className="mobile-grid">
          {steps.map((step, index) => (
            <div key={step.id} className={`m-step step-${index + 1}`}>
              <div className="m-step-top">
                <span className="m-num">{index + 1}</span>
              </div>
              <p className="mb-0 text-dark fw-bold" style={{fontSize: '0.85rem'}}>{step.title}</p>
              <img src={step.img} alt={step.title} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BookingProcess;