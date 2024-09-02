import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { FaArrowLeft } from 'react-icons/fa'; // Import the back arrow icon
// import 'bootstrap/dist/css/bootstrap.min.css';

const SingleBlog = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate function
  const blog = location.state?.data;

  // Conditional rendering if the blog data hasn't loaded yet
  if (!blog) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          {/* Back Button */}
          <button
            className="btn btn-outline-primary mb-4"
            onClick={() => navigate(-1)} // Go back to the previous page
            style={{ marginBottom: '20px' }}
          >
            <FaArrowLeft className="me-2" /> Back
          </button>

          {blog.images && blog.images.length > 0 ? (
            <Carousel className="mb-4">
              {blog.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={`data:image/jpeg;base64,${image.data}`} // Base64 image data
                    className="d-block w-100"
                    alt={`Image ${index + 1}`}
                    style={{ objectFit: 'cover', maxHeight: '500px' }}
                  />
                  {image.caption && (
                    <Carousel.Caption>
                      <p>{image.caption}</p>
                    </Carousel.Caption>
                  )}
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <img
              src="default-image.jpg" // Placeholder image if no images
              className="img-fluid mb-4"
              alt="Default"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          )}

          <h1 className="display-4 mb-3">{blog.title}</h1>
          <p className="lead">{blog.description}</p>

          {/* Footer Section */}
          <footer className="mt-5 pt-4 border-top">
            <p className="text-muted">&copy; 2024 Your Blog Name. All rights reserved.</p>
            <p className="text-muted">Created By: {blog.firstName ? blog.firstName : ""} {blog.lastName ? blog.lastName : ""}</p>
            <p className="text-muted">Email: {blog.email}</p>
            <p className="text-muted">Roll Number: {blog.rollNumber}</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
