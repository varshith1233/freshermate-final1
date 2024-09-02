import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {message} from 'antd'

function UpdateBlog() {
  const location = useLocation();
  const navigate = useNavigate();
  const { blogData } = location.state || {}; // Destructure blogData from the state

  // Initialize state with existing data if editing, otherwise empty
  const [title, setTitle] = useState(blogData?.title || '');
  const [description, setDescription] = useState(blogData?.description || '');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    // Generate image previews if blogData has images
    if (blogData?.images) {
      const previews = blogData.images.map((image) =>
        `data:image/jpeg;base64,${image.data}`
      );
      setImagePreviews(previews);
    }
  }, [blogData]);

  // Handle file input changes and generate previews
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Handle form submission for updating blog
  const handleSubmit = async (e) => {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      // Update existing blog
      await axios.post(`http://localhost:8000/blog/updateblog/${blogData._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success("Succesfully updated the blog!")
      navigate('/myblogs'); // Redirect to blogs page
    } catch (error) {
      message.error('Error occured while updating the blog! Try again later!')
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <h1>Update Blog</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description Field */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* File Upload Field */}
        <div className="mb-3">
          <label htmlFor="fileUpload" className="form-label">Upload Images</label>
          <input
            type="file"
            className="form-control"
            id="fileUpload"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Image Preview Carousel */}
        {imagePreviews.length > 0 && (
          <div id="imagePreview" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {imagePreviews.map((src, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                  <img src={src} className="d-block w-100" alt={`Preview ${index}`} style={{ height: '400px' }} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#imagePreview" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#imagePreview" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3">Update Blog</button>
      </form>
    </div>
  );
}

export default UpdateBlog;
