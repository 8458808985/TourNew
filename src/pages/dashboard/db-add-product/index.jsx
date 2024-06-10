// import AddTour from "@/components/dasboard/AddTour";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import AddProduct from "@/components/dasboard/AddProduct";

const metadata = {
  title: "Dashboard-add-tour || ViaTour - Travel & Tour Reactjs Template",
  description: "ViaTour - Travel & Tour Reactjs Template",
};

export default function DBAddProductPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <AddProduct/>
      </main>
    </>
  );
}
