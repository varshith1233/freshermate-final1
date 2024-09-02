import React, { useState } from 'react';
import axios from 'axios';
import {message} from 'antd'

function UploadMaterial() {
  const [subjectName, setSubjectName] = useState('');
  const [description, setDescription] = useState('');
  const [semester, setSemester] = useState('');
  const [branch, setBranch] = useState('');
  const [curriculum, setCurriculum] = useState('');
  const [degree, setDegree] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');

  // Define UG and PG options
  const ugBranches = [
    "Artificial Intelligence and Data Science",
    "Artificial Intelligence and Machine Learning",
    "CSE-Artificial Intelligence and Machine Learning",
    "CSE-Internet of Things and Cyber Security Including Block Chain Technology",
    "Civil Engineering",
    "Computer Science and Engineering",
    "Electrical and Electronics Engineering",
    "Electronics and Communication Engineering",
    "Information Technology",
    "Mechanical Engineering",
    "Bio-Technology",
    "Chemical Engineering",
  ];

  const pgBranches = [
    "CAD-CAM",
    "Communication Engineering",
    "Embedded Systems and VLSI Design",
    "Power Systems and Power Electronics",
    "Structural Engineering",
    "Thermal Engineering",
    "Artificial Intelligence and Data Science",
    "Computer Science and Engineering",
    "Master of Business Administration",
    "Master of Computer Applications",
  ];

  const ugSemesters = [...Array(8).keys()].map(num => num + 1);
  const pgSemesters = [...Array(4).keys()].map(num => num + 1);

  // Function to handle file upload and preview generation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const token = localStorage.getItem('token');

    // Create a new FormData instance
    const formData = new FormData();
    formData.append('subjectName', subjectName);
    formData.append('description', description);
    formData.append('semester', semester);
    formData.append('branch', branch);
    formData.append('curriculum', curriculum);
    formData.append('degree', degree);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post('http://localhost:8000/material/uploadmaterial', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Specify the content type
        },
      });

      console.log(response.data); // Handle the response as needed
      message.success('Succesfully uploaded the material!')
    } catch (error) {
      message.error('Error occured while uploading the material! Try again later!')
    }
  };

  // Dynamically generate branch and semester options based on degree
  const branchOptions = degree === 'PG' ? pgBranches : ugBranches;
  const semesterOptions = degree === 'PG' ? pgSemesters : ugSemesters;

  return (
    <div className="container mt-4">
      <h1>Upload Material</h1>
      <form onSubmit={handleSubmit}>
        {/* Subject Name Field */}
        <div className="mb-3">
          <label htmlFor="subjectName" className="form-label">Subject Name</label>
          <input
            type="text"
            className="form-control"
            id="subjectName"
            placeholder="Enter subject name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
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

        {/* Degree Selection */}
        <div className="mb-3">
          <label htmlFor="degree" className="form-label">Degree</label>
          <select
            className="form-select"
            id="degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          >
            <option value="" disabled>Select UG or PG</option>
            <option value="UG">UG</option>
            <option value="PG">PG</option>
          </select>
        </div>

        {/* Branch Selection */}
        <div className="mb-3">
          <label htmlFor="branch" className="form-label">Branch</label>
          <select
            className="form-select"
            id="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="" disabled>Select Branch</option>
            {branchOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Semester Selection */}
        <div className="mb-3">
          <label htmlFor="semester" className="form-label">Semester</label>
          <select
            className="form-select"
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="" disabled>Select Semester</option>
            {semesterOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Curriculum Selection */}
        <div className="mb-3">
          <label htmlFor="curriculum" className="form-label">Curriculum</label>
          <select
            className="form-select"
            id="curriculum"
            value={curriculum}
            onChange={(e) => setCurriculum(e.target.value)}
          >
            <option value="" disabled>Select Curriculum</option>
            <option value="R18">R18</option>
            <option value="R20">R20</option>
            <option value="R22">R22</option>
          </select>
        </div>

        {/* File Upload Field */}
        <div className="mb-3">
          <label htmlFor="fileUpload" className="form-label">Upload File</label>
          <input
            type="file"
            className="form-control"
            id="fileUpload"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" // Accept file types you want
            onChange={handleFileChange}
          />
        </div>

        {/* File Preview */}
        {filePreview && (
          <div className="mb-3">
            <label className="form-label">File Preview</label>
            <iframe src={filePreview} className="w-100" style={{ height: '400px' }}></iframe>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}

export default UploadMaterial;
