import React from "react";
import Paymentcards from "../components/Paymentcards";
import FooterLinks from "../components/FooterLinks";
import Socials from "../components/Socials";
import { Link } from "react-router-dom";

export default function FooterOne() {
  return (
    <footer className="footer -type-1 mt-3">
    
      <div className="footer__main">
        <div className="footer__bg w-100 " >
          <img src="/img/footer/1/bg.svg" alt="image"  />
        </div>

          <div className="footer__info">
            <div className="row y-gap-20 justify-between">
              <div className="col-auto">
                <div className="row y-gap-20 items-center">
                  {/* <div className="col-auto">
                    <i className="icon-headphone text-50"></i>
                  </div> */}

                  <div className="col-auto">
                    {/* <div className="text-20 fw-500">
                      Speak to our expert at
                      <span className="text-accent-1">1-800-453-6744</span>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="col-auto">
                <div className="footerSocials">
                  <div className="footerSocials__title">Follow Us</div>

                  <div className="footerSocials__icons">
                    <Socials />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__content">
            <div className="row y-gap-40 d-flex justify-content-between">
              <div className="col-lg-3 col-md-5 ms-3">
                <h4 className="text-20 fw-500">Contact</h4>

                <div className="y-gap-10 mt-20">
                  <a className="d-block" href="#">
                    328 Queensberry Street, North Melbourne VIC3051, Australia.
                  </a>
                  <a className="d-block" href="#">
              k@gmail.com
                  </a>
                </div>
              </div>

{/* <div className="d-flex"> */}
<div className="col-lg-4 col-md-5 ms-3">
      <h5>Company</h5>
    <Link to="/aboutus">  <p className="my-2">About Us</p></Link> 
    <Link to="/contactUs">  <p className="my-2">Contact Us</p></Link> 
    </div>

  <div className="col-lg-4 col-md-5 ms-3">
    <h5>Company Information</h5>
      
    <Link to="/privacy_policy">  <p className="my-2">Privacy policy</p></Link> 
    <Link to="/termCondition">  <p className="my-2">Terms And Conditions</p></Link> 
    <Link to="/Refund_policy">  <p className="my-2">Refund And Policy</p></Link> 
    </div>


              {/* <FooterLinks /> */}

            </div>
          </div>
        </div>
     

      <div className="container">
        <div className="footer__bottom">
          <div className="row y-gap-5 justify-between items-center">
            <div className="col-auto">
            
            </div>

            <div className="col-auto">
              <div className="footer__images d-flex items-center x-gap-10">
                <Paymentcards />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
