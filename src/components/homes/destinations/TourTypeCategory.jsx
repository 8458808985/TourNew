import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toursTypess } from "@/data/tourFilteringOptions";

const TourTypeCategory = () => {
  useEffect(() => {
    const sliders = document.querySelectorAll(".slider__container");
    const sliderControlPrev = document.querySelectorAll(".slider__control.prev");
    const sliderControlNext = document.querySelectorAll(".slider__control.next");

    sliders.forEach((slider, i) => {
      let isDragStart = false,
        isDragging = false,
        isSlide = false,
        prevPageX,
        prevScrollLeft,
        positionDiff;

      const sliderItem = slider.querySelector(".slider__item");
      const isMultislide = slider.dataset.multislide === "true";

      sliderControlPrev[i].addEventListener("click", () => {
        if (isSlide) return;
        isSlide = true;
        let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
        slider.scrollLeft += -slideWidth;
        setTimeout(function () {
          isSlide = false;
        }, 700);
      });

      sliderControlNext[i].addEventListener("click", () => {
        if (isSlide) return;
        isSlide = true;
        let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
        slider.scrollLeft += slideWidth;
        setTimeout(function () {
          isSlide = false;
        }, 700);
      });

      function autoSlide() {
        if (slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 || slider.scrollLeft <= 0) return;
        positionDiff = Math.abs(positionDiff);
        let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
        let valDifference = slideWidth - positionDiff;
        if (slider.scrollLeft > prevScrollLeft) {
          return slider.scrollLeft += positionDiff > slideWidth / 5 ? valDifference : -positionDiff;
        }
        slider.scrollLeft -= positionDiff > slideWidth / 5 ? valDifference : -positionDiff;
      }

      function dragStart(e) {
        if (isSlide) return;
        isSlide = true;
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = slider.scrollLeft;
        setTimeout(function () {
          isSlide = false;
        }, 700);
      }

      function dragging(e) {
        if (!isDragStart) return;
        e.preventDefault();
        isDragging = true;
        slider.classList.add("dragging");
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        slider.scrollLeft = prevScrollLeft - positionDiff;
      }

      function dragStop() {
        isDragStart = false;
        slider.classList.remove("dragging");
        if (!isDragging) return;
        isDragging = false;
        autoSlide();
      }

      window.addEventListener("resize", autoSlide);
      slider.addEventListener("mousedown", dragStart);
      slider.addEventListener("touchstart", dragStart);
      slider.addEventListener("mousemove", dragging);
      slider.addEventListener("touchmove", dragging);
      slider.addEventListener("mouseup", dragStop);
      slider.addEventListener("touchend", dragStop);
      slider.addEventListener("mouseleave", dragStop);
    });
  }, []); // Empty dependency array ensures that this effect runs only once after the component mounts

  return (
    <>
      <div className="container">
        <h4 className="mt-40">Destination Category</h4>
        <section className="slider mt-20">
          <button className="slider__control prev">
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button className="slider__control next">
            <i className="fa-solid fa-chevron-right" />
          </button>
          <div className="slider__container" data-multislide="false" data-step={6}>
            {toursTypess.map((items, index) => (
              <div className="slider__item" key={index}>
                <Link to={`/tour-list-2/${items}`}>
                  <button className="btn btn-transparent border fs-6 py-3  w-100 hoverButton" style={{borderRadius:"30px"}}> <div key={index}>
          <i className={`fa ${items.icon}`}></i>
          <span> {items.type}</span>
        </div></button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default TourTypeCategory;
