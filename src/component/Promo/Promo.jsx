import React, { useRef, useState } from "react";
import "./Promo.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {load} from '@cashfreepayments/cashfree-js'

const faqData = [
  {
    question: "Is local sightseeing included in outstation trip?",
    answer: `For Round trip bookings, all the local sightseeing in mentioned cities is included.
For One way Multi-stop trip, all the local sightseeing in mentioned cities is included.
For One way trip, with only one pickup and one drop, sightseeing is not included.`,
  },
  { question: "How to change pickup date, time and return date?", answer: "" },
  {
    question:
      "Are Driver charges / Driver bata included in the price? Do i need to arrange for Driver food and accomodation during the trip?",
    answer: "",
  },
  { question: "What are extra charges if i need to travel in night hours?", answer: "" },
  { question: "Please tell me any extra charge other than the price shown above.", answer: "" },
  { question: "How much before departure, i have to book the cab?", answer: "" },
  { question: "Can I book cab by calling customer support?", answer: "" },
];


// ✅ FAQ Component (Separate Proper Component)
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "auto", padding: "1rem", marginTop: "4rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Frequently Asked Questions (FAQs)</h2>

      {faqData.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "10px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => toggle(index)}
        >
          <div
            style={{
              padding: "15px 20px",
              fontWeight: "500",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {item.question}
            <span style={{ fontSize: "1.5rem" }}>
              {openIndex === index ? "−" : "+"}
            </span>
          </div>

          <div
            style={{
              maxHeight: openIndex === index ? "500px" : "0",
              overflow: "hidden",
              transition: "0.3s",
              padding: openIndex === index ? "10px 20px" : "0 20px",
              whiteSpace: "pre-line",
            }}
          >
            {item.answer || "Answer coming soon."}
          </div>
        </div>
      ))}
    </div>
  );
}


