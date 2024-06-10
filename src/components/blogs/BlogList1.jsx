import React, { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { blogs, continents } from "@/data/blogs";

import { Link } from "react-router-dom";
import BASE_URL from "@/Urls/baseUrl";

export default function BlogList1() {
  const [currentActiveTab, setCurrentActiveTab] = useState("All Guide");
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    if (currentActiveTab == "All Guide") {
      setFilteredItems(blogs);
    } else {
      setFilteredItems([
        ...blogs.filter((elm) => elm.continent == currentActiveTab),
      ]);
    }
  }, [currentActiveTab, setFilteredItems]);

  //get blog Data
  const [blog, setBlog] = useState([]);


  useEffect(() => {
    fetch(`${BASE_URL}/blog`)
      .then(res => res.json())
      .then(data => setBlog(data))
      .catch(err => console.error('Error fetching tours:', err));
  }, []);

  return (
    <section className="layout-pt-md layout-pb-xl">
      <div className="container">
        <div className="tabs -pills-3 pt-30 js-tabs">
          <div className="tabs__controls row x-gap-10 y-gap-10 justify-center js-tabs-controls">
            {/* {continents.map((elm, i) => (
              <div
                key={i}
                className="col-auto"
                onClick={() => setCurrentActiveTab(elm)}
              >
                <button
                  className={`" tabs__button fw-500 rounded-200 js-tabs-button ${
                    currentActiveTab == elm ? "is-tab-el-active" : ""
                  } `}
                  data-tab-target=".-tab-item-1"
                >
                  {elm}
                </button>
              </div>
            ))} */}
          </div>

          <div className="tabs__content pt-30 js-tabs-content">
            <div className="tabs__pane -tab-item-1 is-tab-el-active">
              <div className="row y-gap-30">
              {blog.map((elm, i) => (
            <div key={i} className="col-lg-3 col-md-3 col-12 shadow rounded-4">
              <div className="blogCard -type-1">
                <div className="blogCard__image ratio ratio-41:30">
                  <img
                    src={elm.imageSrc}
                    alt="image"
                    className="img-ratio rounded-12"
                  />

                  {/* <div className="blogCard__badge">{elm.badge}</div> */}
                 
                </div>

                <div className="blogCard__content mt-30" >
                  <div className="blogCard__info text-14" >
                    <div className="lh-13" style={{fontSize:"12px",fontWeight:"700"}}>{elm.date}</div>
                    <div className="blogCard__line" style={{fontSize:"12px"}}></div>
                    <div className="lh-13" style={{fontSize:"12px"}}>By {elm.author}</div>
                  </div>

                  <p className="" style={{fontSize:"14px",fontWeight:"700"}}>
                    {elm.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-center flex-column mt-60">
          {/* <Pagination /> */}

        </div>
      </div>
    </section>
  );
}
