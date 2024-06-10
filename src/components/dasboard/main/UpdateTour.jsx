import Sidebar from "../Sidebar";
import Header from "../Header";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import Map from "../../pages/contact/Map";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const tabs = ["Content", "Location", "Pricing", "Included"];
export default function UpdateTour() {

  const navigate = useNavigate()
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Content");
//   const[editData ,setEditData]=useState([])
  const [formData, setFormData] = useState([]);
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

  const UpdateTour = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // console.log(formData)
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("_id", formData._id);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("duration", formData.duration);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("feature", formData.feature);
    formDataToSend.append("spead", formData.spead);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("ratingCount", formData.ratingCount);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("imageSrc", formData.imageSrc);

      const response = await axios.put("https://test1.buyjugaad.com/api/v1/tours", formDataToSend)

      if (response.status===200) {
        // throw new Error('Failed to submit form');
        // frm.reset()
        toast.success("Successfully Update Tour ", {
          position: "top-center",
          autoClose: 300

        })
        navigate("/db-listing")
      }

      setSubmitted(true);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(()=>{
    let localdata =localStorage.getItem("tour_edit")
    console.log(localdata)
    if(localdata != null){
      let x = JSON.parse(localdata);
      setFormData(x)
    } 
  },[])

//   console.log(editData)
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
            <h1 className="text-30">Update Tour</h1>
          

            <div className="rounded-12 bg-white shadow-2 px-40 pt-410 pb-30 mt-10">
              <div className="tabs -underline-2 js-tabs">
                

                <form name="frm" method="post" onSubmit={UpdateTour} encType="multipart/form-data">
                <div className="row pt-40">
                  <div className="col-xl-9 col-lg-10">
                    <div className="tabs__content js-tabs-content">
                     
                        <div className="row  contactForm  y-gap-30">
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required name="title" onChange={inputHandler} 
                                        
                              
                              />
                              <label className="lh-1 text-16 text-light-1">
                                Tour Title
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required  name="duration" onChange={inputHandler}
                                         
                              
                              />
                              <label className="lh-1 text-16 text-light-1">
                                Duration
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required name="price" onChange={inputHandler}
                                         
                              
                              />
                              <label className="lh-1 text-16 text-light-1">
                                Price
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required name="feature" onChange={inputHandler}
                                         
                              
                              />
                              <label className="lh-1 text-16 text-light-1">
                              Feature
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required name="spead" onChange={inputHandler}
                                                                       
                              />
                              <label className="lh-1 text-16 text-light-1">
                              Spead
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required name="location" onChange={inputHandler}
                                         
                              
                              />
                              <label className="lh-1 text-16 text-light-1">
                              Location
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required name="rating" onChange={inputHandler}
                                         
                              
                              />
                              <label className="lh-1 text-16 text-light-1">
                              Rating
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-input ">
                              <input type="text" required name="ratingCount" onChange={inputHandler}
                                         
                              
                              />
                              <label className="lh-1 text-16 text-light-1">
                              RatingCount
                              </label>
                            </div>
                          </div>
                          <div className="mb-3">
                                        <label htmlFor="formFile" style={{fontWeight:"700"}} className="form-label mx-3">
                                        Select File Here
                                        </label>
                                        <input className="form-cont
                                        rol fs-6" style={{border:"1px solid black"}} type="file" id="formFile" name="imageSrc" onChange={FileHandler}
                                        //   value={formData.length > 0 ? formData[0].file : "" }   
                                        
                                        />
                                        {/* <input type="hidden" value={formData[0]._id} /> */}
                                    </div>

                          <div className="col-12">
                            <button className="button -md -dark-1 bg-accent-1 text-white" type="submit">
                              Update
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
          </div>
        </div>
      </div>
    </>
  );
}
