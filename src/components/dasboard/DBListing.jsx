import Pagination from "../common/Pagination";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Stars from "../common/Stars";
import { useEffect, useState } from "react";
import BASE_URL from "@/Urls/baseUrl";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DBListing() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [tours, setTours] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [tourToDelete, setTourToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate =useNavigate()
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
    fetch(`${BASE_URL}/tours`)
      .then(res => res.json())
      .then((data)=>{
        setTours(data);
        // setTotalPages(Math.ceil(data.length/6))
      })
      .catch(err => console.error('Error fetching tours:', err));
  }, [page]); 
  
  
    //pagination useEffect
    useEffect(() => {
      const pagedatacount = Math.ceil(tours.length / 6);
      setPageCount(pagedatacount);
  
      if (page) {
        const LIMIT = 6;
        const skip = LIMIT * page;
        const dataskip = tours.slice(page === 1 ? 0 : skip - LIMIT, skip);
        setPageData(dataskip);
      }
    }, [tours]);

    const deleteTour = async (id) => {
      try {
        const response = await axios.delete(`${BASE_URL}/tours/${id}`);
        if (response.status === 200) {
          setTours(tours.filter(tour => tour._id !== id));
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
  const edit_tour =async(eid)=>{
    try {
      let tour =await axios.get(`${BASE_URL}/tours/${eid}`)
      // console.log(book.data.edit_book)
      console.log(tour)
      localStorage.setItem("tour_edit", JSON.stringify(tour.data));
      
      navigate("/UpdateTour")
        
    } catch (error) {
    console.log(error)  
    }
    
        
      
}

 
  return (
    <>
      <div
        className={`dashboard ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard`}
      >
        <Sidebar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30">My Listings</h1>

            <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 md:px-20 md:pt-20 md:pb-20 mt-60 md:mt-30">
              <div className="row y-gap-30">
                {pageData.map((elm, i) => (
                  <div key={i} className="col-lg-6">
                    <div className="border-1 rounded-12 px-20 py-20">
                      <div className="row x-gap-20 y-gap-20 items-center">
                        <div className="col-xxl-auto">
                          <img
                            src={elm.imageSrc}
                            alt="image"
                            className="size-200 w-1/1 object-cover rounded-12"
                          />
                        </div>

                        <div className="col">
                          <div className="d-flex items-center">
                            <i className="icon-pin mr-5"></i>
                            {elm.location}
                          </div>

                          <div className="text-18 lh-15 fw-500 mt-5">
                            {elm.title}
                          </div>

                          <div className="d-flex items-center mt-5">
                            <div className="d-flex x-gap-5 text-yellow-2 mr-10">
                              <Stars star={elm.rating} />
                            </div>
                            <div>
                              {elm.rating} ({elm.ratingCount})
                            </div>
                          </div>

                          <div className="row y-gap-15 justify-between items-end pt-5">
                            <div className="col-auto">
                              <div className="d-flex items-center">
                                <i className="icon-clock mr-5"></i>
                                <div className="text-14">{elm.duration}</div>
                              </div>
                            </div>

                            <div className="col-auto">
                              <div className="text-right md:text-left">
                                <div className="lh-14">${elm.price}</div>
                                From{" "}
                                <span className="text-20 fw-500">
                                  ${elm.price + 1000}
                                </span>
                              </div>
                              
                            </div>
                           
                            {/* <div className="d-flex ">
                           <button onClick={() => {
                            delete_article(elm._id);
                          }}>  <i class="fa-sharp fa-solid fa-trash fs-4" style={{color:"#f00000"}} ></i></button>
      
                          <button className="ms-3"> <i class="fa-solid fa-pen-to-square fs-4 " style={{color: "#0d46f2"}}></i></button>
                            </div> */}
                           
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
        <Modal.Body>Are you sure you want to delete this tour?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteTour(tourToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
                    
                  <Button style={{marginLeft:"7px"}} onClick={() => {
                            edit_tour(elm._id);
                          }}>
                     <i class="fa-solid fa-pen-to-square fs-6  " ></i>
                  </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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

                {/* active={page === index + 1 ? true : false} */}
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
        </div>
      </div>
    </>
  );
}
