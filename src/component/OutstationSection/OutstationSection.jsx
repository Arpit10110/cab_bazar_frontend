
import "./OutstationSection.css";

const OutstationSection = () => {
  return (
    <section className="outstation-section">

        
      {/* LEFT YELLOW STRIP */}
       <div className="yellow-line-left"></div>

      
      <div className="container">
        <div className="row align-items-center">
 <h1 className="main-title">
                CabBazar - Best outstation taxi service in India
              </h1>
          {/* LEFT CONTENT */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="content-box">
              {/* <h1 className="main-title">
                CabBazar - Best outstation taxi service in India
              </h1> */}

              <div className="feature">
                <h5>One-Way cab fare</h5>
                <p>
                  No return fare • No over-pricing • No hidden charges • Minimal advance
                </p>
              </div>

              <div className="feature">
                <h5>Cabs availability</h5>
                <p>
                  No last minute surprises • Large pool of cabs • All seasons, All routes cab for outstation
                </p>
              </div>

              <div className="feature">
                <h5>Assured Luggage Space</h5>
                <p>
                  Either carrier or boot space • No worries of CNG car boot space
                </p>
              </div>

              <div className="feature">
                <h5>Pet Friendly Cab</h5>
                <p>
                  Travel with your loved ones • Dog / Cat / Birds
                </p>
              </div>

              <button className="book-btn">
                BOOK OUTSTATION CAB
              </button>
            </div>
          </div>

          {/* RIGHT VIDEO */}
          <div className="col-lg-6">
            <div className="video-wrapper">
              <iframe
                className="video-frame"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="CabBazar Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OutstationSection;