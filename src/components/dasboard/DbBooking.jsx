import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Pagination from "../common/Pagination";
import { bookingData } from "@/data/dashboard";
import BASE_URL from "@/Urls/baseUrl";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const tabs = ["Approved", "Pending", "Cancelled"];
export default function DbBooking() {
  const [booking , setBooking]=useState([])
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/booking`)
      .then(res => res.json())
      .then(data=>setBooking(data))
      .catch(err => console.error('Error fetching tours:', err));
  }, []);

  const deleteBanner = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/booking/${id}`);
      if (response.status === 200) {
        setBooking(booking.filter((dest) => dest._id !== id));
        hideDeleteModal();
        toast.success("Successfully deleted the banner", {
          position: "top-center",
          autoClose: 500,
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

  console.log(booking)
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [currentTab, setcurrentTab] = useState("Pending");
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
          <h1 className="text-30 mb-5">My Booking</h1>

          <div className="table-responsive mt-5">
          <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {booking.map((items, index)=>{
      return(
<tr key={index}>
      <th scope="row"><span>{index+1}</span></th>
      <td >{items.name}</td>
      <td >{items.lastname}</td>
      <td >{items.email}</td>
      <td>{items.phone}</td>
      <td style={{display:"flex"}}>  <Button
className="btn btn-sm me-3 mb-3"
style={{ backgroundColor: "red", marginLeft: "0px", border: "none" }}
onClick={() => showDeleteModal(items._id)} // Assuming elm._id is defined elsewhere
>
<i className="fa-sharp fa-solid fa-trash fs-6"></i>
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
<Button className="btn btn-sm me-3 fs-6 mb-3"   data-bs-toggle="modal"
                    data-bs-target="#ediModal" onClick={() => {
                      handleEdit(items._id);
                    }}>
               <i class="fa-solid fa-pen-to-square fs-6   " ></i>
            </Button></td>
    </tr>

      )
    })}
    
  </tbody>
</table>
</div>

        </div>
      </div>
    </div>
    </>
  );
}
