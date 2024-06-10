import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  import BASE_URL from "../../Urls/baseUrl";
const tabs = ["Content", "Location", "Pricing", "Included"];
export default function AddBanner() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [banner, setBanner] = useState([]);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedBanner, setEditedBanner] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = () => {
    axios.get(`${BASE_URL}/banner`)
      .then(response => setBanner(response.data))
      .catch(error => console.error('Error fetching banners:', error));
  };

  const FileHandler = (e) => {
    setEditedBanner({ ...editedBanner, banner: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('banner', editedBanner.banner);

      const response = await axios.post(`${BASE_URL}/banner/new`, formDataToSend);

      if (response.status === 200) {
        toast.success("Successfully Added Banner", {
          position: "top-center",
          autoClose: 2000
        });
        fetchBanners(); // Refresh banners after successful addition
        setShowModal(false);
      } else {
        toast.error("Failed to add banner");
      }
    } catch (error) {
      console.error("Error adding banner:", error);
      toast.error("Failed to add banner");
    }
  };

  const deleteBanner = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/banner/${id}`);
      if (response.status === 200) {
        setBanner(banner.filter(banner => banner._id !== id));
        toast.success("Successfully deleted the banner", {
          position: "top-center",
          autoClose: 2000
        });
      } else {
        toast.error("Failed to delete the banner");
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Failed to delete the banner");
    }
  };

  const editBanner = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('banner', editedBanner.banner);

      const response = await axios.put(`${BASE_URL}/banner/${editedBanner._id}`, formDataToSend);

      if (response.status === 200) {
        toast.success("Successfully Updated Banner", {
          position: "top-center",
          autoClose: 2000
        });
        fetchBanners(); // Refresh banners after successful update
        setEditModalOpen(false);
      } else {
        toast.error("Failed to update banner");
      }
    } catch (error) {
      console.error("Error updating banner:", error);
      toast.error("Failed to update banner");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""}`}>
        <Sidebar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30 mx-3">Add Banner</h1>
            <form onSubmit={handleSubmit}>
              <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-60">
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-12">
                    <div className="mb-3">
                      <label htmlFor="formFile" style={{ fontWeight: "700" }} className="form-label mx-3">
                        Select File Here
                      </label>
                      <input className="form-control fs-4" style={{ border: "1px solid black" }} type="file" id="formFile" name="banner" onChange={FileHandler} />
                    </div>
                    <div className="btn btn-success text-light shadow">
                      <button className="text-light fs-4" type="submit" style={{ fontWeight: "700" }}>Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            {banner.map((elm, i) => (
              <div className="table-responsive" key={i}>
                <table className="table">
                  <tbody>
                    <tr className="d-flex justify-content-between align-items-center mt-5 mx-5">
                      <td className="mb-1">
                        <img src={elm.banner} alt={`Banner ${i}`} className="mt-5 mb-5" />
                      </td>
                      <td className="mt-10">
                        <Button style={{ backgroundColor: "red", marginLeft: "10px", border: "none" }} onClick={() => deleteBanner(elm._id)}>
                          <i className="fa-sharp fa-solid fa-trash "></i>
                        </Button>
                        <Button style={{ marginLeft: "7px" }} onClick={() => {
                          setEditedBanner(elm);
                          setEditModalOpen(true);
                        }}>
                          <i className="fa-solid fa-pen-to-square fs-6"></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Banner Modal */}
      <Modal show={editModalOpen} onHide={() => setEditModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="formFile" style={{ fontWeight: "700" }} className="form-label mx-3">
              Select File Here
            </label>
            <input className="form-control fs-4" style={{ border: "1px solid black" }} type="file" id="formFile" name="banner" onChange={FileHandler} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={editBanner}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
