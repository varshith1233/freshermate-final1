import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload, FaEye, FaInfoCircle, FaTrash } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import './MyMaterial.css'; // Import the CSS file for styles
import { message } from 'antd';
import MaterialDetail from '../../Components/Material/MaterialDetail/MaterialDetail'; // Import the MaterialDetail component

function MyMaterial() {
  const [materials, setMaterials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetail, setShowDetail] = useState(false); // State to manage MaterialDetail visibility

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/material/getmymaterial', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMaterials(response.data.data);
      } catch (error) {
        message.error('Error occurred while fetching material! Try again later!');
      }
    };

    fetchMaterials();
  }, []);

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/material/deletematerial/${selectedItem._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMaterials(materials.filter((m) => m._id !== selectedItem._id));
      setShowModal(false);
      setSelectedItem(null);
      message.success('Successfully deleted the material!');
    } catch (error) {
      message.error('Error occurred while deleting! Try again later');
    }
  };

  const handleDownload = async (item) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:8000/material/downloadmaterial/${item.file.filename}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', item.file.filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      message.error('Error occurred while downloading! Try again later!');
    }
  };

  const handleView = async (item) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:8000/material/previewMaterial/${item.file.filename}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'arraybuffer',
        }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      message.error('Error occurred while previewing! Try again later!');
    }
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetail(true); // Show MaterialDetail component
  };

  const handleGoBack = () => {
    setShowDetail(false);
  };

  return (
    <div className="container mt-4">
      {showDetail ? (
        <MaterialDetail item={selectedItem} onGoBack={handleGoBack} />
      ) : (
        <>
          <div className="d-flex align-items-center mb-4">
            <h2 className="me-3">My Materials</h2>
          </div>
          <div className="row">
            {materials.length > 0 ? (
              materials.map((item, index) => (
                <div key={index} className="col-12 mb-4">
                  <div className="card-my-material shadow-sm border-light">
                    <div className="card-body-my-material">
                      <div className="card-header-my-material">
                        <h4 className="card-title-my-material">{item.subjectName}</h4>
                      </div>
                      <div className="card-content-my-material">
                        <p className="card-text-my-material">{item.description}</p>
                        <div className="buttons-main-my-material">
                          <Button
                            variant="outline-primary"
                            className="d-flex align-items-center me-2"
                            onClick={() => handleView(item)}
                          >
                            <FaEye className="me-2" /> Preview
                          </Button>
                          <Button
                            variant="outline-secondary"
                            className="d-flex align-items-center me-2"
                            onClick={() => handleDownload(item)}
                          >
                            <FaDownload className="me-2" /> Download
                          </Button>
                          <Button
                            variant="outline-danger"
                            className="d-flex align-items-center me-2"
                            onClick={() => { setSelectedItem(item); setShowModal(true); }}
                          >
                            <FaTrash className="me-2" /> Delete
                          </Button>
                          <Button
                            variant="outline-info"
                            className="d-flex align-items-center"
                            onClick={() => handleViewDetails(item)}
                          >
                            <FaInfoCircle className="me-2" /> Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No materials found.</p>
            )}
          </div>

          {/* Delete Confirmation Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this material?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}

export default MyMaterial;