// ✅ MAIN COMPONENT (Promo Page)
function Promo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [cabdata, setCabdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    mobile: "",
    email:"",
    date: "",
    time: "",
    pickupAddress: "",
  });
   const cashfreeRef = useRef(null)
     const initializeSDK = async () => {
        try {
        // Use "production" for production and "sandbox" for local
        const instance = await load({ mode: "sandbox" })
        // const instance = await load({ mode: "sandbox" })
        cashfreeRef.current = instance
        } catch (e) {
        console.error("Cashfree SDK load failed", e)
        ToastErrorHandler("Unable to load payment SDK. Please refresh the page.")
        }
        }

  const getcabdetails = async (data) => {
    try {
      const { data: res } = await axios.post(`${import.meta.env.VITE_API}/api/v1/getcabdetails`, {
        cities: data.cities,
        tripType: data.tripType,
        tripModel: data.tripModel,
        mobile: data.mobile,
      });
      console.log(res);
      setCabdata(res);
    } catch (error) {
      console.error("Error fetching cab details:", error);
    }
  };

  useEffect(() => {
    const bookingdata = localStorage.getItem("bookingdata");
    if (bookingdata) {
      const parsedData = JSON.parse(bookingdata);
      setData(parsedData);
      setBookingForm((prev) => ({ ...prev, mobile: parsedData.mobile || "" }));
      getcabdetails(parsedData);
    } else {
      navigate("/");
    }
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookNowClick = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const getSessionId = async(pricevalue)=>{
    try {
      const {data:res} = await axios.post(`${import.meta.env.VITE_API}/api/v1/createpayment-session`,{
        amount:pricevalue,
        user_data:bookingForm
      })
      if(res.data.success){
            const orderId = res.data.data.order_id
            console.log(res.data.data.payment_session_id);
            return {sessionId:res.data.data.payment_session_id,orderId:orderId}
          }else{
          alert("something went wrong");
          }
    } catch (error) {
      console.log(error);
          alert("something went wrong");

    }
  }

   const verifyPayment = async (orderId) => {
        try {
          let res = await axios.post(`${import.meta.env.VITE_API}/api/v1/verify-payment`, {
            orderId: orderId,
          })
          console.log(res.data)
          if(res.data.success){
            alert("Payment Successful !!!")
            sendBookingData(orderId)
          }else{
            alert("Payment Failed !!!");
          }
    
        } catch (error) {
          console.log(error)
          alert("Something went Wrong !!!");
        }
      }
  
  const sendBookingData = async(orderId)=>{
    try {
      const {data:res} = await axios.post(`${import.meta.env.VITE_API}/api/v1/booking`,{
        bookingForm:bookingForm,
        selectedCar:selectedCar,
        tripdata:data,
        orderId:orderId
      })
      console.log(res)
      if(res.success){
        alert("Booking Successful !!!")
        localStorage.clear()
        navigate("/")
      }else{
        alert("Booking Failed !!!");
      }
    } catch (error) {
      console.log(error)
      alert("Something went Wrong !!!");
    }
  }
  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try {
        if (!cashfreeRef.current) {
            await initializeSDK()
            }
            if (!cashfreeRef.current) {
            alert("Payment Gateway not ready. Please try again in a moment.")
            return
            }
            let {sessionId,orderId} = await getSessionId(selectedCar.price)
            let checkoutOptions = {
                paymentSessionId : sessionId,
                redirectTarget:"_modal",
            }
             const payment_result = await cashfreeRef.current.checkout(checkoutOptions)
             if(payment_result.paymentDetails){
                console.log(payment_result.paymentDetails)
                verifyPayment(orderId)
               }else{
                alert("payment failed")
               }
    } catch (error) {
      console.log(error);
          alert("something went wrong");
    }
  };
  return (
    <>
      <Navbar />
      {loading ? (
        <div>Loading...</div>
      ) : data === null ? (
        <div></div>
      ) : (
        <div className="container" style={{ marginTop: "70px" }}>
          <div className="header">
            <div className="trip">Trip Type : {data.tripType}</div>
            <div className="route">
              <span>{data.cities[0]}</span>
              <span>➜</span>
              <span>{data.cities[1]}</span>
            </div>
          </div>

          <div className="offer">
            <div>
              <h3>Frequent Rider Plan</h3>
              <p>Flat ₹200 off on every ride</p>
            </div>
            <button>Buy Now</button>
          </div>

          <div className="tabs">
            <button className="active">Best Price</button>
            <button>Toll, State tax Inclusive Price</button>
          </div>

          <div className="card-grid">
            {cabdata.map((car, index) => (
              <div className="card" key={index}>
                <div className="car-image-wrapper">
                  <img src={car.img} alt="car" className="car-img" />
                  <img src={car.img1} alt="badge" className="badge-img" />
                </div>

                <div className="price-section">
                  <span className="old">₹ {car.oldPrice}</span>
                  <h2>₹ {car.price}</h2>
                  <p className="type">{car.type}</p>
                  <p className="name">{car.name}</p>
                </div>

                <div className="details">
                  <p>
                    <strong>Included Km:</strong> 10 Km
                  </p>
                  <p>
                    <strong>Extra fare/Km:</strong> {car.extra}
                  </p>
                  <p>
                    <strong>Fuel Charges:</strong> Included
                  </p>
                  <p>
                    <strong>Driver Charges:</strong> Included
                  </p>
                  <p>
                    <strong>Night Charges:</strong> Included
                  </p>
                </div>

                <button className="book-btn" onClick={() => handleBookNowClick(car)}>
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Booking Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h3>Complete Your Booking</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={bookingForm.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={bookingForm.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={bookingForm.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Pickup Date</label>
                <input
                  type="date"
                  name="date"
                  value={bookingForm.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label>Pickup Time</label>
                <input
                  type="time"
                  name="time"
                  value={bookingForm.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Pickup Address</label>
                <input
                  type="text"
                  name="pickupAddress"
                  value={bookingForm.pickupAddress}
                  onChange={handleInputChange}
                  placeholder="Enter specific pickup location"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ FAQ yaha render hoga */}
      <FAQ />

      <Footer />
    </>
  );
}

export default Promo;
