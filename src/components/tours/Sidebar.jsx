import React, { useEffect, useMemo, useState } from "react";
import Calender from "../common/dropdownSearch/Calender";
import PropTypes from "prop-types";

import {
  durations,
  languages,
  toursTypes,
  features,
  rating,
} from "@/data/tourFilteringOptions";
import RangeSlider from "../common/RangeSlider";
import Stars from "../common/Stars";
import BASE_URL from "@/Urls/baseUrl";
import axios from "axios";

  export default function Sidebar({sendData, sendRange }) {
    const [ddActives, setDdActives] = useState(["tourtype"]);
    const [solve , setSolve]=useState([])
    const [selectedTourTypes, setSelectedTourTypes] = useState([]);
    const [filter, setFilter] = useState([]);
    const [productData, setProductData] = useState([]);
    const [finalData, setFinalData] = useState([]);
    // const { id } = useParams(); // Destructure id from useParams
    
    const receiveDataFromChild = (data) => {
      // Data received from child component
      setFinalData(data);
      sendRange(data);
    };
    <RangeSlider sendData={receiveDataFromChild}/>
  
    // console.log("range", finalData)
    useEffect(() => {
      fetch(`${BASE_URL}/product`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          setProductData(data);
          const tourTypes = data.map(product => product.tourType);
          // Assuming `setSolve` is meant to set some state related to tour types
          setSolve(tourTypes);
        })
        .catch((err) => console.error("Error fetching product:", err));
    }, []);
    

const tourTypeString = selectedTourTypes.join(',');
    

useEffect(() => {
  const fetchTourTypes = async () => {
    try {
      const response = await fetch(`https://test1.buyjugaad.com/api/v1/product/tourtype/${tourTypeString}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch tour types');
      }
      
      const data = await response.json();
      setFilter(data);
      sendData(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      // Optionally, handle the error state here
    }
  };

  // Only fetch tour types when selectedTourTypes change
  if (selectedTourTypes.length > 0) {
    fetchTourTypes();
  } else {
    // Handle case when no tour types are selected
    setFilter([]);
  }
}, [sendData, selectedTourTypes, tourTypeString]); // Added tourTypeString to dependency array
// console.log("selectedTourTypes", selectedTourTypes);


const toggleTourType = (tourType) => {
  setSelectedTourTypes((prevSelected) =>
    prevSelected.includes(tourType)
      ? prevSelected.filter((item) => item !== tourType)
      : [...prevSelected, tourType]
  );
};

const uniqueTourTypes = solve.filter((tourType, index) => solve.findIndex(t => t === tourType) === index);
  
  const handleSeeMore = () => {
    // Implement logic for 'See More' link if needed
  };
  return (
    <div className="sidebar -type-1 rounded-12">
      <div className="sidebar__header bg-accent-1">
        <div className="text-15 text-white fw-500">When are you traveling?</div>

        <div className="mt-10">
          <div className="searchForm -type-1 -col-1 -narrow">
            <div className="searchForm__form">
              <div className="searchFormItem js-select-control js-form-dd js-calendar">
                <div className="searchFormItem__button" data-x-click="calendar">
                  <div className="pl-calendar d-flex items-center">
                    <i className="icon-calendar text-20 mr-15"></i>
                    <div>
                      <span className="js-first-date">
                        <Calender />
                      </span>
                      <span className="js-last-date"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar__content">
        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
          <div className="sidebar -type-1 rounded-12">
      <div className="sidebar__content">
        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("tourType") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("tourType")
                      ? pre.filter((elm) => elm !== "tourType")
                      : [...pre, "tourType"]
                  )
                }
              >
                <h5 className="text-18 fw-500">Tour Type</h5>
                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>
              <div
                className="accordion__content"
                style={
                  ddActives.includes("tourType") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                  

{toursTypes.map((tourType, index) => (
  <div key={index}>
    <div className="d-flex items-center">
      <div className="form-checkbox">
        <input
          type="checkbox"
          name={tourType}
          checked={selectedTourTypes.includes(tourType)}
          onChange={() => toggleTourType(tourType)}
        />
        <div className="form-checkbox__mark">
          <div className="form-checkbox__icon">
            <img src="/img/icons/check.svg" alt="icon" />
          </div>
        </div>
      </div>
      <div className="lh-11 ml-10">{tourType}</div>
    </div>
  </div>
))}


                  </div>
                  <a
                    href="#"
                    className="d-flex text-15 fw-500 text-accent-2 mt-15"
                    onClick={handleSeeMore}
                  >
                    See More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("pricerange") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button mb-10 d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("pricerange")
                      ? [...pre.filter((elm) => elm != "pricerange")]
                      : [...pre, "pricerange"],
                  )
                }
              >
                <h5 className="text-18 fw-500">Filter Price</h5>

                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>

              <div
                className="accordion__content"
                style={
                  ddActives.includes("pricerange") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <RangeSlider sendData={receiveDataFromChild}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("duration") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("duration")
                      ? [...pre.filter((elm) => elm != "duration")]
                      : [...pre, "duration"],
                  )
                }
              >
                <h5 className="text-18 fw-500">Duration</h5>

                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>

              <div
                className="accordion__content"
                style={
                  ddActives.includes("duration") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {durations.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center">
                          <div className="form-checkbox ">
                            <input type="checkbox" name="name" />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon">
                                <img src="/img/icons/check.svg" alt="icon" />
                              </div>
                            </div>
                          </div>

                          <div className="lh-11 ml-10">{elm}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("language") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("language")
                      ? [...pre.filter((elm) => elm != "language")]
                      : [...pre, "language"],
                  )
                }
              >
                
              </div>

              <div
                className="accordion__content"
                style={
                  ddActives.includes("language") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {languages.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center">
                          <div className="form-checkbox ">
                            <input type="checkbox" name="name" />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon">
                                <img src="/img/icons/check.svg" alt="icon" />
                              </div>
                            </div>
                          </div>

                          <div className="lh-11 ml-10">{elm}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("rating") ? "is-active" : ""
              } `}
            >
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
