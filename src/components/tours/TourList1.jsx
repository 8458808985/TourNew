import React, { useState, useEffect, useRef } from "react";
import { speedFeatures } from "@/data/tourFilteringOptions";
import { useSelector } from "react-redux";
import Stars from "../common/Stars";
import Sidebar from "../tours/Sidebar";
import BASE_URL from "@/Urls/baseUrl";
import { Link } from "react-router-dom";

export default function TourList1() {
  const [sortOption, setSortOption] = useState("");
  const [ddActives, setDdActives] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const dropDownContainer = useRef();
  const [productData, setProductData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [rangeData, setRangeData] = useState([]);

  const { Searchdata } = useSelector((state) => state.app);

  const receiveDataFromChild = (data) => {
    setFinalData(data);
  };

  const receiveRange = (data) => {
    setRangeData(data);
  };

  const exchangeRates = useSelector((state) => state.exchange.exchangeRates);
  const selectedCurrency = useSelector(
    (state) => state.exchange.selectedCurrency
  );

  useEffect(() => {
    fetch(`${BASE_URL}/product`)
      .then((res) => res.json())
      .then((data) => setProductData(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, []);

  const filteredProducts = productData.filter((product) => {
    const adultOldPrice = product.adultOldPrice;
    const matchesSearch =
      Searchdata && typeof Searchdata === "string"
        ? product.product.toLowerCase().includes(Searchdata.toLowerCase()) ||
          product.city.toLowerCase().includes(Searchdata.toLowerCase())
        : true;
    const inRange =
      rangeData && Array.isArray(rangeData) && rangeData.length === 2
        ? adultOldPrice >= rangeData[0] && adultOldPrice <= rangeData[1]
        : true;
    return matchesSearch && inRange;
  });

  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setDdActives(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  //covert currancy

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

  return (
    <section className="layout-pb-xl">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <div className="lg:d-none">
              <Sidebar
                sendData={receiveDataFromChild}
                sendRange={receiveRange}
              />
            </div>

            <div className="accordion d-none mb-30 lg:d-flex js-accordion">
              <div
                className={`accordion__item col-12 ${
                  sidebarActive ? "is-active" : ""
                }`}
              >
                {/* <button className="accordion__button button -dark-1 bg-light-1 px-25 py-10 border-1 rounded-12" onClick={() => setSidebarActive((pre) => !pre)}>
                  <i className="icon-sort-down mr-10 text-16"></i>
                  Filter
                </button> */}

                <div
                  className="accordion__content"
                  style={sidebarActive ? { maxHeight: "2000px" } : {}}
                >
                  <div className="pt-20">
                    <Sidebar
                      sendData={receiveDataFromChild}
                      sendRange={receiveRange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-8 col-lg-8">
            <div className="row y-gap-5 justify-between">
              <div className="col-auto">
                <div>{filteredProducts.length} results</div>
              </div>
            </div>

            {finalData.length === 0
              ? filteredProducts.map((elm, i) => (
                  <div className="col-12 py-3" key={i}>
                    <div className="tourCard -type-2 ">
                      <div className="tourCard__image">
                        <img src={elm.imageSrc[0]} alt="image" />
                        <div className="tourCard__favorite">
                          {/* <button className="button -accent-1 size-35 bg-white rounded-full flex-center">
                            <i className="icon-heart text-15"></i>
                          </button> */}
                        </div>
                      </div>
                      <div className="tourCard__content">
                        <div className="tourCard__location">
                          <i className="icon-pin"></i>
                          <span className="ms-1">{elm.city}</span>
                          <span className="ms-1"> ({elm.country}) </span>
                        </div>
                        <h3 className="tourCard__title mt-5">
                          <span>{elm.product}</span>
                        </h3>
                        <div className="d-flex items-center mt-5">
                          <div className="d-flex items-center x-gap-5">
                            <Stars star={elm} font={12} />
                          </div>
                          <div className="text-14 ml-10">
                            <span className="fw-500">
                              {elm.tourOverview
                                .split(" ")
                                .slice(0, 25)
                                .join(" ")}
                              {/* Split text into words, take the first 25, and join them back together */}
                              {elm.tourOverview.split(" ").length > 25
                                ? "..."
                                : ""}{" "}
                              {/* If the text has more than 25 words, add an ellipsis */}
                            </span>
                          </div>
                        </div>
                        <div className="row x-gap-20 y-gap-5 pt-30">
                          {elm.features?.map((elm2, i2) => (
                            <div key={i2} className="col-auto">
                              <div className="text-14 text-accent-1">
                                <i className={`${elm2.icon} mr-10`}></i>
                                {elm2.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="tourCard__info">
                        <div>
                          <div className="d-flex items-center text-14">
                            <i className="icon-clock mr-10"></i>
                            {elm.duration}
                          </div>
                          <div className="tourCard__price">
                            <div>
                              From:{" "}
                              {convertCurrency(
                                elm.adultOldPrice,
                                selectedCurrency,
                                exchangeRates
                              )}
                            </div>
                            <div className="d-flex items-center">
                              <span className="text-20 fw-500 ml-5">
                                <span
                                  className="text-16 fw-500"
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "700",
                                  }}
                                >
                                  <span style={{ fontSize: "12px" }}>
                                    From :{" "}
                                  </span>{" "}
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "700",
                                    }}
                                  >
                                    {convertCurrency(
                                      elm.adultNewPrice,
                                      selectedCurrency,
                                      exchangeRates
                                    )}
                                  </span>
                                </span>

                                {elm.adultOldPrice && !elm.discount && (
                                  <span
                                    className="text-16 fw-500"
                                    style={{
                                      fontSize: "17px",
                                      fontWeight: "700",
                                    }}
                                  >
                                    From Rs : {elm.adultOldPrice}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button className="button -outline-accent-1 text-accent-1">
                          <Link to={`/tour-single-1/${elm._id}`}>
                            View Details
                            <i className="icon-arrow-top-right ml-10"></i>
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : finalData.map((elm, i) => (
                  <div className="col-12" key={i}>
                    <div className="tourCard -type-2">
                      <div className="tourCard__image">
                        <img src={elm.imageSrc[0]} alt="image" />
                        <div className="tourCard__favorite"></div>
                      </div>
                      <div className="tourCard__content">
                        <div className="tourCard__location">
                          <i className="icon-pin"></i>
                          <span className="ms-1">{elm.city}</span>
                          <span className="ms-1"> ({elm.country}) </span>
                        </div>
                        <h3 className="tourCard__title mt-5">
                          <span>{elm.product}</span>
                        </h3>
                        <div className="d-flex items-center mt-5">
                          <div className="d-flex items-center x-gap-5">
                            <Stars star={elm} font={12} />
                          </div>
                          <div className="text-14 ml-10">
                            {/* <span className="fw-500">{elm.tourOverview}</span> */}
                            <span className="fw-500">
                              {elm.tourOverview
                                .split(" ")
                                .slice(0, 25)
                                .join(" ")}
                              {/* Split text into words, take the first 25, and join them back together */}
                              {elm.tourOverview.split(" ").length > 25
                                ? "..."
                                : ""}{" "}
                              {/* If the text has more than 25 words, add an ellipsis */}
                            </span>
                          </div>
                        </div>
                        <div className="row x-gap-20 y-gap-5 pt-30">
                          {elm.features?.map((elm2, i2) => (
                            <div key={i2} className="col-auto">
                              <div className="text-14 text-accent-1">
                                <i className={`${elm2.icon} mr-10`}></i>
                                {elm2.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="tourCard__info">
                        <div>
                          <div className="d-flex items-center text-14">
                            <i className="icon-clock mr-10"></i>
                            {elm.duration}
                          </div>
                          <div className="tourCard__price">
                            <div>
                              {" "}
                              From:{" "}
                              {convertCurrency(
                                elm.adultOldPrice,
                                selectedCurrency,
                                exchangeRates
                              )}
                            </div>
                            <div className="d-flex items-center">
                              <span className="text-20 fw-500 ml-5">
                                <span
                                  className="text-16 fw-500"
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "700",
                                  }}
                                >
                                  <span style={{ fontSize: "12px" }}>
                                    {" "}
                                    From :{" "}
                                  </span>{" "}
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "700",
                                    }}
                                  >
                                    {convertCurrency(
                                      elm.adultNewPrice,
                                      selectedCurrency,
                                      exchangeRates
                                    )}
                                  </span>
                                </span>

                                {elm.adultOldPrice && !elm.discount && (
                                  <span
                                    className="text-16 fw-500"
                                    style={{
                                      fontSize: "17px",
                                      fontWeight: "700",
                                    }}
                                  >
                                    From Rs : {elm.adultOldPrice}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button className="button -outline-accent-1 text-accent-1">
                          <Link to={`/tour-single-1/${elm._id}`}>
                            View Details
                            <i className="icon-arrow-top-right ml-10"></i>
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
