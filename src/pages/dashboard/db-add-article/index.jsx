// import AddTour from "@/components/dasboard/AddTour";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
// import AddBanner from "@/components/dasboard/AddBanner";
// import AddTour from "@/components/dasboard/AddTour";
import Add_articles from "@/components/dasboard/main/Add_articles";


const metadata = {
  title: "Dashboard-add-tour || ViaTour - Travel & Tour Reactjs Template",
  description: "ViaTour - Travel & Tour Reactjs Template",
};

export default function DBAddArticlePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Add_articles/>
      </main>
    </>
  );
}
