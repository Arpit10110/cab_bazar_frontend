
import "./OutstationSection.css";
import car from "/image/car.jpg";
const OutstationSection = () => {
  return (
    <section className="outstation-section">

        
      {/* LEFT YELLOW STRIP */}
       <div className="yellow-line-left"></div>

      
      <div className="container">
        <div className="row align-items-center">
 <h1 className="main-heading">
              Best  outstation  <span style={{color:"#fbbf24"}}>taxi service</span> 
              </h1>
          {/* LEFT CONTENT */}
          <div className="col-lg-6 mb-4 left-sec mb-lg-0">
<div className="content-box">
 

  <div className="feature">
    <h5>One-Way Cab Fare</h5>
    <p>
      Pay only for your journey. No return charges, and minimal advance booking.
    </p>
  </div>

  <div className="feature">
    <h5>Wide Cab Availability</h5>
    <p>
      Access a large fleet of cabs anytime, available across all routes and seasons.
    </p>
  </div>

  <div className="feature">
    <h5>Assured Luggage Space</h5>
    <p>
      Spacious boot or carrier available. Travel hassle-free without worrying about luggage space.
    </p>
  </div>

  <div className="feature">
    <h5>Pet-Friendly Cabs</h5>
    <p>
      Travel comfortably with your pets. Suitable for dogs, cats, and birds.
    </p>
  </div>

  <button className="book-btn">
    Book Your Cab Now
  </button>
</div>
          </div>

          {/* RIGHT VIDEO */}
          <div className="col-lg-6 right-sec">
            <div className="video-wrapper">
              <iframe
                className="video-frame"
            img={car}
                title="CabBazar Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>

              <img  className="video-frame"
          
                title="CabBazar Video"
                frameBorder="0"
                allowFullScreen src={car} alt="" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OutstationSection;