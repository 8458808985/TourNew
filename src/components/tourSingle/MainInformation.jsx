import React, { useEffect, useState } from "react";
import Stars from "../common/Stars";
import BASE_URL from "@/Urls/baseUrl";
import { useParams } from "react-router-dom";

export default function MainInformation({ tour }) {
  const [productData, setProductData] = useState([]);
  const { id } = useParams(); // Destructure id from useParams

  useEffect(() => {
    fetch(`${BASE_URL}/product/${id}`)
      .then(res => res.json())
      .then(data => setProductData(data))
      .catch(err => console.error('Error fetching product:', err));
  }, [id]); // Add id to dependency array
// console.log(productData)

  return (
    <>
      <div className="row y-gap-20 justify-between items-end">
        <div className="col-auto">
          <div className="row x-gap-10 y-gap-10 items-center">
            <div className="whatsaap col-auto rounded-pill" >
            <a className="text-black fs-6 p-3" href="https://api.whatsapp.com/send?phone=8458808985" target="_blank"> 
                Whatsaap <i class="fa-brands fa-whatsapp mx-2"></i>
               </a>
            </div>
            <div className="phone col-auto rounded-pill mx-2">
            <a href="tel:8458808985" target="_blank" className="text-light fs-6 p-3"> 
                Phone No <i class="fa-duotone fa-phone mx-2 "></i>
              </a>
            </div>
          </div>

          <h2 className="text-40 sm:text-30 lh-14 mt-20">
            {productData?.product}
          </h2>

          <div className="row x-gap-20 y-gap-20 items-center pt-20">
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="d-flex x-gap-5 pr-10">
                  {/* <Stars star={tour?.rating} font={12} /> */}
                </div>
                {/* {tour?.rating} ({tour.ratingCount}) */}
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                <i className="icon-pin text-16 mr-5 mb-3 fs-5"></i>
              <span className="mb-3 fs-5">  {productData?.city}</span> <span className="ms-1 mb-3 fs-5"> ({productData?.country})</span>
              </div>
            </div>

          </div>
        </div>

        <div className="col-auto">
         
        </div>
      </div>
    </>
  );
}
