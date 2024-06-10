import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import PageHeader from "@/components/tours/PageHeader";
import TourList2 from "@/components/tours/TourList2";
import TourTypes from "@/components/tours/TourTypes";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import { useParams } from "react-router-dom";

const metadata = {
  title: "Tour-list-2 || ViaTour - Travel & Tour Reactjs Template",
  description: "ViaTour - Travel & Tour Reactjs Template",
};

export default function TourListPage2() {
  let params = useParams();
  const id = params.id;
  // setCategory(id)
  // const tour = allTour.find((item) => item.TourTypes == id) || allTour[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <PageHeader />

        <TourList2  id={id} />
        <FooterOne />
      </main>
    </>
  );
}
