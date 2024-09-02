import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './WriteBlog.css'
import {message} from 'antd'

function WriteBlog() {
  const navigate = useNavigate();

  // Initialize state with empty values for creating a new blog
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle file input changes and generate previews
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Handle form submission for adding a new blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      // Create new blog
      await axios.post('http://localhost:8000/blog/write-blog', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Succesfully posted the blog!')
      navigate('/blogs'); // Redirect to blogs page
    } catch (error) {
      message.error('Error occured while posting the blog! Try again later!')
    }
  };

  return (
    <div className="container mt-135">

        <h1 className='heading-write-blog'>Write a new blog</h1>
      <form onSubmit={handleSubmit} className='form-write-blog'>
        {/* Title Field */}
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
            rows="10"
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
        <button type="submit" className="btn btn-primary mt-3">
          Post Blog
        </button>
      </form>
    </div>
  );
}

export default WriteBlog;
