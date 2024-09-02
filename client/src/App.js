import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// Import your components
import LandingPage from './Pages/LandingPage/LandingPage';
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage';
import Login from './Pages/LoginPage/LoginPage';
import RegistrationSuccess from './Pages/RegistrationSuccess/RegistrationSuccess';
import RegistrationFail from './Pages/RegistrationFail/RegistrationFail';
import Homepage from './Pages/Homepage/Homepage';
import WriteBlog from './Pages/WriteBlog/WriteBlog';
import UploadMaterial from './Pages/UploadMaterial/UploadMaterial';
import Material from './Pages/Material/Material';
import QuestionPapers from './Pages/QuestionPapers/QuestionPapers';
import UploadQuestionPaper from './Pages/UploadQuestionPaper/UploadQuestionPaper';

// Import your navbar components
// import LandingPageNavbar from './Components/LandingPageNavbar/LandingPageNavbar';
import Navbar from './Components/Navbar/Navbar';
import SingleBlog from './Pages/SingleBlog/SingleBlog';
import MyBlogs from './Pages/MyBlogs/MyBlogs';
import UpdateBlog from './Pages/UpdateBlog/UpdateBlog';
import MyMaterial from './Pages/MyMaterial.js/MyMaterial';
import MyQuestionpapers from './Pages/MyQuestionPapers/MyQuestionPapers';

function AppContent() {
  const location = useLocation(); // This must be inside a Router

  // Determine which navbar to render based on the current path
  const renderNavbar = () => {
    const path = location.pathname;
    
    // List of routes for Navbar1
    const navbar1Routes = ['/','/register','/registration-fail','/registration-success'];

    if (navbar1Routes.includes(path)) {
      // return <LandingPageNavbar />;
    } else {
      return <Navbar />;
    }
  };

  return (
    <div className="App">
      {renderNavbar()} {/* Conditionally render the navbar based on route */}
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/registration-fail" element={<RegistrationFail />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/write-blog" element={<WriteBlog />} />
        <Route path="/material" element={<Material />} />
        <Route path="/upload-material" element={<UploadMaterial />} />
        <Route path="/question-papers" element={<QuestionPapers />} />
        <Route path="/upload-question-paper" element={<UploadQuestionPaper />} />
        <Route path="/singlepost/:id" element={<SingleBlog />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/updateblog/:id" element={< UpdateBlog/>} />
        <Route path="/mymaterial" element={< MyMaterial/>} />
        <Route path="/my-question-papers" element={< MyQuestionpapers/>} />

      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
