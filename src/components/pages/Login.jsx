import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "@/Urls/baseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


const navigate = useNavigate()

// console.log(formData)
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    
    const response = await axios.post(`${BASE_URL}/login`, { email, password  });
    // Assuming the API returns a token upon successful login
    // setIsUser(response)
    const token = response.data.token;
    const role = response.data.role
    const _id = response.data.id
    const Name = response.data.firstname
    console.log(_id)
    console.log(role)
    // Store the token in local storage or session storage
    localStorage.setItem('userName', Name);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    // Redirect or do something else upon successful login
   navigate('/');
   toast.success("Successfully Login ", {
    position: "top-center"
  })
    if (role === 'admin') {
      setIsAdmin(true);
      // alert('Admin logged in successfully.');
      toast.success("Successfully Admin Login ", {
        position: "top-center"
      })
      navigate('/db-main')
    }else if(role === user){
      setIsUser(true);

      alert('User logged in successfully.');

    }
  } catch (err) {
    setError(err);
  }
};

return (

    <section className="mt-header layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="text-center mb-60 md:mb-30">
              <h1 className="text-30">   Log In</h1>
              <div className="text-18 fw-500 mt-20 md:mt-15">
                We're glad to see you again!
              </div>
              <div className="mt-5">
                Don't have an account?{" "}
                <Link to="/register" className="text-accent-1">
                  Sign Up!
                </Link>
              </div>
            </div>

            <ToastContainer/>
            <form
              onSubmit={handleSubmit}
              className="contactForm border-1 rounded-12 px-60 py-60 md:px-25 md:py-30"
            >
              <div className="form-input ">
                <input type="email" value={email } onChange={(e) => setEmail(e.target.value)} required />
                <label className="lh-1 text-16 text-light-1">
                  Email Address
                </label>
              </div>

              <div className="form-input mt-30">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label className="lh-1 text-16 text-light-1">Password</label>
              </div>

              <div className="row y-ga-10 justify-between items-center pt-30">
                <div className="col-auto">
                  <div className="d-flex items-center">
                    <div className="form-checkbox ">
                      <input type="checkbox" name="name" />
                      <div className="form-checkbox__mark">
                        <div className="form-checkbox__icon">
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="lh-11 ml-10">Remember me</div>
                  </div>
                </div>

                <div className="col-auto">
                  <a href="#">Lost your password?</a>
                </div>
              </div>

              <button
                type="submit"
                className="button -md -dark-1 bg-accent-1 text-white col-12 mt-30"
              >
                Log In
                <i className="icon-arrow-top-right ml-10"></i>
              </button>

              <div className="relative line mt-50 mb-30">
                <div className="line__word fw-500">OR</div>
              </div>

              <div className="row y-gap-15">
                <div className="col">
                  <button className="button -md -outline-blue-1 text-blue-1 col-12">
                    <i className="icon-facebook mr-10"></i>
                    Continue Facebook
                  </button>
                </div>

                <div className="col">
                  <button className="button -md -outline-red-1 text-red-1 col-12">
                    <i className="icon-google mr-10"></i>
                   <a href="https://accounts.google.com/signup
">Continue Google</a> 
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
