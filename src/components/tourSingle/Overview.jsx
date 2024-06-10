import BASE_URL from "@/Urls/baseUrl";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Overview() {
  const [productData, setProductData] = useState([]);
  const { id } = useParams(); // Destructure id from useParams

  useEffect(() => {
    fetch(`${BASE_URL}/product/${id}`)
      .then(res => res.json())
      .then(data => {setProductData(data);
      })
      .catch(err => console.error('Error fetching product:', err));
  }, [id]); // Add id to dependency array
  
  console.log("Product data:", productData); // Log the productData
  
  return (
    <>
      <h2 className="text-30">Tour Overview</h2>
      {/* {productData && productData.map((item, index) => ( */}
        <p className="mt-20">
          {productData.tourOverview}
        </p>
    
    </>
  );
}
