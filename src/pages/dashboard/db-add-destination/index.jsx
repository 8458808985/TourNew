// import AddTour from "@/components/dasboard/AddTour";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
// import AddProduct from "@/components/dasboard/AddProduct";
import  Add_destination  from "@/components/dasboard/Add_destination";

const metadata = {
  title: "Dashboard-add-tour || ViaTour - Travel & Tour Reactjs Template",
  description: "ViaTour - Travel & Tour Reactjs Template",
};

export default function DBAddDestinationPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Add_destination/>
      </main>
    </>
  );
}
