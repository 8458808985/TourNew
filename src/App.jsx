import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/style.css";

import Aos from "aos";
import HomePage1 from "./pages/homes/home-1";
import { useEffect, useState } from "react";
import HomePage2 from "./pages/homes/home-2";
import HomePage3 from "./pages/homes/home-3";
import HomePage4 from "./pages/homes/home-4";
import HomePage5 from "./pages/homes/home-5";
import HomePage6 from "./pages/homes/home-6";
import HomePage7 from "./pages/homes/home-7";
import HomePage8 from "./pages/homes/home-8";
import HomePage9 from "./pages/homes/home-9";
import HomePage10 from "./pages/homes/home-10";
import ScrollTopBehaviour from "./components/common/ScrollTopBehavier";
import ScrollToTop from "./components/common/ScrollToTop";
import TourListPage1 from "./pages/tour-lists/tour-list-1";
import TourListPage2 from "./pages/tour-lists/tour-list-2";
import TourListPage3 from "./pages/tour-lists/tour-list-3";
import TourListPage4 from "./pages/tour-lists/tour-list-4";
import TourListPage5 from "./pages/tour-lists/tour-list-5";
import TourListPage6 from "./pages/tour-lists/tour-list-6";
import TourListPage7 from "./pages/tour-lists/tour-list-7";
import TourListPage8 from "./pages/tour-lists/tour-list-8";
import TourListPage9 from "./pages/tour-lists/tour-list-9";
import TourListPage10 from "./pages/tour-lists/tour-list-10";
import TourSinglePage1 from "./pages/tour-singles/tour-single-1";
import TourSinglePage2 from "./pages/tour-singles/tour-single-2";
import TourSinglePage3 from "./pages/tour-singles/tour-single-3";
import TourSinglePage4 from "./pages/tour-singles/tour-single-4";
import TourSinglePage5 from "./pages/tour-singles/tour-single-5";
import BookingPage from "./pages/pages/booking-pages";
import DBMainPage from "./pages/dashboard/db-main";
import DBBookingPage from "./pages/dashboard/db-booking";
import DBListingPage from "./pages/dashboard/db-listing";
import DBAddProductPage from "./pages/dashboard/db-add-product";
import DBMessagesPage from "./pages/dashboard/db-messages";
import BlogListPage1 from "./pages/blogs/blog-list-1";
import BlogListPage2 from "./pages/blogs/blog-list-2";
import BlogListPage3 from "./pages/blogs/blog-list-3";
import BlogSinglePage from "./pages/blogs/blog-single";
import DestinationsPage from "./pages/pages/destinations";
import AboutPage from "./pages/pages/about";
import HelpCenterPage from "./pages/pages/help-center";
import TermsPage from "./pages/pages/terms";
import LoginPage from "./pages/pages/login";
import RegisterPage from "./pages/pages/register";
import InvoicePage from "./pages/pages/invoice";
import UIElementsPage from "./pages/pages/ui-elements";
import NotFoundPage from "./pages/pages/404";
import ContactPage from "./pages/pages/contact";
import DBAddBannerPage from "./pages/dashboard/db-add-banner";
import DBAddDestinationPage from "./pages/dashboard/db-add-destination";
import DBAddArticlePage from "./pages/dashboard/db-add-article";
import UpdateTour from "./components/dasboard/main/UpdateTour";
import DBUpdateTourPage from "./pages/dashboard/db-update-tour";
import { Navigate } from "react-router-dom";
import { Protected } from "./components/protected/protected";
import Aboutus from "./components/homes/Aboutus/Aboutus";
import AboutUs from "./components/AboutUs/AboutUs";
import AboutData from "./components/AboutUs/AboutData";
import PrivacyPolicy from "./components/AboutUs/Privacy_policy/PrivacyPolicy";
import PrivacyPolicyData from "./components/AboutUs/Privacy_policy/PrivacyPolicyData";
import ContactUs from "./components/AboutUs/ContactUs/ContactUs";
import ContactUsData from "./components/AboutUs/ContactUs/ContactUsData";
import TermCondition from "./components/AboutUs/TermCondition/TermCondition";
import TermConditionData from "./components/AboutUs/TermCondition/TermConditionData";
import Refund_policy from "./components/AboutUs/Refund_policy/Refund_policy";
import RefundData from "./components/AboutUs/Refund_policy/RefundData";
// import PrivateRouteComponent from './components/protected/protected';

