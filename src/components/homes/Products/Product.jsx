import Stars from "@/components/common/Stars";
import { tourData } from "@/data/tours";

import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BASE_URL from "@/Urls/baseUrl";
import { useSelector } from "react-redux";

export default function Product({ elm, data }) {
  const [showFullTitle, setShowFullTitle] = useState(false);
  // console.log("Home", data)
  const toggleTitle = () => {
    setShowFullTitle(!showFullTitle);
  };
  const [productData, setProductData] = useState([]);
  // const [amount, setAmount] = useState(1);

  useEffect(() => {
    fetch(`${BASE_URL}/product`)
      .then((res) => res.json())
      .then((data) => setProductData(data))
      .catch((err) => console.error("Error fetching tours:", err));
  }, []);

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

  const reversedProductData = productData
    .map((elm) => ({
      ...elm,
      adultPrice: elm.discount ? elm.adultNewPrice : elm.adultOldPrice,
    }))
    .reverse()
    .slice(0, 20);

  return (
    <section className="layout-pt-xl layout-pb-xl">
      <div className="container">
        <div className="row justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2
              data-aos="fade-right"
              data-aos-delay=""
              className=""
              style={{ fontSize: "22px" }}
            >
              The world's best experiences curated just for you
            </h2>
          </div>

          <div className="col-auto">
            <Link
              to={"/tour-list-1"}
              data-aos="fade-left"
              data-aos-delay=""
              className="buttonArrow d-flex items-center "
            >
              <span
                className="px-3 rounded-3 text-dark"
                style={{ fontWeight: "400", fontSize: "15px", color: "black" }}
              >
                See all{" "}
                <i
                  className="icon-arrow-top-right mt-2 mx-1"
                  style={{
                    color: "black",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                ></i>
              </span>
            </Link>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay=""
          className="row y-gap-30 justify-between pt-40 sm:pt-20 mobile-css-slider -w-300"
        >
          {data.length === 0
            ? reversedProductData.map((elm, i) => (
                <div key={elm._id} className="col-lg-3 col-md-6">
                  <Link
                    to={`/tour-single-1/${elm._id}`}
                    className="tourCard -type-1 py-10 px-10 border-1 rounded-12 -hover-shadow border-0 shadow"
                  >
                    <div className="tourCard__header">
                      <div className="tourCard__image ratio ratio-28:20">
                        <div
                          id={`carouselExample${i}`}
                          className="carousel slide"
                        >
                          <div className="carousel-inner">
                            {elm.imageSrc.map((src, index) => (
                              <div
                                key={index}
                                className={`carousel-item ${
                                  index === 0 ? "active" : ""
                                }`}
                              >
                                <img
                                  src={src}
                                  className="d-block w-100 "
                                  style={{ height: "170px" }}
                                  alt={`Image ${index + 1}`}
                                />
                              </div>
                            ))}
                          </div>
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#carouselExample${i}`} // Use unique ID for data-bs-target
                            data-bs-slide="prev"
                          >
                            <span
                              className="carousel-control-prev-icon"
                              aria-hidden="true"
                            />
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#carouselExample${i}`} // Use unique ID for data-bs-target
                            data-bs-slide="next"
                          >
                            <span
                              className="carousel-control-next-icon"
                              aria-hidden="true"
                            />
                            <span className="visually-hidden">Next</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="tourCard__content px-10 pt-10">
                      <div className="tourCard__location d-flex items-center text-13 text-light-2">
                        <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                        <span style={{ fontSize: "12px", fontWeight: "700" }}>
                          {elm.country} ({elm.city}){" "}
                        </span>
                      </div>
                      <div style={{ height: "35px" }}>
                        <h3 className="tourCard__title text-16 fw-500 mt-5">
                          <span style={{ fontSize: "15px", fontWeight: "700" }}>
                            {showFullTitle < 3
                              ? elm.product
                              : `${elm.product.substring(0, 10)}...`}
                          </span>
                          {elm.product.length > 20 && (
                            <button
                              onClick={toggleTitle}
                              className="btn-link"
                            ></button>
                          )}
                        </h3>
                      </div>
                      <div className="tourCard__rating d-flex items-center text-13 mt-5">
                        <div
                          className="d-flex x-gap-5"
                          style={{ fontSize: "18px", fontWeight: "900" }}
                        >
                          <Stars star={elm.rating} />
                        </div>
                      </div>
                      <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                        <div
                          className="d-flex items-center"
                          style={{ fontSize: "10px", fontWeight: "700" }}
                        >
                          <p
                            className="px-1 rounded-3"
                            style={{
                              backgroundColor: "green",
                              color: "white",
                              fontSize: "12px",
                              fontWeight: "700",
                            }}
                          >
                            Save Up to {elm.discount}%{" "}
                          </p>
                        </div>
                        <div>
                          {/* {elm.adultOldPrice && elm.discount && ( */}
                          {elm.adultNewPrice && (
                            <span
                              className="text-16 fw-500"
                              style={{ fontSize: "14px", fontWeight: "700" }}
                            >
                              From:{" "}
                              {convertCurrency(
                                elm.adultNewPrice,
                                selectedCurrency,
                                exchangeRates
                              )}
                            </span>
                          )}

                          {/* // )}  */}

                          {elm.adultOldPrice && !elm.discount && (
                            <span
                              className="text-16 fw-500"
                              style={{ fontSize: "14px", fontWeight: "700" }}
                            >
                              From: ₹ {elm.adultOldPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : data.map((elm, i) => (
                <div key={i} className="col-lg-3 col-md-6">
                  <Link
                    to={`/tour-single-1/${elm._id}`}
                    className="tourCard -type-1 py-10 px-10 border-1 rounded-12  -hover-shadow border-0 shadow"
                  >
                    <div className="tourCard__header">
                      <div className="tourCard__image ratio ratio-28:20">
                        <img
                          src={elm.imageSrc[0]}
                          alt="image"
                          className="img-ratio rounded-12"
                        />
                      </div>

                      <button className="tourCard__favorite">
                        <i
                          className="icon-heart"
                          style={{
                            fontWeight: "700",
                            fontSize: "20px",
                            color: "#78006E",
                          }}
                        ></i>
                      </button>
                    </div>

                    <div className="tourCard__content px-10 pt-10">
                      <div className="tourCard__location d-flex items-center text-13 text-light-2">
                        <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                        <span style={{ fontSize: "15px", fontWeight: "700" }}>
                          {" "}
                          {elm.country} ({elm.city}){" "}
                        </span>
                      </div>

                      <h3 className="tourCard__title text-16 fw-500 mt-5">
                        <span style={{ fontSize: "18px", fontWeight: "700" }}>
                          {showFullTitle
                            ? elm.product
                            : `${elm.product.substring(0, 20)}...`}
                        </span>
                        {elm.product.length > 20 && (
                          <button onClick={toggleTitle} className="btn-link">
                            {showFullTitle ? "See Less" : "See More"}
                          </button>
                        )}
                      </h3>
                      <div className="tourCard__rating d-flex items-center text-13 mt-5">
                        <div
                          className="d-flex x-gap-5"
                          style={{ fontSize: "18px", fontWeight: "900" }}
                        >
                          <Stars star={elm.rating} />
                        </div>

                        {elm.adultOldPrice && (
                          <span
                            className="text-dark-1 me-4"
                            style={{ fontSize: "14px", fontWeight: "700" }}
                          >
                            Old Price: <del>${elm.adultOldPrice}</del>
                          </span>
                        )}
                      </div>
                      <div className="tourCard__rating d-flex items-center text-13 mt-5">
                        {elm.discount && (
                          <span
                            className="text-dark-1 me-4"
                            style={{ fontSize: "14px", fontWeight: "700" }}
                          >
                            Discount: {elm.discount}%
                          </span>
                        )}
                      </div>

                      <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                        <div
                          className="d-flex items-center"
                          style={{ fontSize: "10px", fontWeight: "700" }}
                        >
                          <i
                            className="icon-clock text-16 mr-5"
                            style={{ fontSize: "10px", fontWeight: "700" }}
                          ></i>
                          <span style={{ fontSize: "12px" }}>
                            {" "}
                            {elm.duration}
                          </span>
                        </div>

                        <div>
                          {elm.adultOldPrice && elm.discount && (
                            <span
                              className="text-16 fw-500"
                              style={{ fontSize: "14px", fontWeight: "700" }}
                            >
                              <span style={{ fontSize: "12px" }}>
                                {" "}
                                From Rs :{" "}
                              </span>{" "}
                              <span
                                style={{ fontSize: "14px", fontWeight: "700" }}
                              >
                                {(
                                  elm.adultOldPrice -
                                  (elm.adultOldPrice * elm.discount) / 100
                                ).toFixed(2)}
                              </span>
                            </span>
                          )}
                          {elm.adultOldPrice && !elm.discount && (
                            <span
                              className="text-16 fw-500"
                              style={{ fontSize: "17px", fontWeight: "700" }}
                            >
                              From Rs : {elm.adultOldPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
