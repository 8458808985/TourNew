import { Link } from "react-router-dom";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
export default function Banner() {
  return (
  <>
  <div className="container-fluid ">
    <div
  id="carouselExampleCaptions"
  className="carousel slide"
  data-bs-ride="carousel"
>
  <div className="carousel-indicators">
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to={0}
      className="active"
      aria-current="true"
      aria-label="Slide 1"
    />
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to={1}
      aria-label="Slide 2"
    />
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to={2}
      aria-label="Slide 3"
    />
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active" style={{height:"100%"}}>
      <img src="https://i.pinimg.com/736x/84/70/94/847094a5d2df67f4fc7a7a6b77bcfe7b.jpg" style={{height:"400px"}} className="d-block w-100 rounded-4" alt="..." />
      <div className="carousel-caption d-md-block">
        {/* <h5>Explore Amazing Destinations</h5>
        <p className="fw-bold fs-5">Discover the world's most exciting places with us. Plan your next adventure today!</p> */}
      </div>
    </div>
    <div className="carousel-item" style={{height:"100%"}}>
      <img src="https://img.freepik.com/free-photo/travel-concept-with-landmarks_23-2149153256.jpg"  style={{height:"400px"}} className="d-block w-100 rounded-4" alt="..." />
      <div className="carousel-caption d-md-block">
        {/* <h5>Explore Amazing Destinations</h5>
        <p className="fw-bold fs-5">vDiscover the world's most exciting places with us. Plan your next adventure today!</p> */}
      </div>
    </div>
    <div className="carousel-item" style={{height:"100%"}}>
      <img src="https://st2.depositphotos.com/3725083/5485/i/450/depositphotos_54856347-stock-photo-travel-the-world-monument-concept.jpg"  style={{height:"400px"}} className="d-block w-100 rounded-4" alt="..." />
      <div className="carousel-caption  d-md-block">
        {/* <h5>Explore Amazing Destinations</h5>
        <p className="fw-bold fs-5">Discover the world's most exciting places with us. Plan your next adventure today!</p> */}
      </div>
    </div>
  </div>
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExampleCaptions"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleCaptions"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>


    </div>
  </>
  );
}
