import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './HomeCard.css';
import { Link } from 'react-router-dom';

function HomeCard({ data }) {
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
          <p className="text-muted">Author: {data.firstName ? data.firstName : ""} {data.lastName ? data.lastName : ""}</p>
            <p className="text-muted"> {data.email}</p>
            <p className="text-muted">{data.rollNumber}</p>
            <div className='btn-upper-class'>
            <button className="btn btn-primary"><Link to={`/singlepost/${data._id}`} state={{ data }} className='link-btn'>Read More</Link></button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
