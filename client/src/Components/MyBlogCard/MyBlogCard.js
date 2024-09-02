import React from 'react';
import Carousel from 'react-bootstrap/Carousel'; // Import Carousel from react-bootstrap
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from react-icons
import './MyBlogCard.css'; // Import the CSS file for styles

function MyBlogCard({ data, event }) {
  return (


<div className="card">
      <div className="card-content">
        {/* Carousel for images */}
        <div className="card-img-container">
          {data.images.length > 0 ? (
            <Carousel>
              {data.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={`data:image/jpeg;base64,${image.data}`} // Base64 image data
                    className="w-100 h-100"
                    style={{ maxHeight: '20rem', objectFit: 'cover' }}
                    alt={`Image ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <img
              src="default-image.jpg" // Placeholder image if no images
              className="card-img"
              alt="Default"
            />
          )}
        </div>

        {/* Content and buttons */}
        <div className="card-body">
          <h5 className="card-title">{data.title}</h5>
          <p className="card-text">{data.description}</p>
          <hr className='hr-tag-card'></hr>
          <div className="card-buttons">
          <Link to={`/singlepost/${data._id}`} state={{ data }} className="btn btn-outline-primary btn-md">
            <FaEye className="me-2" /> View {/* View icon */}
          </Link>
          {/* Pass blog data to the UpdateBlog component via Link state */}
          <Link to={`/updateblog/${data._id}`} state={{ blogData: data }} className="btn btn-outline-secondary btn-md">
            <FaEdit /> Edit {/* Edit icon */}
          </Link>
          <button className="btn btn-outline-danger btn-md" onClick={() => event(data._id)}>
            <FaTrash /> Delete {/* Delete icon */}
          </button>
        </div>
        <div className='btn-upper-class'>
            <button className="btn btn-primary"><Link to={`/singlepost/${data._id}`} state={{ data }} className='link-btn'>Read More</Link></button>
        </div>
          
        </div>
      </div>
    </div>
  );
}

export default MyBlogCard;
