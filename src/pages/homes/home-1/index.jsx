import ArticlesThree from "@/components/homes/articles/ArticlesThree";
import Banner from "@/components/homes/banners/Banner";
import BannerOne from "@/components/homes/banners/BannerOne";
import DestinationsOne from "@/components/homes/destinations/DestinationsOne";
import FeaturesOne from "@/components/homes/features/FeaturesOne";
import Hero1 from "@/components/homes/heros/Hero1";
import TestimonialOne from "@/components/homes/testimonials/TestimonialOne";
import TourTypeOne from "@/components/homes/tourTypes/TourTypeOne";
import Tour1 from "@/components/homes/tours/Tour1";
import TourSlderOne from "@/components/homes/tours/TourSlderOne";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";

import MetaComponent from "@/components/common/MetaComponent";
import Product from "@/components/homes/Products/Product";
import { useEffect, useState } from "react";
import TourTypeCategory from "@/components/homes/destinations/TourTypeCategory";
import Aboutus from "@/components/homes/Aboutus/Aboutus";

const metadata = {
  title: "Home-1 || ViaTour - Travel & Tour Reactjs Template",
  description: "ViaTour - Travel & Tour Reactjs Template",
};

export default function HomePage1() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [data, setData] = useState([]);
  console.log("data", data);
  const handleDataChange = (newData) => {
    setData(newData);
  };


 

  return (
    <main>
      <MetaComponent meta={metadata} />
      <Header1/>
      <Hero1 onDataChange={handleDataChange} />
      <TourTypeCategory />
      <FeaturesOne />
      <DestinationsOne />
      <Product
        data={data}/>
      <Banner />
      {/* <Product data={data}/> */}
      <Tour1 />
      {/* <TourTypeOne /> */}
      <TestimonialOne />
      <TourSlderOne />
      <ArticlesThree />
      <FooterOne />
    </main>
  );
}
