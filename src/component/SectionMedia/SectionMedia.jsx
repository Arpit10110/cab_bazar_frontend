import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./SectionMedia.css";

const MediaSection = () => {
  const cards = [
    {
      title:
        "CabBazar Redefines Intercity Travel in India with True One-Way Pricing",
      desc:
        "CabBazar's growth story mirrors the evolution of intercity travel in India...",
      source: "ANI",
    },
    {
      title:
        "Travel search and trends for Valentine’s Day decoded.",
      desc:
        "CabBazar, an online cab aggregator revealed interesting data points...",
      source: "ET Travel World",
    },
    {
      title:
        "How Cab Bazar is disrupting outstation travel segment",
      desc:
        "Speaking to CIOL, Founder & CMO shared views on CabBazar...",
      source: "CIOL",
    },
  ];

  const logos = [
    "/logo1.png",
    "/logo2.png",
    "/logo3.png",
    "/logo4.png",
  ];

  return (
    <div className="media-wrapper">
      <h2 className="media-title">CabBazar in Media</h2>

      {/* CARD SLIDER */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={cards.length > 3}   
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="card-swiper"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="media-card">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <div className="source">{card.source}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* LOGO SLIDER */}
      <div className="logo-section">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          autoplay={{ delay: 2000 }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {logos.map((logo, i) => (
            <SwiperSlide key={i}>
              <img src={logo} alt="logo" className="logo-img" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RIGHT YELLOW LINE */}
      <div className="right-yellow"></div>
    </div>
  );
};

export default MediaSection;