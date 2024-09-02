import React from 'react';
import { Link } from 'react-router-dom';

const handleGetStartedClick = () => {
  // Redirect to WhatsApp with the specified phone number and message
  window.open('https://wa.me/+918801103053?text=Hello SSTax Mentors!', '_blank');
};

const CallToAction = () => {
  return (
    <section id='cta' className='bg-danger'>
      {/* Bootstrap Container */}
      <div className='container d-flex flex-column align-items-center justify-content-between px-4 py-5 mx-auto gap-4 flex-md-row'>
        {/* Heading */}
        <h2 className='text-center text-white fw-bold display-5 text-md-start mb-4 mb-md-0'>
          Ready to Unlock Financial Success with SS Tax Mentors?
        </h2>
        {/* Buttons */}
        <div className='d-flex flex-column flex-md-row gap-3'>
          <button
            onClick={handleGetStartedClick} // Call handleGetStartedClick function on button click
            className='btn btn-light text-danger rounded-pill shadow-lg'
          >
            Get Started
          </button>
          <Link
            to='/login'
            className='btn btn-light text-danger rounded-pill shadow-lg'
          >
            Login / Signup
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
