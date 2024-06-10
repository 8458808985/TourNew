import React, { useEffect, useState } from "react";
import Calender from "../common/dropdownSearch/Calender";

import { times } from "@/data/tourSingleContent";
import { Link, useNavigate } from "react-router-dom";
import { position } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function TourSingleSidebar({productData}) {
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


  const navigate=useNavigate()
  const prices = {
    adultPrice: 94,
    youthPrice: 84,
    childrenPrice: 20,
    extraService: 40,
    servicePerPerson: 40,
  };
  const [newPrice, setNewPrice] = useState(null);
  const [adultNumber, setAdultNumber] = useState(1);
  const [youthNumber, setYouthNumber] = useState(1);
  // Function to calculate and set the new price
  const calculateNewPrice = () => {
    if (productData.adultOldPrice && productData.discount) {
      const discountedPrice = (productData.adultOldPrice - (productData.adultOldPrice * productData.discount) / 100).toFixed(2);
      setNewPrice(discountedPrice);
    } else if (productData.adultOldPrice && !productData.discount) {
      setNewPrice(productData.adultOldPrice);
    }
  };

useEffect(() => {  localStorage.setItem("newPrice",newPrice * adultNumber +
  productData.childPrice * youthNumber +

  extraCharge * 1);
}, [newPrice,adultNumber, youthNumber]);

  

  // Call calculateNewPrice when component mounts
  useEffect(() => {
    calculateNewPrice();
  }, [productData]);
console.log(productData)

  const [childrenNumber, setChildrenNumber] = useState(4);
  const [isExtraService, setisExtraService] = useState(false);
  const [isServicePerPerson, setIsServicePerPerson] = useState(false);
  const [extraCharge, setExtraCharge] = useState(0);
 
 
  useEffect(() => {
    setExtraCharge(0);
    if (isExtraService) {
      setExtraCharge((pre) => pre + prices.extraService);
    }
    if (isServicePerPerson) {
      setExtraCharge((pre) => pre + prices.servicePerPerson);
    }
  }, [isExtraService, isServicePerPerson, setExtraCharge]);

  const [selectedTime, setSelectedTime] = useState("");
  const [activeTimeDD, setActiveTimeDD] = useState(false);

  const book =()=>{
    navigate("/booking-pages")
  }

  return (
    <div className="tourSingleSidebar fixed-sidebar" style={{position:"sticky", top:"0", right:"0",width:"300",height:"100",overflowY:"auto",padding:"20",marginTop:"10%"}}>
  <div className="d-flex items-center">
    {/* <div>From</div>
    <div className="text-20 fw-500 ml-10">$1,200</div> */}
  </div>

  <div className="searchForm -type-1 -sidebar mt-20">
    <div className="searchForm__form">
      <div className="searchFormItem js-select-control js-form-dd js-calendar">
        <div className="searchFormItem__button" data-x-click="calendar">
          <div className="searchFormItem__icon size-50 rounded-12 bg-light-1 flex-center">
            <i className="text-20 icon-calendar"></i>
          </div>
          <div className="searchFormItem__content">
            <h5>Select Date</h5>
            <div>
              <span className="js-first-date">
                <Calender />
              </span>
              <span className="js-last-date"></span>
            </div>
          </div>
          <div className="searchFormItem__icon_chevron">
            <i className="icon-chevron-down d-flex text-18"></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h5 className="text-18 fw-500 mb-20 mt-20">Tickets</h5>

  <div>
    <div className="d-flex items-center justify-between">
      <div className="text-14">
        Adult (18+ years){" "}
        <span className="fw-500">
          {convertCurrency( newPrice * adultNumber,  selectedCurrency,  exchangeRates)}
        </span>
      </div>

      <div className="d-flex items-center js-counter">
        <button
          onClick={() => setAdultNumber((pre) => (pre > 0 ? pre - 1 : pre))}
          className="button size-30 border-1 rounded-full js-down"
        >
          <i className="icon-minus text-10"></i>
        </button>

        <div className="flex-center ml-10 mr-10">
          <div className="text-14 size-20 js-count">{adultNumber}</div>
          
        </div>

        <button
          onClick={() => setAdultNumber((pre) => pre + 1)}
          className="button size-30 border-1 rounded-full js-up"
        >
          <i className="icon-plus text-10"></i>
        </button>
      </div>
    </div>
  </div>

  <div className="mt-15">
    <div className="d-flex items-center justify-between">
      <div className="text-14">
        Youth (13-17 years){" "}
        <span className="fw-500">
        {/* Rs {(productData.childPrice * youthNumber).toFixed(2)} */}
        {convertCurrency( productData.childPrice * youthNumber,  selectedCurrency,  exchangeRates)}

        </span>
      </div>

      <div className="d-flex items-center js-counter">
        <button
          onClick={() => setYouthNumber((pre) => (pre > 0 ? pre - 1 : pre))}
          className="button size-30 border-1 rounded-full js-down"
        >
          <i className="icon-minus text-10"></i>
        </button>

        <div className="flex-center ml-10 mr-10">
          <div className="text-14 size-20 js-count">{youthNumber}</div>
        </div>

        <button
          onClick={() => setYouthNumber((pre) => pre + 1)}
          className="button size-30 border-1 rounded-full js-up"
        >
          <i className="icon-plus text-10"></i>
        </button>
      </div>
    </div>
  </div>

  <div className="mt-15">
    <div className="d-flex items-center justify-between">
      <div className="d-flex items-center js-counter">
        {/* Children counter (if needed) */}
      </div>
    </div>
  </div>

  <div className="d-flex items-center justify-between">
    <div className="d-flex items-center">
      <div className="form-checkbox">
        <input
          checked={isExtraService ? true : false}
          onChange={() => setisExtraService((pre) => !pre)}
          type="checkbox"
        />
      </div>
    </div>
  </div>

  <div className="d-flex justify-between mt-20">
    <div className="d-flex">
      <div className="form-checkbox mt-5">
        <input
          checked={isServicePerPerson ? true : false}
          onChange={() => setIsServicePerPerson((pre) => !pre)}
          type="checkbox"
        />
      </div>
    </div>
  </div>

  <div className="line mt-20 mb-20"></div>

  <div className="d-flex items-center justify-between">
    <div className="text-18 fw-500">Total:</div>
    <div className="text-18 fw-500">
      {/* Rs {(
        newPrice * adultNumber +
        productData.childPrice * youthNumber +
        extraCharge * 1
      ).toFixed(2)} */}

{convertCurrency( newPrice * adultNumber +
        productData.childPrice * youthNumber +
        extraCharge * 1,  selectedCurrency,  exchangeRates)}

    </div>
  </div>

  <button className="button -md -dark-1 col-12 bg-accent-1 text-white mt-20" onClick={book}>
    Book Now
    <i className="icon-arrow-top-right ml-10"></i>
  </button>
</div>

  );
}
