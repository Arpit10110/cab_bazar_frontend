import React, { useRef, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function getRazorpayKeyId() {
  const raw =
    import.meta.env.VITE_RAZORPAY_KEY_ID ?? import.meta.env.VITE_Razorpay_Test_Key_ID;
  return raw != null ? String(raw).trim() : "";
}

// ✅ FAQ Component (Separate Proper Component)
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[1100px] mx-auto p-4 mt-16 font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <h2 className="mb-4 font-semibold text-2xl text-[#222]">Frequently Asked Questions (FAQs)</h2>

      {faqData.map((item, index) => (
        <div
          key={index}
          className="mb-2.5 rounded-[10px] bg-[#f9f9f9] hover:bg-[#f1f1f1] shadow-[0_0_5px_rgba(0,0,0,0.1)] overflow-hidden cursor-pointer select-none transition-colors duration-300"
          onClick={() => toggle(index)}
        >
          <div className="py-[15px] px-5 font-[1000] text-base flex justify-between items-center">
            {item.question}
            <span
              className={`text-[#222] text-2xl transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
            >
              {openIndex === index ? "−" : "+"}
            </span>
          </div>

          <div
            className={`overflow-hidden transition-[max-height,padding] duration-400 ease-in-out text-[0.95rem] leading-normal text-[#555] whitespace-pre-line ${
              openIndex === index ? "max-h-[500px] p-[10px_20px_20px_20px]" : "max-h-0 px-5"
            }`}
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
  /** 'best' | 'inclusive' — same cab list for both until backend sends inclusive fares */
  const [priceView, setPriceView] = useState("best");
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    mobile: "",
    email: "",
    date: "",
    time: "",
    pickupAddress: "",
  });
  const paymentInFlight = useRef(false);

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

  const displayedCabs = cabdata;

  const createRazorpayOrder = async (pricevalue) => {
    try {
      const { data: res } = await axios.post(`${import.meta.env.VITE_API}/api/v1/createpayment-session`, {
        amount: pricevalue,
        user_data: bookingForm,
      });
      if (res.data?.success && res.data?.data?.order_id) {
        return res.data.data;
      }
      alert("something went wrong");
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
    return null;
  };

  const verifyPayment = async (payload) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/verify-payment`, payload);
      console.log(res.data);
      if (res.data.success) {
        const orderId = res.data.data?.order_id ?? payload.razorpay_order_id;
        alert("Payment Successful !!!");
        sendBookingData(orderId);
      } else {
        alert("Payment Failed !!!");
      }
    } catch (error) {
      console.log(error);
      alert("Something went Wrong !!!");
    }
  };

  const sendBookingData = async (orderId) => {
    try {
      const { data: res } = await axios.post(`${import.meta.env.VITE_API}/api/v1/booking`, {
        bookingForm: bookingForm,
        selectedCar: selectedCar,
        tripdata: data,
        orderId: orderId,
      });
      console.log(res);
      if (res.success) {
        alert("Booking Successful !!!");
        localStorage.clear();
        navigate("/");
      } else {
        alert("Booking Failed !!!");
      }
    } catch (error) {
      console.log(error);
      alert("Something went Wrong !!!");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (paymentInFlight.current) return;
    const keyId = getRazorpayKeyId();
    if (!keyId) {
      alert("Razorpay Key ID is missing. Add VITE_RAZORPAY_KEY_ID to your .env file.");
      return;
    }
    paymentInFlight.current = true;
    try {
      const scriptOk = await loadRazorpayScript();
      if (!scriptOk || !window.Razorpay) {
        alert("Unable to load payment SDK. Please refresh the page.");
        paymentInFlight.current = false;
        return;
      }
      const orderData = await createRazorpayOrder(selectedCar.price);
      if (!orderData) {
        paymentInFlight.current = false;
        return;
      }

      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "ByCab",
        description: "Cab booking payment",
        order_id: orderData.order_id,
        handler: (response) => {
          paymentInFlight.current = false;
          verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
        },
        prefill: {
          name: bookingForm.name,
          email: bookingForm.email,
          contact: bookingForm.mobile,
        },
        theme: { color: "#ffcc00" },
        modal: {
          ondismiss: () => {
            paymentInFlight.current = false;
          },
        },
      };

      const rz = new window.Razorpay(options);
      rz.on("payment.failed", () => {
        paymentInFlight.current = false;
        alert("Payment failed");
      });
      rz.open();
    } catch (error) {
      paymentInFlight.current = false;
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
        <div className="p-2.5 max-md:mx-auto" style={{ marginTop: "70px" }}>
          <div className="bg-black text-white p-5 rounded-[10px]">
            <div className="text-center font-bold mb-2.5">Trip Type : {data.tripType}</div>
            <div className="flex justify-center gap-2.5 font-medium flex-wrap">
              <span>{data.cities[0]}</span>
              <span>➜</span>
              <span>{data.cities[1]}</span>
            </div>
          </div>

          <div className="my-5 bg-[#ffcc00] p-5 rounded-[10px] flex justify-between items-center flex-wrap max-md:flex-col max-md:gap-2.5 max-md:text-center max-md:w-[320px] max-md:mx-auto">
            <div>
              <h3>Frequent Rider Plan</h3>
            </div>
            <button className="bg-black text-white border-none py-2.5 px-5 rounded-[20px] cursor-pointer">Buy Now</button>
          </div>

          <div className="flex mb-5 flex-wrap max-md:flex-col max-md:w-[320px] max-md:mx-auto rounded-[10px] overflow-hidden border border-[#e5e5e5]">
            <button
              type="button"
              className={`flex-1 p-3 border-none cursor-pointer font-bold transition-colors duration-200 min-h-[48px] max-md:text-sm ${
                priceView === "best" ? "bg-[#ffcc00] text-black" : "bg-[#ddd] text-[#333]"
              }`}
              onClick={() => setPriceView("best")}
              aria-pressed={priceView === "best"}
            >
              Best Price
            </button>
            <button
              type="button"
              className={`flex-1 p-3 border-none cursor-pointer font-bold transition-colors duration-200 min-h-[48px] max-md:text-sm leading-snug ${
                priceView === "inclusive" ? "bg-[#ffcc00] text-black" : "bg-[#ddd] text-[#333]"
              }`}
              onClick={() => setPriceView("inclusive")}
              aria-pressed={priceView === "inclusive"}
            >
              Toll, State tax Inclusive Price
            </button>
          </div>

          <p className="text-sm text-[#555] mb-4 max-md:text-center max-md:px-1">
            {priceView === "best"
              ? "Showing best price options."
              : "Showing toll & state tax inclusive prices (same options for now)."}
          </p>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {displayedCabs.map((car, index) => (
              <div
                className="bg-white rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex flex-col justify-between max-md:w-[320px] max-md:mx-auto"
                key={index}
              >
                <div className="relative w-full flex justify-center items-center">
                  <img src={car.img} alt="car" className="w-full max-w-[300px] h-auto object-contain max-md:max-w-[200px]" />
                  <img
                    src={car.img1}
                    alt="badge"
                    className="absolute -top-[55px] -left-[12px] w-[100px]! h-auto z-2 max-md:w-[60px]! max-md:-top-[40px] max-md:left-[60px]"
                  />
                </div>

                <div className="text-center my-[15px]">
                  <span className="line-through text-red-500 text-[14px]">₹ {car.oldPrice}</span>
                  <h2 className="text-green-600 my-1">₹ {car.price}</h2>
                  <p className="text-[13px] text-[#0077cc] font-bold">{car.type}</p>
                  <p className="text-[14px] mt-1">{car.name}</p>
                </div>

                <div className="[&>p]:text-[13px] [&>p]:my-1">
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

                <button
                  className="mt-[15px] p-3 bg-[#ffcc00] hover:bg-[#ffaa00] border-none rounded-[25px] font-bold cursor-pointer transition duration-300"
                  onClick={() => handleBookNowClick(car)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Booking Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-[5px] flex justify-center items-center z-1000 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white/95 p-[30px] max-h-[85vh] max-md:p-[24px_20px] max-md:max-h-[90vh] overflow-y-auto rounded-3xl w-[90%] z-100 max-w-[480px] relative shadow-[0_20px_40px_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(255,255,255,0.5)] animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
            <button
              className="absolute top-5 right-5 bg-[#f0f0f0] border-none text-[1.5rem] w-9 h-9 rounded-full flex justify-center items-center cursor-pointer text-[#666] transition-all duration-200 hover:bg-[#e0e0e0] hover:text-black hover:rotate-90"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3 className="mb-[25px] text-[1.75rem] font-extrabold text-[#1a1a1a] text-center tracking-[-0.5px]">
              Complete Your Booking
            </h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-[0.85rem] text-[#444] uppercase tracking-[0.5px]">Name</label>
                <input
                  type="text"
                  name="name"
                  value={bookingForm.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full p-[14px_18px] border-2 border-[#eee] rounded-xl text-[1rem] bg-[#fafafa] transition-all duration-200 focus:border-[#ffcc00] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/15"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-[0.85rem] text-[#444] uppercase tracking-[0.5px]">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={bookingForm.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                  required
                  className="w-full p-[14px_18px] border-2 border-[#eee] rounded-xl text-[1rem] bg-[#fafafa] transition-all duration-200 focus:border-[#ffcc00] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/15"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-[0.85rem] text-[#444] uppercase tracking-[0.5px]">Email</label>
                <input
                  type="text"
                  name="email"
                  value={bookingForm.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  required
                  className="w-full p-[14px_18px] border-2 border-[#eee] rounded-xl text-[1rem] bg-[#fafafa] transition-all duration-200 focus:border-[#ffcc00] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/15"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-[0.85rem] text-[#444] uppercase tracking-[0.5px]">Pickup Date</label>
                <input
                  type="date"
                  name="date"
                  value={bookingForm.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full p-[14px_18px] border-2 border-[#eee] rounded-xl text-[1rem] bg-[#fafafa] transition-all duration-200 focus:border-[#ffcc00] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/15"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-[0.85rem] text-[#444] uppercase tracking-[0.5px]">Pickup Time</label>
                <input
                  type="time"
                  name="time"
                  value={bookingForm.time}
                  onChange={handleInputChange}
                  required
                  className="w-full p-[14px_18px] border-2 border-[#eee] rounded-xl text-[1rem] bg-[#fafafa] transition-all duration-200 focus:border-[#ffcc00] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/15"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-[0.85rem] text-[#444] uppercase tracking-[0.5px]">
                  Pickup Address
                </label>
                <input
                  type="text"
                  name="pickupAddress"
                  value={bookingForm.pickupAddress}
                  onChange={handleInputChange}
                  placeholder="Enter specific pickup location"
                  required
                  className="w-full p-[14px_18px] border-2 border-[#eee] rounded-xl text-[1rem] bg-[#fafafa] transition-all duration-200 focus:border-[#ffcc00] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/15"
                />
              </div>
              <button
                type="submit"
                className="w-full p-[18px] bg-[#ffcc00] hover:bg-[#ffaa00] border-none rounded-[14px] text-[1.1rem] font-extrabold text-black cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] mt-[15px] hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(255,170,0,0.4)] active:-translate-y-px"
              >
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
