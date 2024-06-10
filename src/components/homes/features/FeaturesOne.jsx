import { features } from "@/data/features";

import React from "react";
import { Slider } from "@chakra-ui/react";

export default function FeaturesOne() {
  return (



    <section className="layout-pt-xl my-20">
         

      <div className="container">
        <div className="row">
          <div className="col-auto">
            <h2 data-aos="fade-up" className="" style={{ fontSize: "24px" }}>
              Why choose Renomadic
            </h2>
          </div>
        </div>

        <div
          data-aos="fade-up"
          className="row md:x-gap-20 pt-40 sm:pt-20 mobile-css-slider -w-280"
        >
          {features.map((elm, i) => (
            <div key={i} className="col-lg-3 col-sm-6 col-12">
              <div className="featureIcon -type-1 pr-40 md:pr-0">
                <div className="featureIcon__icon d-flex justify-content-center">
                  <img src={elm.iconSrc} alt="icon" />
                </div>

                <h3 className="mt-3 mb-1 text-center" style={{ fontSize: "15px" }}>
                  {elm.title}
                </h3>
                <p className="featureIcon__text mt-10 text-center">{elm.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
