import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import BookingPages from "@/components/pages/BookingPages";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import { useParams } from "react-router-dom";
import Product from "@/components/homes/Products/Product";

const metadata = {
  title: " || ViaTour - Travel & Tour Reactjs Template",
  description: "ViaTour - Travel & Tour Reactjs Template",
};

export default function BookingPage() {
  
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <BookingPages />
        <FooterOne />
      </main>
    </>
  );
}
