import React, { useEffect, useState } from "react";
import MainInformation from "../MainInformation";
import OthersInformation from "../OthersInformation";
import Overview from "../Overview";
import Included from "../Included";
import Faq from "../Faq";
import TourSingleSidebar from "../TourSingleSidebar";
import Gallery1 from "../Galleries/Gallery1";
import DateCalender from "../DateCalender";
import { useParams } from "react-router-dom";
import BASE_URL from "@/Urls/baseUrl";
import { useSelector } from "react-redux";

export default function SingleOne({ tour }) {
  const [productData, setProductData] = useState([]);
  const [price, setPrice] = useState([]);
  const { id } = useParams(); // Destructure id from useParams
  

  useEffect(() => {
    fetch(`${BASE_URL}/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]); // Add id to dependency array

  useEffect(() => {
    localStorage.setItem("bookingData", JSON.stringify(productData));
  });
  const apiKey = "AIzaSyBnNyKN9VLARGyS3yUJC-nFXC397WS-MaM";
  const location = productData.tourMap; // Default to Bali if no address
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
    location
  )}`;

  

  return (
    <>
      <section className="">
        <div className="container">
          <MainInformation tour={tour} />
          <Gallery1 />
        </div>
      </section>

      <section className="layout-pt-md js-pin-container">
        <div className="container">
          <div className="row y-gap-30 justify-between">
            <div className="col-lg-8 col-sm-8 col-12">
              <div className="row y-gap-20 justify-between items-center layout-pb-md">
                <OthersInformation />
              </div>

              <Overview />

              <div className="line mt-60 mb-60"></div>

              <h2 className="text-30">What's included</h2>

              <Included />

              <div className="line mt-60 mb-60"></div>

              <h2 className="text-30 mt-60" id="map">
                Tour Map
              </h2>

              <div
                className="mapTourSingle"
                style={{ width: "700px", height: "500px" }}
              >
                <div
                  className="mapTourSingle"
                  style={{ width: "700px", height: "500px" }}
                >
                  <iframe
                    src={mapUrl}
                    width="700"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Tour Map"
                  ></iframe>
                </div>
              </div>
              <DateCalender />

              <h2 className="text-30">FAQ</h2>

              <div className="accordion -simple row y-gap-20 mt-30 js-accordion">
                <Faq productData={productData} />
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-12 ">
              <div className="">
                <div className="d-flex justify-end js-pin-content">
                  <TourSingleSidebar productData={productData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
