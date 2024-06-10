import BASE_URL from "@/Urls/baseUrl";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OthersInformation() {

  const [productData, setProductData] = useState([]);
  const { id } = useParams(); // Destructure id from useParams

  useEffect(() => {
    fetch(`${BASE_URL}/product/${id}`)
      .then(res => res.json())
      .then(data => setProductData(data))
      .catch(err => console.error('Error fetching product:', err));
  }, [id]); // Add id to dependency array
  return (
    <>
      <div className="col-sm-3 col-md-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-clock"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">Duration</div>
            <div className="text-14 text-light-2 lh-16">{productData.duration}</div>
          </div>
        </div>
      </div>

      {/* <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-teamwork"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">Group Size</div>
            <div className="text-14 text-light-2 lh-16">{productData.groupSize} people</div>
          </div>
        </div>
      </div> */}

      {/* <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-birthday-cake"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">Ages</div>
            <div className="text-14 text-light-2 lh-16">{productData.ages} yrs</div>
          </div>
        </div>
      </div> */}

      <div className="col-md-3 col-sm-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-translate"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">Languages</div>
            <div className="text-14 text-light-2 lh-16">{productData.languages}</div>
          </div>
        </div>
      </div>
      <div className="col-md-6"></div>
    </>
  );
}
