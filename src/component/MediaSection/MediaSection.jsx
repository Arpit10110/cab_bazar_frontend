import React from "react";
import Slider from "react-slick";
import "./MediaSection.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const newsData = [
  {
    logo: "https://cabbazar.com/assets/img/people/et-logo.png",
    title:
      "Travel search and trends for Valentine’s Day decoded: Find out where Indians travelled?",
    desc:
      "ByCab revealed interesting data points highlighting rising demand for road trips and travel trends across India.",
    source: "ET Travel World",
    group: "The Times Group"
    
  },
  {
    logo: "https://cabbazar.com/assets/img/people/cyber-media.png",
    title:
      "How Cab Bazar is disrupting outstation travel segment leveraging technology",
    desc:
      "ByCab is providing both inter & intra city One-way drops and round trips in Pan India.",
    source: "CIOL",
    group: "CyberMedia Group"
  },
  {
    logo: "https://cabbazar.com/assets/img/people/bw-logo.png",
    title:
      "Google Campaigns - The Next New For ByCab ",
    desc:
      "ByCab  talks about expansion plans and increasing Google campaign budgets.",
    source: "BW Marketing World",
    group: "BW Business World Publication"
  },
   {
    logo: "https://cabbazar.com/assets/img/people/business_world.png",
    title:
      "Google Campaigns - The Next New For ByCab ",
    desc:
      "ByCab  talks about expansion plans and increasing Google campaign budgets.",
    source: "BW Marketing World",
    group: "BW Business World Publication"
  }
];

const MediaSection = () => {

  const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};
  return (
    <section className="media-section">
      <div className="media-container">

        <h2 className="media-heading">ByCab  in Media</h2>

        <Slider {...settings}>
          {newsData.map((item, index) => (
            <div key={index}>
              <div className="media-card">
                <div className="media-logo-box">
                  <img src={item.logo} alt="logo" />
                </div>

                <a href="https://www.ciol.com/startup-circle-how-cab-bazar-is-disrupting-outstation-travel-segment-leveraging-technology-to-connect-riders-making-one-way-fare-outstation-cab-feasible/" className="media-title">
                  {item.title}
                </a>

                <p className="media-desc">{item.desc}</p>

                <div className="media-footer">
                  <strong>{item.source}</strong>
                  <span>{item.group}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>

      </div>

      <div className="media-right-bar"></div>
    </section>
  );
};

export default MediaSection;