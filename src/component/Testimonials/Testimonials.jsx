import React, { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import rev1 from "/image/rev1.jpg";
import rev2 from "/image/rev2.jpg";
import rev3 from "/image/rev3.jpg";
import rev4 from "/image/rev4.jpg";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Melbin Jose",
    city: "Gurgaon",
    img: rev1,
    review: "Best deals and smooth rides. Booking is quick and hassle-free.",
    rating: 4,
  },
  {
    name: "Hema Purohit",
    city: "New Delhi",
    img: rev2,
    review: "Comfortable ride and timely pickup. Great experience overall.",
    rating: 4,
  },
  {
    name: "Karanvir Singh",
    city: "Jalandhar",
    img: rev3,
    review: "Clean cab, polite driver and smooth journey.",
    rating: 5,
  },
  {
    name: "Rahul Sharma",
    city: "Jaipur",
    img:rev4,
    review: "Affordable pricing and easy booking process.",
    rating: 5,
  },
];

const Testimonial = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2 },
      },
      "(max-width: 768px)": {
        slides: { perView: 1 },
      },
    },
  });

  // 🔥 AUTO PLAY
  useEffect(() => {
    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div className="testimonial-section  py-5 ">
     <div className="container"> <h2 className="main-heading ">
        Our{" "}
        <span style={{ color: "#f4b400" }}>Happy Customers!</span>
      </h2>

      <div ref={sliderRef} className="keen-slider py-3">
        {testimonials.map((item, index) => (
          <div key={index} className="keen-slider__slide">
            <div className="testimonial-card">
              <img src={item.img} alt="" className="profile-img" />

              <h5 className="mt-4 fw-bold">{item.name}</h5>
              <p className="text-muted">{item.city}</p>

              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < item.rating ? "⭐" : "☆"}
                  </span>
                ))}
              </div>

              <p className="review mt-3">"{item.review}"</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Testimonial;