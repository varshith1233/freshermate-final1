import React from 'react';
import { FaDownload, FaEye, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

function QuestionPaperDetail({ item, onGoBack }) {
  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/QuestionPaper/downloadQuestionPaper/${item.file.filename}`,
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

  const handleView = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/QuestionPaper/previewQuestionPaper/${item.file.filename}`,
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
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="d-flex align-items-center mb-4">
            <Button variant="secondary" onClick={onGoBack} className="me-3">
              <FaArrowLeft className="me-2" /> Back
            </Button>
          </div>

          {/* Main content section */}
          <div className="p-4 ">
            <h1 className="display-4 mb-3">{item.subjectName}</h1>
            <p className="lead">{item.description}</p>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <Button
                variant="outline-primary"
                onClick={handleView}
                className="d-flex align-items-center"
              >
                <FaEye className="me-2" /> Preview
              </Button>
              <Button
                variant="outline-secondary"
                onClick={handleDownload}
                className="d-flex align-items-center"
              >
                <FaDownload className="me-2" /> Download
              </Button>
            </div>
          </div>

          {/* Footer Section */}
          <footer className="mt-5 pt-4 border-top">
            <p className="text-muted">Degree: {item.degree}</p>
            <p className="text-muted">Branch: {item.branch}</p>
            <p className="text-muted">Curriculum: {item.curriculum}</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default QuestionPaperDetail;
