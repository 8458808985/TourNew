import ArticlesOne from "@/components/homes/articles/ArticlesOne";
import SpacialOffer from "@/components/homes/others/SpacialOffer";
import TestimonialOne from "@/components/homes/testimonials/TestimonialOne";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Hero from "@/components/pages/destinations/Hero";
import Information from "@/components/pages/destinations/Information";
import TourList1 from "@/components/pages/destinations/TourList";
import TourSlider from "@/components/pages/destinations/TourSlider";
import React, { useEffect, useState } from "react";

import MetaComponent from "@/components/common/MetaComponent";
import { useParams } from "react-router-dom";
import BASE_URL from "@/Urls/baseUrl";

const metadata = {
  title: "Destinations || ViaTour - Travel & Tour Reactjs Template",
  description: "ViaTour - Travel & Tour Reactjs Template",
};

export default function DestinationsPage() {
  const [destinationData, setDestinationData] = useState([]);
  const [destData, setDestData] = useState("");

  const { id } = useParams(); // Destructure id from useParams

  useEffect(() => {
    fetch(`${BASE_URL}/destination/${id}`)
      .then(res => res.json())
      .then(data =>{ setDestinationData(data);
        setDestData(data.data[0].name);
      })
      .catch(err => console.error('Error fetching destination data:', err));
  }, [id]); 

  // console.log("gggsg",destData)
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <Hero />
        {/* <SpacialOffer />
        <TourSlider /> */}
        <TourList1 destData={destData}/>
        {/* <TestimonialOne /> */}
        {/* <Information /> */}
        {/* <ArticlesOne /> */}
        <FooterOne />
      </main>
    </>
  );
}
