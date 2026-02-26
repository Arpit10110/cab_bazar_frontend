import React, { useState, useEffect } from "react";
import "./PopularRoutes.css";

const routesData = [
  {
    id: 1,
    title: "Bangalore to Ooty",
    distance: "280 km",
    time: "6.5 hrs",
    attractions:
      "Toy Train Ride • Botanical Garden • Ooty Lake • Rose Garden",
  },
  {
    id: 2,
    title: "Delhi to Manali",
    distance: "540 km",
    time: "12 hrs",
    attractions:
      "Solang Valley • Rohtang Pass • Hadimba Temple • Mall Road",
  },
  {
    id: 3,
    title: "Mumbai to Shirdi",
    distance: "240 km",
    time: "5 hrs",
    attractions:
      "Sai Baba Temple • Dwarkamai • Chavadi • Gurusthan",
  },
];

const carouselImages = [
  "https://images.unsplash.com/photo-1597045566677-8cf032ed6634",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1597045566677-8cf032ed6634",
];

const PopularRoutes = () => {
  const [activeRoute, setActiveRoute] = useState(routesData[0]);
  const [currentImage, setCurrentImage] = useState(0);

  // Auto image change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="popular-routes">
      
      {/* LEFT SIDE CAROUSEL */}
      <div className="left-side">
        <img
          src={carouselImages[currentImage]}
          alt="Route"
          className="carousel-img"
        />

        {/* Dots */}
        <div className="carousel-dots">
          {carouselImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${
                currentImage === index ? "active-dot" : ""
              }`}
              onClick={() => setCurrentImage(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="right-side">
        <h1>Popular Cab Routes</h1>

        <div className="routes-grid">
          {routesData.map((route) => (
            <p
              key={route.id}
              className={`route-link ${
                activeRoute.id === route.id ? "active-route" : ""
              }`}
              onClick={() => setActiveRoute(route)}
            >
              Outstation cab from {route.title}
            </p>
          ))}
        </div>

        <div className="route-info">
          <span>Distance: {activeRoute.distance}</span>
          <span>Estimated Time: {activeRoute.time}</span>
        </div>

        <p className="attractions">
          <strong>TOURIST ATTRACTIONS:</strong>{" "}
          {activeRoute.attractions}
        </p>

        <button className="book-btn">BOOK A CAB</button>
      </div>

      {/* Yellow Right Strip */}
      <div className="yellow-line"></div>
    </section>
  );
};

export default PopularRoutes;