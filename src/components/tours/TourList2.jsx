import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link, useParams } from "react-router-dom";
import BASE_URL from "@/Urls/baseUrl";
import { useSelector } from "react-redux";


export default function TourList2({ id }) {
  const [sortOption, setSortOption] = useState("");
  const [ddActives, setDdActives] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  // const [category, setCategory]=useState([])

  const exchangeRates = useSelector((state) => state.exchange.exchangeRates);
  const selectedCurrency = useSelector(
    (state) => state.exchange.selectedCurrency
  );

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
    // console.log("object", id)
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  useEffect(() => {
    setCategory(id);
  }, []);

  const [productData, setProductData] = useState([]);
  const [category, setCategory] = useState([]);

  // console.log(category)

  useEffect(() => {
    fetch(`${BASE_URL}/product`)
      .then((res) => res.json())
      .then((data) => {

        const filteredProducts = data.filter((product) =>
          product.tourType.includes(category)
        );

        setProductData(filteredProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [category]); // Run this effect whenever category changes

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
            <div className="lg:d-none">{/* <Sidebar /> */}</div>

            <div className="accordion d-none mb-0 lg:d-flex js-accordion">
              <div
                className={`accordion__item col-12 ${
                  sidebarActive ? "is-active" : ""
                } `}
              >
                <div
                  className="accordion__content"
                  style={sidebarActive ? { maxHeight: "2000px" } : {}}
                >
                  <div className="pt-20">
                    <Sidebar />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-8">
            <div className="row y-gap-5 justify-between">
              <div className="col-auto">
                <div>{productData.length} results</div>
              </div>

              <div ref={dropDownContainer} className="col-auto">
                <div
                  className={`dropdown -type-2 js-dropdown js-form-dd ${
                    ddActives ? "is-active" : ""
                  } `}
                  data-main-value=""
                ></div>
              </div>
            </div>

            <div className="row y-gap-30 pt-30">
              {productData.map((elm, i) => (
                <div key={i} className="col-lg-4 col-sm-6">
                  <Link
                    to={`/tour-single-1/${elm._id}`}
                    className="tourCard -type-1 py-10 px-10 border-1 rounded-12  -hover-shadow"
                  >
                    <div className="tourCard__header">
                      <div className="tourCard__image ratio ratio-28:20">
                        <img
                          src={elm.imageSrc[0]}
                          alt="image"
                          className="img-ratio rounded-12"
                        />
                      </div>
                    </div>

                    <div className="tourCard__content px-10 pt-10">
                      <div className="tourCard__location d-flex items-center text-13 text-light-2">
                        <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                        {elm.country} ({elm.city}){" "}
                      </div>

                      <h3 className="tourCard__title text-16 fw-500 mt-5">
                        <span>{elm.product}</span>
                      </h3>

                      <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                        <div className="d-flex items-center">
                          <i className="icon-clock text-16 mr-5"></i>
                          {elm.duration}
                        </div>

                        <div>
                          {" "}
                          <span className="text-16 fw-500">
                            <span
                              className="text-16 fw-500"
                              style={{ fontSize: "12px", fontWeight: "700" }}
                            >
                              <span style={{ fontSize: "12px" }}> From: </span>{" "}
                              <span
                                style={{ fontSize: "14px", fontWeight: "700" }}
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
                                style={{ fontSize: "17px", fontWeight: "700" }}
                              >
                                From ₹ {elm.adultOldPrice}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="d-flex justify-center flex-column mt-60">
              {/* <Pagination /> */}

              <div className="text-14 text-center mt-20">
                Showing results {productData.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
