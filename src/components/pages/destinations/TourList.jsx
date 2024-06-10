import React, { useEffect, useState, useRef } from "react";
import { speedFeatures } from "@/data/tourFilteringOptions";
import { tourDataTwo } from "@/data/tours";
import Stars from "@/components/common/Stars";
import Pagination from "@/components/common/Pagination";
import Sidebar2 from "@/components/tours/Sidebar2";
import { Link } from "react-router-dom";
import BASE_URL from "@/Urls/baseUrl";
import { useSelector } from "react-redux";

export default function TourList1({ destData }) {
  const [productData, setProductData] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [price, setPrice] = useState("");
  const [finalData, setFinalData] = [];
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
  useEffect(() => {
    if (destData && productData && productData.length > 0) {
      const filteredData = productData.filter(
        (product) => product.city === destData
      );
      if (filteredData.length > 0) {
        setFilteredProductData(filteredData);
        setPrice(filteredData[0].adultOldPrice);
      } else {
        // Handle case where no products match the condition
        // For example, you can set a default price or show a message to the user
      }
    }
  }, [destData, productData]);
  // console.log("filtter",filteredProductData)
  useEffect(() => {
    if (destData && productData && productData.length > 0) {
      const filteredData = productData.filter(
        (product) => product.city === destData
      );
      if (filteredData.length > 0) {
        setFilteredProductData(filteredData);
        setPrice(filteredData[0].adultOldPrice);
      } else {
        // Handle case where no products match the condition
        // For example, you can set a default price or show a message to the user
      }
    }
  }, [destData, productData]);

  // console.log(filteredProductData)

  const [sortOption, setSortOption] = useState("");
  const [ddActives, setDdActives] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const dropDownContainer = useRef();

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

  const receiveDataFromChild = (data) => {
    setFinalData(data);
  };
  const [finalFilter, setFinalFilter] = useState([]);
  const receiveDataFromChildFilter = (filterOk) => {
    setFinalFilter(filterOk);
  };
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
        <div className="row y-gap-10 justify-between items-end y-gap-10 mb-50 ">
          <div className="col-auto">
            <h2 className="text-30 mt-40">
              {/* {new Date().getFullYear()} */}
            </h2>
          </div>
          <div className="col-auto"></div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <div className="lg:d-none">
              <Sidebar2
                price={price}
                sendData={receiveDataFromChild}
                filteredProductData={filteredProductData}
                productData={productData}
                sendFilter={receiveDataFromChildFilter}
              />
            </div>
            <div className="accordion d-none mb-30 lg:d-flex js-accordion">
              <div
                className={`accordion__item col-12 ${
                  sidebarActive ? "is-active" : ""
                } `}
              >
                <button
                  className="accordion__button button -dark-1 bg-light-1 px-25 py-10 border-1 rounded-12"
                  onClick={() => setSidebarActive((pre) => !pre)}
                >
                  <i className="icon-sort-down mr-10 text-16"></i>
                  Filter
                </button>
                <div
                  className="accordion__content"
                  style={sidebarActive ? { maxHeight: "2000px" } : {}}
                >
                  <div className="pt-20">
                    <Sidebar2
                      sendData={receiveDataFromChild}
                      filteredProductData={filteredProductData}
                      productData={productData}
                      sendFilter={receiveDataFromChildFilter}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-8 col-lg-7">
            <div className="row y-gap-5 justify-between">
              <div className="col-auto">{/* <div>1362 results</div> */}</div>
            </div>
            {finalFilter.length === 0 ? (
              <div className="row y-gap-30 pt-30">
                {filteredProductData.map((elm, i) => (
                  <div className="col-12" key={i}>
                    <div className="tourCard -type-2">
                      <div className="tourCard__image">
                        <img src={elm.imageSrc[0]} alt="image" />
                        {elm.badgeText && (
                          <div className="tourCard__badge">
                            <div className="bg-accent-1 rounded-12 text-white lh-11 text-13 px-15 py-10">
                              {elm.badgeText}
                            </div>
                          </div>
                        )}
                        {elm.featured && (
                          <div className="tourCard__badge">
                            <div className="bg-accent-2 rounded-12 text-white lh-11 text-13 px-15 py-10">
                              FEATURED
                            </div>
                          </div>
                        )}
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
                        <p className="tourCard__text mt-5">{elm.description}</p>
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
                                    From:{" "}
                                    {convertCurrency(
                                      elm.adultOldPrice,
                                      selectedCurrency,
                                      exchangeRates
                                    )}
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
            ) : (
              <div className="row y-gap-30 pt-30">
                {finalFilter.map((elm, i) => (
                  <div className="col-12" key={i}>
                    <div className="tourCard -type-2">
                      <div className="tourCard__image">
                        <img src={elm.imageSrc[0]} alt="image" />
                        {elm.badgeText && (
                          <div className="tourCard__badge">
                            <div className="bg-accent-1 rounded-12 text-white lh-11 text-13 px-15 py-10">
                              {elm.badgeText}
                            </div>
                          </div>
                        )}
                        {elm.featured && (
                          <div className="tourCard__badge">
                            <div className="bg-accent-2 rounded-12 text-white lh-11 text-13 px-15 py-10">
                              FEATURED
                            </div>
                          </div>
                        )}
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
                        <p className="tourCard__text mt-5">{elm.description}</p>
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
                              From :
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
                                    From :
                                    {convertCurrency(
                                      elm.adultOldPrice,
                                      selectedCurrency,
                                      exchangeRates
                                    )}
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
            )}
            <div className="d-flex justify-center flex-column mt-60">
              {/* <Pagination /> */}
              {/* <div className="text-14 text-center mt-20">
                Showing results 1-30 of 1,415
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
