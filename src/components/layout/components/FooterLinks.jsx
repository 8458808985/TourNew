import { Link } from "react-router-dom";

export default function FooterLinks() {
  return (
    <>
<div>
      <h5>Company</h5>
    <Link to="/aboutus">  <p>About Us</p></Link> 
    <Link to="/contactUs">  <p>Contact Us</p></Link> 
    </div>

    <div>
    <h5>Company Information</h5>
      
    <Link to="/privacy_policy">  <p>Privacy policy</p></Link> 
    <Link to="/termCondition">  <p>Terms And Conditions</p></Link> 
    <Link to="/Refund_policy">  <p>Refund And Policy</p></Link> 
    </div>
    </>
  );
}
