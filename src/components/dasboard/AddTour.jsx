import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import Map from "../pages/contact/Map";

// const tabs = ["Content", "Location", "Pricing", "Included"];
export default function AddTour() {

  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Content");
  const [formData, setFormData] = useState({
    title: "",
        imageSrc: "",
        duration: "",
        price: "",
        feature: "",
        spead: "",
        location: "",
        ratingCount: " ",
        rating: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const FileHandler = (e) => {
    setFormData({ ...formData, imageSrc: e.target.files[0] });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(formData)
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("duration", formData.duration);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("feature", formData.feature);
    formDataToSend.append("spead", formData.spead);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("ratingCount", formData.ratingCount);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("imageSrc", formData.imageSrc);

      const response = await fetch("https://test1.buyjugaad.com/api/v1/tours/new", {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        // throw new Error('Failed to submit form');
        frm.reset()
        toast.success("Successfully Add Tour ", {
          position: "top-center",
          autoClose: 300

        })
      }

      setSubmitted(true);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

 

  
   return (
    <>
     <ToastContainer />
      <div
        className={`dashboard ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard`}
      >
        <Sidebar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30">Add Tour</h1>
          

            <div className="rounded-12 bg-white shadow-2 px-40 pt-410 pb-30 mt-10">
              <div className="tabs -underline-2 js-tabs">
                

                <form name="frm" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row pt-40">
                  <div className="col-xl-9 col-lg-10">
                    <div className="tabs__content js-tabs-content">
                     
                        <div className="row  contactForm  y-gap-30">
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required name="title" onChange={inputHandler}  />
                              <label className="lh-1 text-16 text-light-1">
                                Tour Title
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required  name="duration" onChange={inputHandler}/>
                              <label className="lh-1 text-16 text-light-1">
                                Duration
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required name="price" onChange={inputHandler}/>
                              <label className="lh-1 text-16 text-light-1">
                                Price
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required name="feature" onChange={inputHandler}/>
                              <label className="lh-1 text-16 text-light-1">
                              Feature
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required name="spead" onChange={inputHandler}/>
                              <label className="lh-1 text-16 text-light-1">
                              Spead
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required name="location" onChange={inputHandler}/>
                              <label className="lh-1 text-16 text-light-1">
                              Location
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required name="rating" onChange={inputHandler}/>
                              <label className="lh-1 text-16 text-light-1">
                              Rating
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required name="ratingCount" onChange={inputHandler}/>
                              <label className="lh-1 text-16 text-light-1">
                              RatingCount
                              </label>
                            </div>
                          </div>
                          <div className="mb-3">
                                        <label htmlFor="formFile" style={{fontWeight:"700"}} className="form-label mx-3">
                                        Select File Here
                                        </label>
                                        <input className="form-control fs-6" style={{border:"1px solid black"}} type="file" id="formFile" name="banner" onChange={FileHandler} />
                                    </div>

                          <div className="col-12">
                            <button className="button -md -dark-1 bg-accent-1 text-white" type="submit">
                              Save Changes
                              <i className="icon-arrow-top-right text-16 ml-10"></i>
                            </button>
                          </div>
                        </div>
                      
                        
                    </div>
                  </div>
                </div>
                </form>
              </div>
            </div>

            <div className="text-center pt-30">
              {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
