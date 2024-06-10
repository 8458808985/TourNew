import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import BASE_URL from "@/Urls/baseUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const tabs = ["Content", "Location", "Pricing", "Included"];

export default function Add_destination() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Content");
  const [destinations, setDestinations] = useState([]);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", imageSrc: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [editDestination, setEditDestination] = useState(null);
  // console.log("eee",editDestination)
  

  const fetchDestinations = () => {
    try {
      fetch(`${BASE_URL}/destination`)
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.error("Error fetching destinations:", err));
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    if (editDestination) {
      setFormData({ name: editDestination[0].name, imageSrc: editDestination.imageSrc });
    }
  }, [editDestination]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const FileHandler = (e) => {
    setFormData({ ...formData, imageSrc: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("imageSrc", formData.imageSrc);

      let url = `${BASE_URL}/destination/new`;
      let method = "POST";
      if (editDestination) {
        url = `${BASE_URL}/destination/${editDestination[0]._id}`;
        method = "PUT";
      }
      
        const response = await fetch(url, {
          method: method,
          body: formDataToSend,
        });

      if (response.status===200) {
        if (editDestination) {
          toast.success("Successfully updated destination", {
            position: "top-center",
            autoClose: 2000,
          });
          setEditDestination(null);
        } else {
          formDt.reset();
          toast.success("Successfully added destination", {
            position: "top-center",
            autoClose: 500,
          });

        }
        fetchDestinations();
      }
      setSubmitted(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };


  const deleteBanner = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/destination/${id}`);
      if (response.status === 200) {
        setDestinations(destinations.filter((dest) => dest._id !== id));
        hideDeleteModal();
        toast.success("Successfully deleted the banner", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error("Failed to delete the banner");
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  const showDeleteModal = (id) => {
    setBannerToDelete(id);
    setShowModal(true);
  };

  const hideDeleteModal = () => {
    setShowModal(false);
    setBannerToDelete(null);
  };

  const handleEdit = (id) => {
    fetchDestinationForEdit(id);
  };
  const fetchDestinationForEdit = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/destination/${id}`);
      console.log("Response data:", response.data); 
      setEditDestination(response.data.data);
    } catch (error) {
      console.error("Error fetching destination for edit:", error);
    }
  };
  

  return (
    <>
      <ToastContainer />

      <div
        className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""} js-dashboard`}
      >
        <Sidebar setSideBarOpen={setSideBarOpen} />
        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />
          <div className="dashboard__content_content">
            <div className="d-flex justify-content-between ">
              <h1 className="text-30">All Destination</h1>
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#78006E", color: "white" }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="fa-solid fa-circle-plus"></i> Add destination
              </button>
            </div>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Add Destination
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="rounded-12 bg-white shadow-2 px-10 pt-10 pb-10 mt-10">
                      <div className="tabs -underline-2 js-tabs">
                        <div className="row pt-10">
                          <div className="col-xl-9 col-lg-10">
                            <div className="tabs__content js-tabs-content">
                              <div
                                className={`tabs__pane  ${
                                  activeTab === "Content"
                                    ? "is-tab-el-active"
                                    : ""
                                  }`}
                              >
                                <form
                                  name="formDt"
                                  method="post"
                                  onSubmit={handleSubmit}
                                  encType="multipart/form-data"
                                >
                                  <div className="contactForm row y-gap-30">
                                    <h4 className="text-18 fw-500 mb-2">
                                      Gallery
                                    </h4>
                                    <div className="input-group mb-3">
                                      <div className="input-group mb-3">
                                        <input
                                          type="file"
                                          onChange={FileHandler}
                                          name="imageSrc"
                                          className="form-control"
                                          id="inputGroupFile02"
                                        />
                                        <label
                                          className="input-group-text"
                                          htmlFor="inputGroupFile02"
                                        >
                                          Upload
                                        </label>
                                      </div>
                                      <div className="col-6 col-sm-12 col-lg-12 mt-5">
                                        <div className="form-input ">
                                          <input
                                            type="text"
                                            required
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                          />
                                          <label className="lh-1 text-16 text-light-1">
                                            Name
                                            <span className="text-danger">*</span>
                                          </label>
                                        </div>
                                        <div className="modal-footer"></div>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      className="btn btn-secondary mt-2 mb-2"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    <button
                                      type="submit"
                                      style={{
                                        backgroundColor: "#78006E",
                                        fontWeight: "700",
                                        color: "white",
                                      }}
                                      className="btn  mt-3 mb-2"
                                    >
                                      Save changes
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="ediModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit Destination
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="rounded-12 bg-white shadow-2 px-10 pt-10 pb-10 mt-10">
                      <div className="tabs -underline-2 js-tabs">
                        <div className="row pt-10">
                          <div className="col-xl-9 col-lg-10">
                            <div className="tabs__content js-tabs-content">
                              <div
                                className={`tabs__pane  ${
                                  activeTab === "Content"
                                    ? "is-tab-el-active"
                                    : ""
                                  }`}
                              >
                                <form
                                  // name="formrv"
                                  method="post"
                                  onSubmit={handleSubmit}
                                  encType="multipart/form-data"
                                >
                                  <div className="contactForm row y-gap-30">
                                    <h4 className="text-18 fw-500 mb-2">
                                      Gallery
                                    </h4>
                                    <div className="input-group mb-3">
                                      <div className="input-group mb-3">
                                        <input
                                          type="file"
                                          onChange={FileHandler}
                                          name="imageSrc"
                                          className="form-control"
                                          id="inputGroupFile02"
                                        />
                                        <label
                                          className="input-group-text"
                                          htmlFor="inputGroupFile02"
                                        >
                                          Upload
                                        </label>
                                      </div>
                                      <div className="col-6 col-sm-12 col-lg-12 mt-5">
                                        <div className="form-input ">
                                          <input
                                            type="text"
                                            required
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                          />
                                          <label className="lh-1 text-16 text-light-1">
                                            Name
                                            <span className="text-danger">*</span>
                                          </label>
                                        </div>
                                        <div className="modal-footer"></div>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      className="btn btn-secondary mt-2 mb-2"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    <button
                                      type="submit"
                                      style={{
                                        backgroundColor: "#78006E",
                                        fontWeight: "700",
                                        color: "white",
                                      }}
                                      className="btn  mt-3 mb-2"
                                    >
                                      Update
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="layout-pt-xl">
  <div className="container">
    <div className="row y-gap-10 justify-between items-end">
      <div className="col-auto  ">
       
      </div>

      <div data-aos="fade-up" className="col-auto">
        <Link
          to={"/tour-list-1"}
          className="buttonArrow d-flex items-center "
        >
          <span>See all</span>
          <i className="icon-arrow-top-right text-16 ml-10"></i>
        </Link>
      </div>
    </div>


<div className="row mt-30 ">
{destinations.map((elm, i) => (
<div className="col-md-4 mt-10 mb-30 " style={{display:"flex", justifyContent:"center"}}>
<div class="card" style={{width:"18rem"}}>
<img src={elm.imageSrc} style={{width:"100%", height:"200px"}}/>
<div class="card-body">
<h3 class="card-text text-center">{elm.name} </h3>
</div>

<hr />
<div className="d-flex justify-content-end">

                      <>
                      <Button
className="btn btn-sm me-3 mb-3"
style={{ backgroundColor: "red", marginLeft: "0px", border: "none" }}
onClick={() => showDeleteModal(elm._id)} // Assuming elm._id is defined elsewhere
>
<i className="fa-sharp fa-solid fa-trash fs-4"></i>
</Button>

{/* Delete confirmation modal */}
<Modal show={showModal} onHide={hideDeleteModal}>
<Modal.Header closeButton>
<Modal.Title>Confirm Delete</Modal.Title>
</Modal.Header>
<Modal.Body>Are you sure you want to delete this Destination?</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={hideDeleteModal}>
  Cancel
</Button>
<Button variant="danger" onClick={() => deleteBanner(bannerToDelete)}>
  Delete
</Button>
</Modal.Footer>
</Modal>
<Button className="btn btn-sm me-3 fs-5 mb-3"   data-bs-toggle="modal"
                    data-bs-target="#ediModal" onClick={() => {
                      handleEdit(elm._id);
                    }}>
               <i class="fa-solid fa-pen-to-square fs-4   " ></i>
            </Button>
            </>
</div>
</div>
</div>

))}

</div>
  </div>
</section>
          </div>
        </div>
      </div>
    
    </>
  );
}
