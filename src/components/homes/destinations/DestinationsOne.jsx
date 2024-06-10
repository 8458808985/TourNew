import { destinations } from "@/data/destinations";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import BASE_URL from "@/Urls/baseUrl";


export default function DestinationsOne() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/destination`)
      .then(res => res.json())
      .then(data => setDestinations(data))
      .catch(err => console.error('Error fetching tours:', err));
  }, []);
  return (
    <section className="layout-pt-xl">
      <div className="container">
        <div className="row y-gap-10 justify-between items-end">
          <div className="col-auto">
            <h2 data-aos="fade-up" className="text-30 mt-30 md:text-24">
              Trending destinations 
            </h2>
          </div>

          <div data-aos="fade-up" className="col-auto">
            {/* <Link
              to={"/tour-list-1"}
              className="buttonArrow d-flex items-center "
            >
            <span className="px-3 rounded-3 text-light" style={{ fontWeight: "700", fontSize: "15px", backgroundColor:"#78006E" }}>See all   <i className="icon-arrow-top-right mx-1" style={{ color: "white", fontSize: "12px", fontWeight: "700" }}></i></span>
            </Link> */}
          </div>
        </div>

        <div
          data-aos="fade-up"
          className="overflow-hidden pt-40 sm:pt-20 js-section-slider"
        >
          <div className="swiper-wrapper">
            <Swiper
              spaceBetween={30}
              className="w-100"
              pagination={{
                el: ".pbutton1",
                clickable: true,
              }}
              modules={[Navigation, Pagination]}
              breakpoints={{
                360: {
                  slidesPerView: 2,
                },
                500: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 6,
                },
                1200: {
                  slidesPerView: 8,
                },
              }}
            >
              {destinations.slice().reverse().map((elm, i) => ( // Copy the array and reverse it before mapping
  <SwiperSlide key={i}>
    <Link to={`/destinations/${elm._id}`}>
      <div className="featureImage__image mx-50 rounded-full -hover-image-scale__image" >
        <img
          src={elm.imageSrc}
          alt="image"
          className="size-130 object-cover rounded-full"
        />
      </div>

      <h3 className="featureImage__title text-16 fw-500 mt-20">
        {elm.name}
      </h3>
      {/* <p className="featureImage__text text-14">
        {elm.tourCount}+ Tours
      </p> */}
    </Link>
  </SwiperSlide>
))}

            </Swiper>
          </div>

          <div className="pagination -type-1 justify-center pt-60 md:pt-40 js-dest-pagination swiperPagination1">
            <div className="pagination__button pbutton1"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
