import React, { useEffect, useState } from "react";
import ImageLightBox from "./ImageLightBox";
import BASE_URL from "@/Urls/baseUrl";
import { useParams } from "react-router-dom";

export default function Gallery1() {
  const [activeLightBox, setActiveLightBox] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // Start from the first image
  const [productData, setProductData] = useState(null);
  const { id } = useParams(); // Destructure id from useParams

  useEffect(() => {
    fetch(`${BASE_URL}/product/${id}`)
      .then(res => res.json())
      .then(data => setProductData(data))
      .catch(err => console.error('Error fetching product:', err));
  }, [id]); // Add id to dependency array

  const handleSeeAllPhotos = () => {
    setActiveLightBox(true); // Open the image lightbox
    setCurrentSlideIndex(0); // Set the current slide index to the first image
  };
  return (
    <>
      {productData ? (
        <div className="tourSingleGrid -type-1">
          <div className="tourSingleGrid__grid mobile-css-slider-2">
          {productData.imageSrc && Array.isArray(productData.imageSrc) && productData.imageSrc.map((image, index) => ( 
    <img key={index} src={image} alt={`image ${index + 1}`} />
))}

          </div>
          <div className="tourSingleGrid__button">
            <div style={{ cursor: "pointer" }} className="js-gallery" data-gallery="gallery1">
              <span
                onClick={handleSeeAllPhotos}
                className="button -accent-1 py-10 px-20 rounded-200 bg-dark-1 lh-16 text-white" data-bs-toggle="modal" data-bs-target="#exampleModal"
              >
                See all photos
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-lg  modal-dialog-centered"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Gallery Slider</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" >
                <div className="carousel-inner" >
                  {productData && productData.imageSrc.map((image, index) => (
                    <div key={index} className={`carousel-item ${index === currentSlideIndex ? 'active' : ''}`}>
                      <img src={image} className="d-block w-100" alt={`image ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" data-bs-dismiss="modal" style={{color:"#77026D", border:"1px solid #77026D", fontWeight:"700"}}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
