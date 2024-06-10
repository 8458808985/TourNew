import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "@/Urls/baseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
const navigate=useNavigate()
  const [formData, setFormData]=useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const inputHandler =(e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
  });
  }
console.log(formData)
const handleSubmit =async (e) => {
  e.preventDefault();
  try {
   const response = await fetch(`${BASE_URL}/signup`, {
    method:'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
});

        console.log(response)
      // alert('Signup successful');
      if(response.status === 200){
navigate("/login")
        toast.success("Successfully SignUp ", {
          position: "top-center"
        })
      }
      } catch (error) {
      console.error('Error signing up:', error);
      // alert('Signup failed');
      toast.failed("Failed SignUp ", {
        position: "top-center"
      })
  }
};
  return (
    <section className="mt-header layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="text-center mb-60 md:mb-30">
              <h1 className="text-30">   Register</h1>
              <div className="text-18 fw-500 mt-20 md:mt-15">
                Let's create your account!
              </div>
              <div className="mt-5">
                Already have an account?{" "}
                <Link to="/login" className="text-accent-1">
                  Log In!
                </Link>
              </div>
            </div>
      <ToastContainer/>

            <form
              onSubmit={handleSubmit}
              className="contactForm border-1 rounded-12 px-60 py-60 md:px-25 md:py-30"
            >
              

              <div className="form-input mt-30">
                <input type="text" required  name="firstname" onChange={inputHandler}/>
                <label className="lh-1 text-16 text-light-1">First Name</label>
              </div>

              <div className="form-input mt-30">
                <input type="text" required name="lastname" onChange={inputHandler}/>
                <label className="lh-1 text-16 text-light-1">Last Name</label>
              </div>

              <div className="form-input mt-30">
                <input type="email" required name="email" onChange={inputHandler}/>
                <label className="lh-1 text-16 text-light-1">Your Email</label>
              </div>

              <div className="form-input mt-30">
                <input type="password" required name="password" onChange={inputHandler}/>
                <label className="lh-1 text-16 text-light-1">
                  Password
                </label>
              </div>

              <button type="submit" className="button -md -dark-1 bg-accent-1 text-white col-12 mt-30">
                Register
                <i className="icon-arrow-top-right ml-10"></i>
              </button>

              <div className="relative line mt-50 mb-30">
                <div className="line__word fw-500">OR</div>
              </div>

              <div className="row y-gap-15">
                <div className="col">
                  <button
                    type="submit"
                    className="button -md -outline-blue-1 text-blue-1 col-12"
                  >
                    <i className="icon-facebook mr-10"></i>
                    Continue Facebook
                  </button>
                </div>

                <div className="col">
                  <button className="button -md -outline-red-1 text-red-1 col-12">
                    <i className="icon-google mr-10"></i>
                    Continue Google
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
