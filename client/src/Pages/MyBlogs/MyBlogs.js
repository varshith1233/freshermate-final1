import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import MyBlog from '../../Components/MyBlogCard/MyBlogCard';
import Spinner from '../../Utility/Spinner/Spinner';
import {message} from 'antd'

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  useEffect(() => {
    // Fetch blogs on component mount
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/blog/myblogs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setBlogs(response.data.data);
      })
      .catch(error => {
        message.error("Cannot fetch blogs! Try again later!")
      });
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedBlogId(id);
    setShowModal(true); // Show the modal
  };

  const handleConfirmDelete = () => {
    const token = localStorage.getItem('token')
    axios.delete(`http://localhost:8000/blog/deleteblog/${selectedBlogId}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        // Remove deleted blog from state
        setBlogs(blogs.filter(blog => blog._id !== selectedBlogId));
        setShowModal(false); // Hide the modal
        message.success("Sucesfully deleted the blog!")
      })
      .catch(error => {
        message.error("Error deleting blog! Try again later!")
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBlogId(null);
  };

  return (
      <div className="container">
        <h1>My Blogs</h1>
        {blogs.length > 0 ? (
          blogs.map((item, index) => (
            <MyBlog
              key={index}
              data={item}
              event={handleDeleteClick} // Ensure this function is passed correctly
            />
          ))
        ) : (
          <Spinner />
        )}
      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>

  );
}

export default MyBlogs;
