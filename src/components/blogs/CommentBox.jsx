import BASE_URL from "@/Urls/baseUrl";
import React, { useState } from "react";

export default function CommentBox() {

  const [formData, setFormData]=useState({
    name:"",
    email:"",
    title:"",
    comment:""
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
   const response = await fetch(`${BASE_URL}/review/new`, {
    method:'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
});

        console.log(response)
      alert(' Add Review successfully successful');
  } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed');
  }
};
  return (
    <>
      <h2 className="text-30 pt-60">Leave a Reply</h2>
      <p className="mt-30">
        Your email address will not be published. Required fields are marked *
      </p>

      <div className="reviewsGrid pt-30">
        <div className="reviewsGrid__item">
          Location
          <div className="d-flex x-gap-5 pl-20">
            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>
          </div>
        </div>

        <div className="reviewsGrid__item">
          Amenities
          <div className="d-flex x-gap-5 pl-20">
            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>
          </div>
        </div>

        <div className="reviewsGrid__item">
          Food
          <div className="d-flex x-gap-5 pl-20">
            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>
          </div>
        </div>

        <div className="reviewsGrid__item">
          Room
          <div className="d-flex x-gap-5 pl-20">
            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>
          </div>
        </div>

        <div className="reviewsGrid__item">
          Price
          <div className="d-flex x-gap-5 pl-20">
            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>
          </div>
        </div>

        <div className="reviewsGrid__item">
          Tour Operator
          <div className="d-flex x-gap-5 pl-20">
            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>

            <i className="icon-star text-10 text-yellow-2"></i>
          </div>
        </div>
      </div>
<form  onSubmit={handleSubmit}>
      <div className="contactForm y-gap-30 pt-30">
        <div className="row y-gap-30">
          <div className="col-md-6" >
            <div className="form-input ">
              <input type="text" required name="name" onChange={inputHandler}/>
              <label className="lh-1 text-16 text-light-1">Name</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-input ">
              <input type="email" required name="email" onChange={inputHandler}/>
              <label className="lh-1 text-16 text-light-1">Email</label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="form-input ">
              <input type="text" required name="title" onChange={inputHandler} />
              <label className="lh-1 text-16 text-light-1">Title</label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="form-input ">
              <textarea required rows="5" name="comment" onChange={inputHandler}></textarea>
              <label className="lh-1 text-16 text-light-1">Comment</label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <button type="submit" className="button -md -dark-1 bg-accent-1 text-white">
              Post Comment
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </button>
          </div>
        </div>
      </div>
      </form>
    </>
  );
}