function App() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);
  

  return (
    <>
      <BrowserRouter>
     
        <Routes >  
        <Route path='aboutus' element={<AboutUs/>}>
          <Route  index element={<AboutData/>}/>
        </Route>
        <Route path='/privacy_policy' element={<PrivacyPolicy/>}>
          <Route  index element={<PrivacyPolicyData/>}/>
        </Route>
        <Route path='contactUs' element={<ContactUs/>}>
          <Route  index element={<ContactUsData/>}/>
        </Route>
        <Route path='termCondition' element={<TermCondition/>}>
          <Route  index element={<TermConditionData/>}/>
        </Route>
        <Route path='Refund_policy' element={<Refund_policy/>}>
          <Route  index element={<RefundData/>}/>
        </Route>
          <Route path="/">
            <Route index element={<HomePage1  />} />
         
            {/* <Route path="/home-2" element={<HomePage2 />}/>
            <Route path="/home-3" element={<HomePage3 />} />
            <Route path="/home-4" element={<HomePage4 />} />
            <Route path="/home-5" element={<HomePage5 />} />
            <Route path="/home-6" element={<HomePage6 />} />
            <Route path="/home-7" element={<HomePage7 />} />
            <Route path="/home-8" element={<HomePage8 />} />
            <Route path="/home-9" element={<HomePage9 />} />
            <Route path="/home-10" element={<HomePage10 />} /> */}

            <Route path="/tour-list-1" element={<TourListPage1 />} />
            <Route path="/tour-list-2/:id" element={<TourListPage2 />} />
            {/* 
            <Route path="/tour-list-3" element={<TourListPage3 />} />
            <Route path="/tour-list-4" element={<TourListPage4 />} />
            <Route path="/tour-list-5" element={<TourListPage5 />} />
            <Route path="/tour-list-6" element={<TourListPage6 />} />
            <Route path="/tour-list-7" element={<TourListPage7 />} />
            <Route path="/tour-list-8" element={<TourListPage8 />} />
            <Route path="/tour-list-9" element={<TourListPage9 />} />
            <Route path="/tour-list-10" element={<TourListPage10 />} /> */}

            <Route path="/tour-single-1/:id" element={<TourSinglePage1 />} />
            <Route path="/tour-single-2/:id" element={<TourSinglePage2 />} />
            <Route path="/tour-single-3/:id" element={<TourSinglePage3 />} />
            <Route path="/tour-single-4/:id" element={<TourSinglePage4 />} />
            <Route path="/tour-single-5/:id" element={<TourSinglePage5 />} />
            {/* <Route path="/booking-pages" element={< PrivateRouteComponent Component={BookingPage} />} /> */}
            <Route path="/booking-pages" element={< Protected Component={BookingPage}/>}/>
            <Route path='/db-main' element={<Protected Component={DBMainPage} />} />
            <Route path="/db-booking" element={<DBBookingPage />} />
            <Route path="/db-listing" element={<DBListingPage />} />
            <Route path="/db-add-product" element={<DBAddProductPage />} />
            <Route path="/db-add-destination" element={<DBAddDestinationPage />} />
            <Route path="/db-add-banner" element={<DBAddBannerPage />} />
            <Route path="/db-add-article" element={<DBAddArticlePage />} />
            <Route path="/db-messages" element={<DBMessagesPage />} />

            <Route path="/blog-list-1" element={<BlogListPage1 />} />
            <Route path="/blog-list-2" element={<BlogListPage2 />} />
            <Route path="/blog-list-3" element={<BlogListPage3 />} />
            <Route path="/blog-single/:id" element={<BlogSinglePage />} />

            <Route path="/destinations/:id" element={< DestinationsPage/>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help-center" element={<HelpCenterPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/invoice" element={<InvoicePage />} />
            <Route path="/ui-elements" element={<UIElementsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/UpdateTour" element={<DBUpdateTourPage />} />

            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ScrollTopBehaviour />
      </BrowserRouter>
      <ScrollToTop />
    </>
  );
}
// PrivateRoute component
// function PrivateRoute({ component: Component, ...rest }) {
//   const { isLoggedIn } = React.useContext(AuthContext);

//   return isLoggedIn ? (
//     <Component {...rest} />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// }

export default App;
