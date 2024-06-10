import BASE_URL from "@/Urls/baseUrl";
import { excluded, included } from "@/data/tourSingleContent";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Included() {
  const [productData, setProductData] = useState([]);
  const [include, setInclude] = useState([]);
  const { id } = useParams(); // Destructure id from useParams

  useEffect(() => {
    fetch(`${BASE_URL}/product/${id}`)
      .then(res => res.json())
      .then(data =>{ setProductData(data);
        setInclude(data.included
        )
      })
      .catch(err => console.error('Error fetching product:', err));
  }, [id]); // Add id to dependency array

  return (
    <div className="row x-gap-130 y-gap-20 pt-20">
      <div className="col-lg-6">
        <div className="y-gap-15">
          {include.map((elm, i) => (
            <div key={i} className="d-flex">
              <i className="icon-check flex-center text-10 size-24 rounded-full text-green-2 bg-green-1 mr-15"></i>
              {elm}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
