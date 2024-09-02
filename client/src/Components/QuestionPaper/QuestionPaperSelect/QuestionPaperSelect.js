import React, { useState } from 'react';
import axios from 'axios';

function QuestionPaperSelect({ onFetchData }) {
  const [degree, setDegree] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [curriculum, setCurriculum] = useState('');
  const [year,setYear] = useState('')

  // Define UG and PG branch options
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

  // Dynamically generate branch and semester options based on degree
  const branchOptions = degree === 'PG' ? pgBranches : ugBranches;
  const semesterOptions = degree === 'PG' ? pgSemesters : ugSemesters;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Construct the query string for GET request
    const queryString = `degree=${degree}&branch=${branch}&semester=${semester}&curriculum=${curriculum}&year=${year}`;
    const token = localStorage.getItem('token');
    try {
      // Send a GET request to the backend with the selected data
      const response = await axios.get(`http://localhost:8000/QuestionPaper/getrequiredQuestionPaper?${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Pass the fetched data to the parent component
      console.log(response.data);
      onFetchData(response.data.data);
    } catch (error) {
      console.error('Error fetching QuestionPaper:', error); // Handle errors
      window.alert('Error fetching QuestionPaper. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-4">Get QuestionPaper</h2>
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
        <div className="mb-3">
          <label htmlFor="year" className="form-label">Year</label>
          <input
            type="text"
            className="form-control"
            id="year"
            placeholder="Enter year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

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
        
        <button type="submit" className="btn btn-primary">Get QuestionPaper</button>
      </form>
    </div>
  );
}

export default QuestionPaperSelect;
