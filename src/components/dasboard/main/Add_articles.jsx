import Sidebar from "../Sidebar";
import Header from "../Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "@/Urls/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";


const tabs = ["Content", "Location", "Pricing", "Included"];
export default function AddProduct() {

  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [editData, setEditData] = useState([]); 
  const [activeTab, setActiveTab] = useState("Content");
  const [blog, setBlog] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [tourToDelete, setTourToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //handle next
  const handleNext = () => {
    if (page === pageCount) return page;
    setPage(page + 1);
  };
  //handle previos
  const handlePre = () => {
    if (page === 1) return page;
    setPage(page - 1);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/blog`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error("Error fetching tours:", err));
  }, [page, blog]);

   //pagination useEffect
   useEffect(() => {
    const pagedatacount = Math.ceil(blog.length / 6);
    setPageCount(pagedatacount);

    if (page) {
      const LIMIT = 6;
      const skip = LIMIT * page;
      const dataskip = blog.slice(page === 1 ? 0 : skip - LIMIT, skip);
      setPageData(dataskip);
    }
  }, [blog]);

  

  const [formData, setFormData] = useState({
    title: "",
    continent: "",
    author: "",
    desc: "",
    badge: "",
    imageSrc: "",
    date: "",
  });
  

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const FileHandler = (e) => {
    setFormData({ ...formData, imageSrc: e.target.files[0] });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // console.log(formData);
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("continent", formData.continent);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("desc", formData.desc);
      formDataToSend.append("badge", formData.badge);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("imageSrc", formData.imageSrc);

      const response = await fetch(
        "https://test1.buyjugaad.com/api/v1/blog/new",
        {
          method: "POST",
          body: formDataToSend,
        }
        
      );
      if(response.ok) {
        frmData.reset()
        toast.success("Successfully Add Destination ", {
          position: "top-center",
          autoClose: 500,
        });
        setSubmitted(true);
      }else{
        setSubmitted(false);

      }

    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // const delete_article = async(id) => {
  //   try {
  //     const result =await axios.delete(`${BASE_URL}/blog/${id}`);
  //   if (result.status === 200) {

  //     setBlog(blog.filter(article => article._id !== id));
  //     // If the deletion is successful, show a success message
  //     toast.success("Successfully deleted the article", {
  //       position: "top-center",
  //       autoClose: 500

  //     });
  //   } else {
  //     // Handle other status codes or errors if necessary
  //     alert("failed deleted")
  //   }
  //   } catch (error) {
  //     console.log(error)
  //   }
    
  // };

  const deleteTour = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/blog/${id}`);
      if (response.status === 200) {
        setBlog(blog.filter(blog => blog._id !== id));
        hideDeleteModal();
        // If the deletion is successful, show a success message
        toast.success("Successfully deleted the tour", {
          position: "top-center",
          autoClose: 2000
        });
      } else {
        // Handle other status codes or errors if necessary
        toast.error("Failed to delete the tour");
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  // Function to show the delete confirmation modal
  const showDeleteModal = (id) => {
    setTourToDelete(id);
    setShowModal(true);
  };

  // Function to close the delete confirmation modal
  const hideDeleteModal = () => {
    setTourToDelete(null);
    setShowModal(false);
  };
  // Edit And Update process
  const edit_article = async (id) => {
    try {
      // console.log(id);
      const result = await axios.get(`${BASE_URL}/blog/${id}`);
      console.log(result.data);
localStorage.setItem("Article", JSON.stringify(result.data));

    } catch (error) {}
  };
  useEffect(()=>{
    let localdata =localStorage.getItem("Article")
    console.log(localdata)
    if(localdata != null){
      let x = JSON.parse(localdata);
      setEditData(x)
    } 
  },[])

  const editHandler = (event) => {
    const { name, value } = event.target;
    setEditData([{ ...editData[0], [name]: value }]);
};

const NewFileHandler = (event)=>{
  setEditData({ ...editData[0], imageSrc: event.target.files[0] });
}
  
  const update = async (event) => {
   
  }
  // console.log(editData)

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
            <div className="d-flex justify-content-between ">
              <h1 className="text-30">All Article</h1>
              {/* <p className="">Your products are the goods</p> */}

              {/* <!-- Button trigger modal --> */}
              <button
                type="button"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ backgroundColor: "#78006E", color: "white" }}
              >
                <i class="fa-solid fa-circle-plus"></i> Add Article
              </button>
            </div>

            {/* <!-- Modal --> */}
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Add Article
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div className="rounded-12 bg-white shadow-2 px-10 pt-10 pb-10 mt-10">
                      <div className="tabs -underline-2 js-tabs">
                        <h2 style={{ fontSize: "18px" }}>
                          Content <span className="text-danger">*</span>
                        </h2>

                        <div className="row pt-40">
                          <div className="col-xl-9 col-lg-10">
                            <div className="tabs__content js-tabs-content">
                              <div
                                className={`tabs__pane  ${
                                  activeTab == "Content"
                                    ? "is-tab-el-active"
                                    : ""
                                }`}
                              >
                                
                                <form
                                  method="post"
                                  name="frmData"
                                  onSubmit={handleSubmit}
                                  encType="multipart/form-data"
                                >
                                  <div className="contactForm row y-gap-30">
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="title"
                                          onChange={inputHandler}
                                          // value={editData.title}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Title{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          required
                                          name="continent"
                                          type="text"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          continent{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="author"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Author
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="desc"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Description
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <div className="col-6 col-sm-12 col-lg-12">
                                          <div className="form-input ">
                                            <input
                                              type="text"
                                              required
                                              name="badge"
                                              onChange={inputHandler}
                                            />
                                            <label className="lh-1 text-16 text-light-1">
                                              Badge
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-6 col-sm-12 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="Date"
                                          required
                                          name="date"
                                          onChange={inputHandler}
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Date
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-12">
                                      <h4 className="text-18 fw-500 mb-20">
                                        Gallery
                                      </h4>

                                      <div className="row x-gap-20 y-gap-20">
                                        <div className="col-auto  ">
                                          <label
                                            htmlFor="imageInp1"
                                            className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                                          >
                                            <img
                                              alt="image"
                                              src={"/img/dashboard/upload.svg"}
                                            />

                                            <div className="text-16 fw-500 text-accent-1 mt-10">
                                              Upload Images
                                            </div>
                                          </label>
                                          <input
                                            onChange={FileHandler}
                                            name="imageSrc"
                                            accept="image/*"
                                            id="imageInp1"
                                            type="file"
                                            // style={{ display: "none" }}
                                          />
                                        </div>
                                      </div>

                                      <div className="text-14 mt-20">
                                        PNG or JPG no bigger than 800px wide and
                                        tall.
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                  type="submit"
                                    class="btn  mt-30"
                                    style={{
                                      backgroundColor: "#78006E",
                                      color: "white",
                                    }}
                                  >
                                    Save changes
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>


            {/* edit model */}


            <div
              class="modal fade"
              id="modelExample"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Update Article
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div className="rounded-12 bg-white shadow-2 px-10 pt-10 pb-10 mt-10">
                      <div className="tabs -underline-2 js-tabs">
                        <h2 style={{ fontSize: "18px" }}>
                          Content <span className="text-danger">*</span>
                        </h2>

                        <div className="row pt-40">
                          <div className="col-xl-9 col-lg-10">
                            <div className="tabs__content js-tabs-content">
                              <div
                                className={`tabs__pane  ${
                                  activeTab == "Content"
                                    ? "is-tab-el-active"
                                    : ""
                                }`}
                              >
                                {/* { editData.map((items, i)=>{
                                  // key={i}
                                  return( */}
                                <form
                                  name="frm"
                                  method="post"
                                  onSubmit={update}
                                  encType="multipart/form-data"

                                >

                                    <div className="contactForm row y-gap-30">
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="title"
                                          onChange={editHandler}
                                          value={editData.length > 0 ? editData[0].title : "" }
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Title{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          required
                                          name="continent"
                                          type="text"
                                          onChange={editHandler}
                                          value={editData.length > 0 ? editData[0].continent: "" }

                                          // value={items.continent || ""}
                                          
                                          />
                                        <label className="lh-1 text-16 text-light-1">
                                          continent{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="author"
                                          onChange={editHandler}
                                          value={editData.length > 0 ? editData[0].author: "" }
                                          
                                          />
                                        <label className="lh-1 text-16 text-light-1">
                                          Author
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          type="text"
                                          required
                                          name="desc"
                                          onChange={editHandler}
                                          value={editData.length > 0 ? editData[0].desc: "" }
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Description
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-lg-6">
                                      <div className="form-input ">
                                        <div className="col-6 col-sm-12 col-lg-12">
                                          <div className="form-input ">
                                            <input
                                              type="text"
                                              required
                                              name="badge"
                                              onChange={editHandler}
                                              value={editData.length > 0 ? editData[0].badge: "" }
                                            />
                                            <label className="lh-1 text-16 text-light-1">
                                              Badge
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-6 col-sm-12 col-lg-6">
                                      <div className="form-input ">
                                        <input
                                          // value={items.date || ""}
                                          type="Date"
                                          // required
                                          name="date"
                                          onChange={editHandler}
                                              value={editData.length > 0 ? editData[0].date: "" }

                                          />
                                        <label className="lh-1 text-16 text-light-1">
                                          Date
                                          <span className="text-danger">*</span>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-12">
                                      <h4 className="text-18 fw-500 mb-20">
                                        Gallery
                                      </h4>

                                      <div className="row x-gap-20 y-gap-20">
                                        <div className="col-auto  ">
                                          <label
                                            htmlFor="imageInp1"
                                            className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                                          >
                                            <img
                                              alt="image"
                                              src={"/img/dashboard/upload.svg"}
                                            />

                                            <div className="text-16 fw-500 text-accent-1 mt-10">
                                              Upload Images
                                            </div>
                                          </label>
                                          <input
                                            onChange={NewFileHandler}
                                            name="imageSrc"
                                            accept="image/*"
                                            id="imageInp1"
                                            type="file"
                                            value={editData.length > 0 ? editData[0].file: "" }

                                            // value={items.file }  

                                            style={{ display: "none" }}
                                            />
                                        </div>
                                      </div>

                                      <div className="text-14 mt-20">
                                        PNG or JPG no bigger than 800px wide and
                                        tall.
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    class="btn  mt-30"
                                    style={{
                                      backgroundColor: "#78006E",
                                      color: "white",
                                    }}
                                    type="submit"
                                    >
                                    Update
                                  </button>
                                </form>
                                    {/* )
                                  })} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* ........................... */}
          </div>
          <section className="layout-pt-xl">
            <div className="container">
              <div className="row justify-between items-end y-gap-10 mt-20">
                <div className="col-auto">
                </div>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay=""
                className="row y-gap-30 pt-40 sm:pt-20"
              >
                {pageData.map((elm, i) => (
                  <div key={i} className="col-lg-4 col-md-4 col-sm-4 col-12">
                    <div className="card shadow mb-1 mb-2 border-0">
                      <div className="card-body mb-3">
                        <div className="btn d-flex justify-content-end"></div>

                        <Link
                          to={`/blog-single/${elm.id}`}
                          className="blogCard -type-1"
                        >
                          <div className="blogCard__image ratio ratio-41:30">
                            <img
                              src={elm.imageSrc}
                              alt="image"
                              className="img-ratio rounded-12"
                            />
                          </div>

                          <div className="blogCard__content mt-30">
                            <div className="blogCard__info text-14 d-flex justify-content-between">
                              <div
                                className="lh-13"
                                style={{ fontSize: "12px", fontWeight: "700" }}
                              >
                                {elm.date}
                              </div>
                              <div className="blogCard__line"></div>
                              <div
                                className="lh-13"
                                style={{ fontSize: "12px", fontWeight: "700" }}
                              >
                                By {elm.author}
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="d-flex justify-content-between">
                          <h3 className="blogCard__title text-18 fw-500 mt-10">
                            <span
                              style={{ fontSize: "15px", fontWeight: "700" }}
                            >
                              {" "}
                              {elm.title}
                            </span>
                          </h3>
                          <div
                            className="blogCard__badge"
                            style={{ fontSize: "15px", fontWeight: "700" }}
                          >
                            {elm.badge}
                          </div>
                        </div>
                        <hr />
                        <Button 
              style={{ backgroundColor: "red", marginLeft: "10px", border:"none"  }}
              onClick={() => showDeleteModal(elm._id)}
            >
                    <i class="fa-sharp fa-solid fa-trash "></i>
              
            </Button>
                             {/* Delete confirmation modal */}
       {/* Delete confirmation modal */}
       <Modal show={showModal} onHide={hideDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Article?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteTour(tourToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
                  <Button style={{marginLeft:"7px"}}  data-bs-toggle="modal"
                          data-bs-target="#modelExample" onClick={() => {
                            edit_article(elm._id);
                          }}>
                     <i class="fa-solid fa-pen-to-square fs-6  " ></i>
                  </Button>
                        
      
                                                                          
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div style={{display:"flex", justifyContent:"center",}}  >
          <nav
          className=" mb-30 mt-40"
              aria-label="Page navigation example"
              style={{ marginTop: "20px",  }}
            >

              <ul class="pagination">
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    style={{color:"black", fontSize:"20px"}}
                    onClick={handlePre}
                    disabled={page === 1}
                  >
                    Previous
                  </a>
                </li>

                {Array(pageCount)
                  .fill(null)
                  .map((item, index) => {
                    return (
                      <>
                        <li className="page-item ">
                          <a
                    style={{color:"black", fontSize:"20px"}}
                      
                            class="page-link"
                            href="#"
                            onClick={() => setPage(index + 1)}
                          >
                            {index + 1}
                          </a>
                        </li>
                      </>
                    );
                  })}
                <li class="page-item">
                  <a
                    class="page-link"
                    style={{color:"black", fontSize:"20px"}}

                    href="#"
                    onClick={handleNext}
                    disabled={page === pageCount}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
            </div>
        </div>
      </div>
    </>
  );
}
