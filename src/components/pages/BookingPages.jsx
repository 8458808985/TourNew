import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Razorpay from "razorpay";
import BASE_URL from "@/Urls/baseUrl";
import { useSelector } from "react-redux";

//rezorepay

export default function BookingPages() {
  const [booking, setBooking] = useState({});
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState(0);
  const [data, setData] = useState({ name: "", email: "", phone: "" });
  const exchangeRates = useSelector((state) => state.exchange.exchangeRates);
  const selectedCurrency = useSelector(
    (state) => state.exchange.selectedCurrency
  );

  const convert = (amount, rate) => {
    return (amount * rate).toFixed(2);
  };

  const convertCurrency = (price, currency, exchangeRates) => {
    if (currency === "INR") {
      return `RS ${price}`;
    } else {
      return `${convert(price, exchangeRates[currency] || 1)} ${currency}`;
    }
  };



  useEffect(() => {
    const bookingDataString = localStorage.getItem("bookingData");
    try {
      const bookingData = JSON.parse(bookingDataString);
      setBooking(bookingData);
    } catch (error) {
      console.error("Error parsing booking data:", error);
    }
  }, []);

  useEffect(() => {
    const date = localStorage.getItem("selectedDate");
    setDate(date);
  }, []);
  
  useEffect(() => {
    const userData = localStorage.getItem("userName");
    setUserName(userData);
      }, []);



  useEffect(() => {
    const price = localStorage.getItem("newPrice");
    try {
      const newPrice = JSON.parse(price);
      setPrice(newPrice);
    } catch (error) {
      console.error("Error parsing booking data:", error);
    }
  }, []);

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(`${BASE_URL}/booking`, data);

      if (response.status === 200) {
        toast.success("Your Booking is Confirmed!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkoutHandler = async (amount) => {
    try {
      const { data: { key } } = await axios.get("https://test1.buyjugaad.com/api/getkey");

      const { data: { order } } = await axios.post("https://test1.buyjugaad.com/api/v1/checkout", {
        amount
      });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: userName,
        description: "Tutorial of RazorPay",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: "https://test1.buyjugaad.com/api/v1/paymentverification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999"
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#121212"
        }
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error in checkoutHandler", error);
    }
  }

  return (
    <section className="layout-pt-md layout-pb-lg mt-header">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 col-sm-8">
            <div className="border-1 rounded-12 shadow-2 py-1 px-30 md:py-20 md:px-20 mt-30">
              <div>
                <h2 className="text-20 md:text-20 fw-700 text-black mt-4">
                  Contact Details
                </h2>
                <p className="text-6 md:text-20 fw-500 text-black mb-2">
                  {" "}
                  We'll use this information to send you confirmation and
                  updates about your booking
                </p>
           
                <form onSubmit={handleSubmit} name="formrv">
                  <div className="row y-gap-30 contactForm pt-30">
                    <div className="col-md-6 col-lg-6 col-6">
                      <div className="form-input">
                        <input
                          type="text"
                          required
                          name="name"
                          onChange={inputHandler}
                        />
                        <label className="lh-1 text-16 text-light-1">
                          First Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-6">
                      <div className="form-input">
                        <input
                          type="text"
                          required
                          name="lastname"
                          onChange={inputHandler}
                        />
                        <label className="lh-1 text-16 text-light-1">
                          Last Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12 col-12 col-sm-12 col-lg-12">
                      <div className="form-input">
                        <input
                          type="text"
                          required
                          name="email"
                          onChange={inputHandler}
                        />
                        <label className="lh-1 text-16 text-light-1">
                          Email
                        </label>
                      </div>
                    </div>

                    <div className="col-md-12 col-12 col-sm-12 col-lg-12">
                      <div className="input-group mb-3">
                        <button
                          className="btn btn-outline-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          +91
                        </button>
                        
                        <ul className="dropdown-menu">
                
                        </ul>
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          aria-label="Text input with dropdown button"
                          onChange={inputHandler}
                          placeholder="Enter Your Phone Number"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-12">
                    <button
                      className="button -md -dark-1 bg-accent-1 text-white col-12 mt-4 mb-4 mx-auto"
                      type="submit" onClick={() => checkoutHandler(price)}
                      // {convertCurrency(
                      //   elm.adultNewPrice,
                      //   selectedCurrency,
                      //   exchangeRates
                      // )}
                    >
                      Complete My Order
                      <i className="icon-arrow-top-right text-16 ml-10"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-4 col-12 mt-4">
            <div className="border-1 pl-50 md:pl-0 shadow rounded-3">
              <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20">
                <h2 className="text-20 fw-500">Your booking details</h2>

                <div className=" mt-30">
                  <span style={{ width: "50px", height: "50px" }}>
                    {booking &&
                    booking.imageSrc &&
                    booking.imageSrc.length > 0 ? (
                      <img
                        src={booking.imageSrc[0]}
                        alt="image"
                        className="rounded-3 w-100"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </span>

                  <div className="ml-2 mt-5">
                    <span className="fs-5"> {booking.product}</span>
                  </div>
                </div>

                <div className="line mt-20 mb-20"></div>

                <div className="">
                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Date:</div>
                    <div className="">{date}</div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Duration:</div>
                    <div className="">{booking.duration}</div>
                  </div>
                </div>

                <div className="line mt-20 mb-20"></div>

                <div className="">
                  <div className="d-flex items-center justify-between">
                    <div className="fw-700">Subtotal</div>
                    <div className="mb-">Rs {convertCurrency(
                                price,
                                selectedCurrency,
                                exchangeRates
                              )}</div>
                  </div>
                </div>
                    {/* <button className="btn btn-info w-100 mt-4" onClick={() => checkoutHandler(price)}>Pay Now</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
