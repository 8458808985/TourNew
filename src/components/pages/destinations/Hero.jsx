import BASE_URL from "@/Urls/baseUrl";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Hero() {
  const [productData, setProductData] = useState([]);
  const { id } = useParams(); // Destructure id from useParams

  useEffect(() => {
    fetch(`${BASE_URL}/destination/${id}`)
      .then(res => res.json())
      .then(data => setProductData(data))
      .catch(err => console.error('Error fetching product:', err));
  }, [id]); 

  return (
    <section className="pageHeader -type-1">
      <div className="pageHeader__bg">
      {productData && productData.data && productData.data[0] && productData.data[0].imageSrc &&
      <img src={productData.data[0].imageSrc} alt="image" />
    }
      </div>

      <div className="container">
        <div className="row justify-center">
          <div className="col-12">
            <div className="pageHeader__content">
            {productData && productData.data && productData.data[0] && productData.data[0].name &&
            <h1 className="pageHeader__title">{productData.data[0].name}</h1>
          }
              <p className="pageHeader__text ">
                Explore deals, travel guides and things to do in Phuket
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
