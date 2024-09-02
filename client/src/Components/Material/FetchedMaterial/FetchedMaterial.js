import React from 'react';
import MaterialCard from '../MaterialCard/MaterialCard'; // Adjust the import path if needed
import { FaDownload, FaEye, FaInfoCircle, FaArrowLeft } from 'react-icons/fa'; // Import icons from react-icons
import axios from 'axios';
import './FetchedMaterial.css'; // Import the CSS file for styles
import { Button } from 'react-bootstrap';


function FetchedMaterial({ data, onGoBack, onMaterialClick }) {
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleDownload = async (item) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/material/downloadmaterial/${item.file.filename}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", item.file.filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleView = async (item) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/material/previewMaterial/${item.file.filename}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error previewing file:", error);
    }
  };

  return (
    <div className="container mt-4">
      {selectedItem ? (
        <MaterialCard item={selectedItem} onGoBack={() => setSelectedItem(null)} />
      ) : (
        <div>
          <div className="d-flex align-items-center mb-4">
            <Button
                          variant="outline-secondary"
                          className="d-flex align-items-center"
                          onClick={onGoBack}
                        >
              <FaArrowLeft /> Go Back
              </Button>
            <h2 className="mb-20 ml-20">Fetched Material</h2>
          </div>
          <div className="row">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <div key={index} className="col-md-12-fetched-material mb-4">
                  <div className="card-fetched-material shadow-sm border-light">
                    <div className="card-body-fetched-material">
                      <div className="col-6 subjectname-fetched-material">
                        <h3 className="card-title-fetched-material">{item.subjectName}</h3>
                      </div>
                      <div className="col-6">
                        <div className="card-text-fetched-material">{item.description}</div>
                        <div className='buttons-main-fetched-material'>

                        <Button
                          variant="outline-danger"
                          className="d-flex align-items-center"
                          onClick={() => handleView(item)}
                        >
                          <FaEye className="me-2" /> Preview
                        </Button>
                        <Button
                        variant="outline-secondary"
                          className="d-flex align-items-center"
                          onClick={() => handleDownload(item)}
                        >
                          <FaDownload className="me-2" /> Download
                        </Button>
                        <Button
                        variant="outline-primary"
                          className="d-flex align-items-center"
                          onClick={() => onMaterialClick(item)}
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
              <p>No material found for the selected options.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FetchedMaterial;
